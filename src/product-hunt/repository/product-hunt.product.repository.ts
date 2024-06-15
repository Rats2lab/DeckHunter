import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosHeaders } from 'axios';
import { lastValueFrom } from 'rxjs';
import { GraphqlFindService } from '../../graphql/service/graphql.find.service';
import { ProductHuntAccessTokenResponse } from '../interface/product-hunt.access-token-response.interface';
import { ProductHuntProduct } from '../interface/product-hunt.product.interface';

@Injectable()
export class ProductHuntProductRepository {
  constructor(
    private readonly httpService: HttpService,
    private readonly graphqlFindService: GraphqlFindService<
      'posts',
      ProductHuntProduct
    >,
  ) {}

  async find(): Promise<ProductHuntProduct[]> {
    const defaultHeaders: AxiosHeaders = await this.getApiHeaders();

    const queryFields: string[] = [
      'id',
      'name',
      'tagline',
      'description',
      'website',
      'url',
      'userId',
      'votesCount',
      'reviewsCount',
      'reviewsRating',
      'featuredAt',
      'createdAt',
    ];

    return this.graphqlFindService.find({
      url: 'https://api.producthunt.com/v2/api/graphql',
      elementName: 'posts',
      queryName: 'GetTodayPosts',
      queryFields,
      headers: defaultHeaders,
    });
  }

  private async getApiHeaders(): Promise<AxiosHeaders> {
    const accessToken: string = await this.getAccessToken();

    const defaultHeaders: AxiosHeaders = new AxiosHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return defaultHeaders;
  }

  private async getAccessToken(): Promise<string> {
    const { data } = await lastValueFrom(
      this.httpService.post<ProductHuntAccessTokenResponse>(
        'https://api.producthunt.com/v2/oauth/token',
        {
          client_id: '{{productHunt_apiClientId}}',
          client_secret: '{{productHunt_apiClientSecret}}',
          grant_type: 'client_credentials',
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Host: 'api.producthunt.com',
          },
        },
      ),
    );

    return data.access_token;
  }
}