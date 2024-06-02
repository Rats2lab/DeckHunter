import { DomainTransformableObject } from './domain.transformable-object.type';

export type InfrastructureObject<T> = T & DomainTransformableObject<T>;
