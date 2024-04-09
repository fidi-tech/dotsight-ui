import {isIOS} from '@/shared/lib/browser';

export const copyToClipboard = (text: string) => {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(text);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = text;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    if (isIOS()) {
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      selection!.removeAllRanges();
      selection!.addRange(range);
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res(null) : rej();
      textArea.remove();
    });
  }
}