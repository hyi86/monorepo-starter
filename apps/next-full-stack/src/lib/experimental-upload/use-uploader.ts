'use client';

import { useRef } from 'react';
import { useUploaderStore } from './uploader-store-provider';

type UseUploaderProps = {
  chunkSize?: number;
};

export const useUploader = ({ chunkSize }: UseUploaderProps = {}) => {
  const CHUNK_SIZE = chunkSize ?? 1024 * 1024; // 1MB
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    status,
    files,
    progress,
    totalUploaded,
    totalSize,
    overallPercent,
    setFiles,
    setStatus,
    setOverallProgress,
    setProgress,
    init,
  } = useUploaderStore((state) => state);

  const onInit = () => {
    init();
  };

  const onChangeFiles = (files: FileList | null) => {
    setFiles(Array.from(files ?? []));
  };

  const onUpload = async () => {
    setStatus('uploading');

    // 전체 크기 계산
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let uploaded = 0;
    setOverallProgress(0, totalSize);

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

        // 파일별 진행률
        const percent = Math.round(((chunkIndex + 1) / chunkCount) * 100);
        setProgress(file.name, percent);

        // 전체 진행률
        uploaded += chunk.size;
        setOverallProgress(uploaded, totalSize);
      }
    }

    if (fileRef.current) {
      fileRef.current.value = '';
    }

    setStatus('done');
  };

  const onClear = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return {
    fileRef,

    onChangeFiles,
    onClear,
    onUpload,
    onInit,

    files,
    overallPercent,
    progress,
    status,
    totalSize,
    totalUploaded,
  };
};
