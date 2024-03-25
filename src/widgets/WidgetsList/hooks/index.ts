import {useWidgets} from './widgets';

export const useEnhance = () => {
  const {widgets, goToWidget, deleteWidget, isLoading, isError} = useWidgets();
  return {
    isLoading,
    isError,
    widgets,
    goToWidget,
    deleteWidget,
  }
}