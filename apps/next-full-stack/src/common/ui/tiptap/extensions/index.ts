import { Color } from '@tiptap/extension-color';
import FileHandler from '@tiptap/extension-file-handler';
import InvisibleCharacters from '@tiptap/extension-invisible-characters';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import { CharacterCount, Gapcursor, Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import { CodeBlockShiki } from './code-block-shiki';
import { ImagePlaceholder } from './image-placeholder';
import { ImageExtension } from './image-resize';
import { shouldAutoLink } from './link';
import { onDrop, onPaste, uploadImages } from './upload-images';

export const extensions = [
  StarterKit.configure({
    codeBlock: false,
    gapcursor: false,
    heading: {
      levels: [1, 2, 3, 4],
    },
    link: {
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['http', 'https'],
      shouldAutoLink,
    },
    underline: {},
  }),
  CharacterCount,
  Color,
  Gapcursor,
  InvisibleCharacters.configure({ visible: false }),
  Placeholder.configure({
    placeholder: 'Write something ...',
  }),
  Subscript,
  Superscript,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
  TaskList,
  TaskItem.configure({
    nested: true,
    HTMLAttributes: {
      class: '[&_input]:cursor-pointer [&_p]:m-0',
    },
  }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TextStyle,
  Youtube.configure({
    width: 640,
    height: 480,
    controls: true,
  }),
  CodeBlockShiki.configure({ defaultTheme: 'one-dark-pro' }),
  ImageExtension,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop,
    onPaste,
  }),
  ImagePlaceholder.configure({
    allowedMimeTypes: {
      image: ['image/*'],
    },
    onDrop: async (files, editor) => {
      const uploadedFiles = await uploadImages(files);
      for (const file of uploadedFiles) {
        const pos = editor.state.selection.anchor;
        editor
          .chain()
          .insertContentAt(pos, { type: 'image', attrs: { src: file.url, alt: file.name } })
          .focus()
          .run();
      }
    },
  }),
];
