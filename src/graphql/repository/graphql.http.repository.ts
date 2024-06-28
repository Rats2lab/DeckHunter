import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { GraphqlFindFilters } from '../interface/graphql.find-filters.interface';
import { GraphqlResponse } from '../interface/graphql.response.interface';

@Injectable()
export class GraphqlHttpRepository<
  ElementName extends string,
  FoundElement extends object,
> {
  constructor(private readonly httpService: HttpService) {}

  async find(graphqlFindFilters: GraphqlFindFilters): Promise<FoundElement[]> {
    let elementFilters: string[] = [];
    if (graphqlFindFilters.queryFilters) {
      const entries: [string, string | number][] = Object.entries(
        graphqlFindFilters.queryFilters,
      );

      // TODO: FIX
      elementFilters = entries.map((e) => {
        if (e[0].includes('posted')) {
          return `${e[0]}: "${e[1]}"`;
        } else {
          return `${e[0]}: ${e[1]}`;
        }
      });
    }

    const graphqlQuery = {
      operationName: `${graphqlFindFilters.queryName}`,
      query: `query ${graphqlFindFilters.queryName} { ${
        graphqlFindFilters.elementName
      }${
        elementFilters.length
          ? '('.concat(elementFilters.join(',').concat(')'))
          : ''
      } { edges { node { ${graphqlFindFilters.queryFields.join(' ')} } } } }`,
      variables: {},
    };

    const { data } = await lastValueFrom(
      this.httpService.post<GraphqlResponse<ElementName, FoundElement>>(
        graphqlFindFilters.url,
        JSON.stringify(graphqlQuery),
        {
          ...(graphqlFindFilters.headers && {
            headers: graphqlFindFilters.headers,
          }),
        },
      ),
    );

    return this.extractElements(graphqlFindFilters.elementName, data);
  }
  private extractElements(
    elementName: string,
    graphqlProductResponse: GraphqlResponse<ElementName, FoundElement>,
  ): FoundElement[] {
    return graphqlProductResponse.data[elementName].edges.map(
      (product) => product.node,
    );
  }
}
