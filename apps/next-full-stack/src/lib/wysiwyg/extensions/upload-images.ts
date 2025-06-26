const CHUNK_SIZE = 1024 * 1024; // 1MB
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB

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

      await fetch('/api/upload', {
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
