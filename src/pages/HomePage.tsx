import { gql, useQuery } from "urql";
import { Link } from "react-router-dom";

import Card from "@src/components/Card";
import { PeopleData } from "@src/types/Person";
import PageTitle from "@src/components/PageTitle";
import Loading from "@src/components/Loading";
import ErrorData from "@src/components/Error";

const query = gql`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const HomePage = () => {
  const [data] = useQuery<PeopleData>({ query });

  return (
    <section>
      <PageTitle title="People" />
      <Loading isLoading={data.fetching} text="Loading..." />
      <ErrorData
        isError={!!data.error}
        text="Sorry, something went wrong, try again later..."
      />

      {!data.fetching && !data.error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data?.allPeople?.edges?.map(({ node }) => (
            <article key={node.id}>
              <Link to={`/person/${node.id}`}>
                <Card>
                  <div className="p-8">
                    <h3 className="uppercase tracking-wide text-md text-indigo-500 font-semibold">
                      {node.name}
                    </h3>
                  </div>
                </Card>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomePage;
