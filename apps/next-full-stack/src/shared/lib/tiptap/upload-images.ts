import { FileHandlePluginOptions } from '@tiptap/extension-file-handler';

const CHUNK_SIZE = 1024 * 1024; // 1MB
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const UPLOAD_URL = '/api/upload';

/**
 * onDrop callback
 */
export const onDrop: FileHandlePluginOptions['onDrop'] = async (currentEditor, files, pos) => {
  const uploadedFiles = await uploadImages(files);
  for (const file of uploadedFiles) {
    currentEditor
      .chain()
      .insertContentAt(pos, { type: 'image', attrs: { src: file.url, alt: file.name } })
      .focus()
      .run();
  }
};

/**
 * onPaste callback
 */
export const onPaste: FileHandlePluginOptions['onPaste'] = async (currentEditor, files, pasteContent) => {
  if (pasteContent) {
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
};

/**
 * Upload images to the server
 */
export async function uploadImages(files: File[]) {
  const uploadedFiles: { name: string; url: string }[] = [];

  if (files.some((file) => file.size > MAX_FILE_SIZE)) {
    throw new Error('File size exceeds maximum allowed');
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  let uploaded = 0;

  for (const file of files) {
    const totalSizeOfFile = file.size;
    const chunkCount = Math.ceil(totalSizeOfFile / CHUNK_SIZE);

    for (let chunkIndex = 0; chunkIndex < chunkCount; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, totalSizeOfFile);
      const chunk = file.slice(start, end);

      await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: {
          'x-file-name': encodeURIComponent(file.name),
          'x-chunk-index': chunkIndex.toString(),
          'x-total-size': totalSizeOfFile.toString(),
        },
        body: chunk,
      });

      // 전체 진행률
      uploaded += chunk.size;
    }

    uploadedFiles.push({ name: file.name, url: `/upload/${encodeURIComponent(file.name)}` });
  }

  if (uploaded !== totalSize) {
    throw new Error('Failed to upload images');
  }

  return uploadedFiles;
}
