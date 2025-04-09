declare module '@ub-ecosystem/reference-parser' {
  export interface SearchResult {
    document: {
      id: string;
      title: string;
      type: string;
      excerpt: string;
      metadata: {
        author?: string;
        date?: string;
      };
    };
  }
}
