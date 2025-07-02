import CharacterCount from '@tiptap/extension-character-count';
import { Color } from '@tiptap/extension-color';
import FileHandler from '@tiptap/extension-file-handler';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { InvisibleCharacters } from '@tiptap/extension-invisible-characters';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';
import { ImageResize } from 'tiptap-extension-resize-image';
import Selection from './selection-extension';
import TrailingNode from './trailing-node-extension';
import { uploadImages } from './upload-images';

export const extensions = [
  StarterKit.configure({
    codeBlock: false,
    gapcursor: false,
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Underline,
  TextStyle,
  Color,
  Subscript,
  Superscript,
  Selection,
  TrailingNode,
  Gapcursor,
  Placeholder.configure({
    placeholder: 'Write something ...',
    emptyEditorClass: '',
  }),
  CharacterCount,
  InvisibleCharacters.configure({ visible: false }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ImageResize.configure({ inline: true }),
  CodeBlockShiki.configure({ defaultTheme: 'one-dark-pro' }),
  Youtube.configure({
    width: 640,
    height: 480,
    controls: true,
  }),
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    async onDrop(currentEditor, files, pos) {
      const uploadedFiles = await uploadImages(files);
      for (const file of uploadedFiles) {
        currentEditor
          .chain()
          .insertContentAt(pos, { type: 'image', attrs: { src: file.url, alt: file.name } })
          .focus()
          .run();
      }
    },
    async onPaste(currentEditor, files, htmlContent) {
      if (htmlContent) {
        return false;
      }

      const uploadedFiles = await uploadImages(files);
      for (const file of uploadedFiles) {
        const pos = currentEditor.state.selection.anchor;
        currentEditor
          .chain()
          .insertContentAt(pos, { type: 'image', attrs: { src: file.url, alt: file.name } })
          .focus()
          .run();
      }
    },
  }),
  Link.configure({
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];
