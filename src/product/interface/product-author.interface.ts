import { ApiProperty } from '@nestjs/swagger';

export class ProductAuthor {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  link: string;
}
