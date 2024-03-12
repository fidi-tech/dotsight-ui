import {useWidgets} from './widgets';

export const useEnhance = () => {
  const {widgets, goToWidget, deleteWidget} = useWidgets();
  return {
    widgets,
    goToWidget,
    deleteWidget,
  }
}