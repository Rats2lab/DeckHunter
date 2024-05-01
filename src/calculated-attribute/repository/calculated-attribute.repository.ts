import { CalculatedAttribute } from '../interface/calculated-attribute.interface';
import { CalculatedAttributeCreate } from '../type/calculated-attribute.create.type';

export abstract class CalculatedAttributeRepository {
  abstract insertOne(
    calculatedAttributeCreate: CalculatedAttributeCreate,
  ): Promise<CalculatedAttribute>;
}
