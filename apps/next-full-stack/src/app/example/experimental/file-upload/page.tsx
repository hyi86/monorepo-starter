'use client';

import { FileUploader } from '~/features/file-upload/ui/FileUploader';

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">스트리밍 대용량 파일 업로드</h1>
      <FileUploader />
    </div>
  );
}
