export type DecideChildFunction<T extends string | number | symbol> = (
  request: Request,
) => Promise<T>;
