export interface GraphqlFindFilters {
  url: string;
  elementName: string;
  queryName: string;
  queryFields: string[];
  queryFilters?: Record<string, string | number>;
  headers?: { [key: string]: any };
}
