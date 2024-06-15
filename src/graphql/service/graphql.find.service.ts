import { Injectable } from '@nestjs/common';
import { GraphqlHttpRepository } from '../repository/graphql.http.repository';
import { GraphqlFindFilters } from '../interface/graphql.find-filters.interface';

@Injectable()
export class GraphqlFindService<
  ElementName extends string,
  FoundElement extends object,
> {
  constructor(
    private readonly graphqlHttpRepository: GraphqlHttpRepository<
      ElementName,
      FoundElement
    >,
  ) {}

  async find(graphqlFindFilters: GraphqlFindFilters): Promise<FoundElement[]> {
    return this.graphqlHttpRepository.find(graphqlFindFilters);
  }
}
