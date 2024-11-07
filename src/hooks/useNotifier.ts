// useNotifier.ts
import { useSnackbar } from 'notistack';

export const useNotifier = () => {
  const { enqueueSnackbar } = useSnackbar();

  const notify = (message: string, variant: 'default' | 'error' | 'success' | 'warning' | 'info' = 'default') => {
    enqueueSnackbar(message, { variant });
  };

  return { notify };
};
