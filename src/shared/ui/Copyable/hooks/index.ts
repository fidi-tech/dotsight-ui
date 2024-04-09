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
  const [hideTimeoutId, setHideTimeoutId] = useState<TimeoutId | null>(null);
  const [textTimeoutId, setTextTimeoutId] = useState<TimeoutId | null>(null);

  const onCopy = useCallback((e: MouseEvent<HTMLDivElement>) => {
    setIsCopied(true);
    copyToClipboard(value);
    if (textTimeoutId) {
      clearTimeout(textTimeoutId);
    }
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }
    const htId = setTimeout(() => {
      if (!onHover) {
        tooltipRef.current?.close();
      }
      const ttId = setTimeout(() => setIsCopied(false), 200);
      setTextTimeoutId(ttId);
    }, 1000);
    setHideTimeoutId(htId);
    e.stopPropagation();
  }, [value, onHover, hideTimeoutId, textTimeoutId, setIsCopied, setHideTimeoutId, setTextTimeoutId]);

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