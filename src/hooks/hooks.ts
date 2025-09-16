import type { MutationResultType, MutationType } from '../types/types';

export const useMutationAction = <ResultType, QueryArg>({
  mutation,
  onSuccess,
  onError,
  onFinally,
}: {
  mutation: MutationType<ResultType, QueryArg>;
  onSuccess?: ((actionResult: ResultType) => void) | (() => void);
  onError?: () => void;
  onFinally?: () => void;
}): [
  (payload: QueryArg) => Promise<void>,
  MutationResultType<ResultType, QueryArg>,
] => {
  const [action, actionResult] = mutation();

  const tryToExecuteAction = async (payload: QueryArg): Promise<void> => {
    try {
      const data = await action(payload).unwrap();

      onSuccess?.(data);
    } catch (err) {
      onError?.();

      throw err;
    } finally {
      onFinally?.();
    }
  };

  return [tryToExecuteAction, actionResult];
};
