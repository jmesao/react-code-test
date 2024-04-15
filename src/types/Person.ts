export interface Person {
  id: string;
  name: string;
  birthYear: string;
  species: {
    averageHeight: string;
  } | null;
}

export interface PeopleData {
  allPeople: {
    edges: {
      node: Person;
    }[];
  };
}
