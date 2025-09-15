import type { MutationResultType, MutationType } from '../types/types';

export const useMutationAction = <ResultType, QueryArg>({
  mutation,
  onSuccess,
  onError,
}: {
  mutation: MutationType<ResultType, QueryArg>;
  onSuccess?: () => void;
  onError?: () => void;
}): [
  (payload: QueryArg) => Promise<void>,
  MutationResultType<ResultType, QueryArg>,
] => {
  const [action, actionResult] = mutation();

  const tryToExecuteAction = async (payload: QueryArg): Promise<void> => {
    try {
      await action(payload).unwrap();

      if (onSuccess) {
        onSuccess();
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
