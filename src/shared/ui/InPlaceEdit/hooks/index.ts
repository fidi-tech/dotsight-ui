import React, {useCallback, useEffect, useRef, useState} from 'react';

type Props = {
  value: string;
  onSave: (s: string) => void;
}
export const useEnhance = ({value, onSave}: Props) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [content, setContent] = useState(value);
  const [width, setWidth] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!spanRef.current) {
      return;
    }
    setTimeout(() => setWidth(spanRef.current!.scrollWidth), 200)
  }, []);
  useEffect(() => {
    if (!spanRef.current) {
      return;
    }
    setWidth(spanRef.current!.scrollWidth)
  }, [content, width]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.tabIndex = -1;
      inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
      setTimeout(() => inputRef?.current?.focus(), 0);
    }
  }, [setIsEditing]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onConfirm = useCallback(() => {
    onSave(content);
    setIsEditing(false);
  }, [onSave, setIsEditing, content]);

  return {
    spanRef,
    inputRef,
    content,
    width,
    isEditing,
    startEditing,
    onChange,
    onConfirm,
  }
}