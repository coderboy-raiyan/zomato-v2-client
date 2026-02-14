export type TNextOption = {
  revalidate?: number;
  tags?: string[];
};

export type TFetchOptions = { next?: TNextOption; cache?: RequestCache };

export type THttpOptions = {
  params?: Record<string, string>;
  headers?: HeadersInit;
  cache?: RequestCache;
} & { [k in keyof TNextOption]: TNextOption[k] };
