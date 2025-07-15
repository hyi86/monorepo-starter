'use client';

import BubbleMenu from '@tiptap/extension-bubble-menu';

export const BubbleMenuTable = BubbleMenu.configure({
  pluginKey: 'table-menu',
  shouldShow: ({ editor }) => {
    return editor.isActive('table');
  },
  element: document.querySelector('.tiptap-table-menu') as HTMLElement,
});
