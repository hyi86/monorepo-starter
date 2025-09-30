'use client';

/**
 * 클립보드에 텍스트를 복사하는 유틸리티
 * ⚠️ 보안상의 이유로 `http://localhost` 또는 `https://` 에서만 동작 (IP로 접근하는 경우 동작하지 않음)
 */
export function copyToClipboard(text: string) {
  try {
    // navigator.clipboard 기본 동작
    if ('clipboard' in navigator && window.isSecureContext) {
      navigator.clipboard.writeText(text);
      return;
    }

    // 지원하지 않는 브라우저 대상
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';
    document.body.prepend(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  } catch (error) {
    throw new Error('Failed to copy to clipboard', { cause: error });
  }
}
