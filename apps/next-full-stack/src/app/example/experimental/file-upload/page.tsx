'use client';

import { FileUploader } from '~/features/file-upload/ui/FileUploader';

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-2">
      <h1>Large Stream File Upload</h1>
      <FileUploader />
    </div>
  );
}
