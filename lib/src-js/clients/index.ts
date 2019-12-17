// TError ...
type TError = {
  code: number;
  message: string;
};

// define classic grpc response
type TErrorResponse = {
  error: TError | null;
  meta: any;
};

export { TError, TErrorResponse };
