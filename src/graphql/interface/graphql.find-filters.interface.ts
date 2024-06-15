export interface GraphqlFindFilters {
  url: string;
  elementName: string;
  queryName: string;
  queryFields: string[];
  headers?: { [key: string]: any };
}
