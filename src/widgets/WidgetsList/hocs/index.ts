import {useWidgets} from './widgets';

export const useEnhance = () => {
  const {widgets, goToWidget} = useWidgets();
  return {
    widgets,
    goToWidget,
  }
}