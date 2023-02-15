export interface Card {
  id: number;
  name?: string;
  description: string;
  characters?: {
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  comics?: {
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  series?: {
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
  title?: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export interface EntityResponse {
  data: {
    results: Card[];
  };
}
