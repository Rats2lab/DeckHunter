import { Mother } from './mother/mother';

describe('Unit test', () => {
  it('Example', () => {
    const result = Mother.randomUuid();

    expect(result).toBeDefined();
  });
});
