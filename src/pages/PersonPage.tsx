import { gql, useQuery } from 'urql';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Card from '@src/components/Card';
import { Film, PersonFilmData, ProducerCount } from '@src/types/Film';
import NavLink from '@src/components/NavLink';
import PageTitle from '@src/components/PageTitle';
import Loading from '@src/components/Loading';
import ErrorData from '@src/components/Error';
import { Climate } from '@src/enums/climate';
import { formatToDateString } from '@src/utils/dates';

const query = gql`
  query PersonDetails($personId: ID!) {
    person(id: $personId) {
      name
      birthYear
      height
      species {
        averageHeight
      }
    }
    allFilms {
      totalCount
      films {
        producers
        title
        releaseDate
        planetConnection {
          planets {
            climates
            surfaceWater
          }
        }
      }
    }
  }
`;

const PersonPage = () => {
  const initialPage: number = 0;
  const { personId } = useParams();
  const [data] = useQuery<PersonFilmData>({ query, variables: { personId } });
  const [page, setPage] = useState(initialPage);

  let pageTitle: string = 'Person';
  let producerCounts: ProducerCount = {};
  let birthYear: string = '';
  let speciesAverageHeight: string = '';
  let totalPageFilmsCount: number = initialPage;
  let films: Film[] = [];
  let totalPlanetWithoutWater: number = 0;

  if (!data.fetching && !data.error) {
    pageTitle = data.data?.person?.name || 'Person';
    speciesAverageHeight = data.data?.person?.species?.averageHeight || 'N/A';
    films = data.data?.allFilms?.films || [];
    producerCounts = films.reduce((producerCount: ProducerCount, film) => {
      film.producers.forEach((producer) => {
        producerCount[producer] = (producerCount[producer] || 0) + 1;
      });
      return producerCount;
    }, {});
    birthYear = data.data?.person?.birthYear || 'unknow';
    totalPlanetWithoutWater = films[page].planetConnection.planets.reduce(
      (total, planet) => {
        // Increment the count if the planet's climate is "arid"
        return total + (planet.climates.includes(Climate.ARID) ? 1 : 0);
      },
      0,
    );
    totalPageFilmsCount = data.data?.allFilms?.totalCount
      ? data.data?.allFilms?.totalCount - 1
      : initialPage;
  }

  const goToPrevPage = () => {
    setPage((page) => page - 1);
  };

  const goToNextPage = () => {
    setPage((page) => page + 1);
  };

  return (
    <section className='text-center'>
      <NavLink path='/' text='Go Home' />
      <PageTitle title={pageTitle} />
      <Loading isLoading={data.fetching} text='Loading...' />
      <ErrorData
        isError={!!data.error}
        text='Sorry, something went wrong, try again later...'
      />

      {!data.fetching && !data.error && (
        <article>
          {/* Basic person data */}
          <p>
            <strong className='text-offWhite'>Birth Year: </strong>
            <span className='text-gray'>{birthYear}</span>
          </p>
          <p>
            <strong className='text-offWhite'>Species Average Height: </strong>
            <span className='text-gray'>{speciesAverageHeight}</span>
          </p>

          {/* Producers */}
          <div className='my-8'>
            <h3 className='text-xl text-offWhite underline'>
              List of Producers
            </h3>
            <ul>
              {Object.entries(producerCounts).map(([producer, count]) => (
                <li className='text-dark-800' key={producer}>
                  {producer}: {count}
                </li>
              ))}
            </ul>
          </div>

          {/* Films */}
          <h3 className='text-xl font-bold text-offWhite my-4'>Films</h3>
          <div className='w-full'>
            <div className='mx-auto max-w-96'>
              <Card>
                <div className='p-8'>
                  <h4 className='uppercase tracking-wide text-md text-indigo-500 font-semibold'>
                    {films[page].title}
                  </h4>
                  <p className='mt-2'>
                    <strong className='text-offWhite'>Release Date: </strong>
                    <span className='text-gray'>
                      {formatToDateString(films[page].releaseDate)}
                    </span>
                  </p>
                  <p className='mt-2'>
                    <strong className='text-offWhite'>
                      Planet without water:{' '}
                    </strong>
                    <span className='text-gray'>{totalPlanetWithoutWater}</span>
                  </p>
                </div>
              </Card>

              {/* Actions */}
              <div className='flex justify-between mt-4'>
                <button
                  className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${page === initialPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={page === initialPage}
                  onClick={goToPrevPage}
                >
                  Prev
                </button>
                <button
                  className={`bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded ${page === totalPageFilmsCount ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={page === totalPageFilmsCount}
                  onClick={goToNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default PersonPage;
