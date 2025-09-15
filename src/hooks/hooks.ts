import type { MutationResultType, MutationType } from '../types/types';

export const useMutationAction = <ResultType, QueryArg>({
  mutation,
  onSuccess,
  onError,
}: {
  mutation: MutationType<ResultType, QueryArg>;
  onSuccess?: ((actionResult: ResultType) => void) | (() => void);
  onError?: () => void;
}): [
  (payload: QueryArg) => Promise<void>,
  MutationResultType<ResultType, QueryArg>,
] => {
  const [action, actionResult] = mutation();

  const tryToExecuteAction = async (payload: QueryArg): Promise<void> => {
    try {
      const data = await action(payload).unwrap();

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err) {
      if (onError) {
        onError();
      }
      throw err;
    }
  };

  return [tryToExecuteAction, actionResult];
};
