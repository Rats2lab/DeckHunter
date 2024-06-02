import { ApiProperty } from '@nestjs/swagger';

export class PaginableResponseDto<T> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  data: T[];

  constructor(data: T[]) {
    this.data = data; // TODO: Hacer un .map y un new de cada data
    this.total = data.length;
  }
}
