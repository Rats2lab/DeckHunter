export interface GraphqlResponse<
  ElementName extends string,
  FoundElement extends object,
> {
  data: {
    [Key in ElementName]: {
      edges: [
        {
          node: FoundElement;
        },
      ];
    };
  };
}
