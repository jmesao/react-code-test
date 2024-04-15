import { Person } from './Person';

export interface Film {
  title: string;
  releaseDate: string;
  producers: string[];
  planetConnection: {
    planets: {
      climates: string[];
    }[];
  };
}

export interface PersonFilmData {
  person: Person | null;
  allFilms: {
    totalCount: number;
    films: Film[];
  };
}

export interface ProducerCount {
  [producer: string]: number;
}
