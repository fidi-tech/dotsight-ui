import {MouseEvent, useCallback, useRef, useState} from 'react';
import {TooltipRefProps} from 'react-tooltip';

import {copyToClipboard} from '@/shared/lib/clipboard';
import {TimeoutId} from '@/shared/lib/types';

type Props = {
  value: string,
  onHover?: boolean,
};

export const useEnhance = ({value, onHover}: Props) => {
  const tooltipRef = useRef<TooltipRefProps>(null);
  const [isCopied, setIsCopied] = useState(false);
  const hideTimeoutId = useRef<TimeoutId | null>(null);
  const textTimeoutId = useRef<TimeoutId | null>(null);

  const onCopy = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setIsCopied(true);
    copyToClipboard(value);
    if (textTimeoutId.current) {
      clearTimeout(textTimeoutId.current);
    }
    if (hideTimeoutId.current) {
      clearTimeout(hideTimeoutId.current);
    }
    hideTimeoutId.current = setTimeout(() => {
      if (!onHover) {
        tooltipRef.current?.close();
      }
      textTimeoutId.current = setTimeout(() => setIsCopied(false), 200);
    }, 1000);
    e.stopPropagation();
  }, [value, onHover, setIsCopied]);

  const copyTooltipId = `copy-tooltip`;
  const copyTooltip = {
    ['data-tooltip-id']: copyTooltipId,
  };
  const tooltipContent = useCallback(() => isCopied ? 'Copied' : 'Copy', [isCopied]);

  return {
    onCopy,
    tooltipRef,
    copyTooltipId,
    copyTooltip,
    tooltipContent,
  }
}