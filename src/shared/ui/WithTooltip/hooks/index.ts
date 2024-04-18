import {ReactNode, useRef} from 'react';
import {TooltipRefProps} from 'react-tooltip';

type Props = {
  Tooltip: ReactNode,
};

export const useEnhance = ({Tooltip}: Props) => {
  const tooltipRef = useRef<TooltipRefProps>(null);

  const tooltipId = `tooltip-${Math.random()}`;
  const tooltip = {
    ['data-tooltip-id']: tooltipId,
  };

  return {
    tooltipRef,
    tooltipId,
    tooltip,
    tooltipContent: () => Tooltip,
  }
}