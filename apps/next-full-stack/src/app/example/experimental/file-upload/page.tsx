'use client';

import { round } from '@henry-hong/common-utils/math';
import { Button } from '@monorepo-starter/ui/components/button';
import { Input } from '@monorepo-starter/ui/components/input';
import { Progress } from '@monorepo-starter/ui/components/progress';
import { Loader2, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useUploader } from '~/lib/experimental-upload/use-uploader';

export default function UploadPage() {
  const uploader = useUploader();

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploader.onChangeFiles(e.target.files);
  };

  const handleClear = () => {
    uploader.onInit();
  };

  const handleUpload = async () => {
    if (uploader.status === 'uploading') {
      return;
    }

    if (uploader.files.length === 0) {
      toast.error('파일을 선택해주세요');
      return;
    }

    await uploader.onUpload();
    toast.success('업로드 완료');
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">스트리밍 대용량 파일 업로드</h1>
      <div className="flex gap-2">
        <Input
          ref={uploader.fileRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleChangeFile}
          disabled={uploader.status !== 'ready'}
        />
        {uploader.status === 'ready' && (
          <Button onClick={handleUpload} disabled={uploader.files.length === 0}>
            <span>업로드</span>
          </Button>
        )}
        {uploader.status === 'uploading' && (
          <Button disabled>
            <Loader2 className="h-4 w-4 animate-spin" />
          </Button>
        )}
        {uploader.status === 'done' && (
          <Button onClick={handleClear}>
            <RefreshCcw className="h-4 w-4" />
            초기화
          </Button>
        )}
      </div>

      {/* upload info */}
      {uploader.status !== 'ready' && (
        <div className="flex items-center gap-3 whitespace-nowrap text-sm">
          <Progress value={uploader.overallPercent} />
          <span>{round(uploader.totalUploaded / 1024 / 1024, 2)} MB</span>
          <span> / </span>
          <span>{round(uploader.totalSize / 1024 / 1024, 2)} MB</span>
          <span>({uploader.overallPercent}%)</span>
        </div>
      )}

      {/* upload progress */}
      {uploader.files.length > 0 && (
        <div className="bg-muted rounded-md border p-2">
          {uploader.files.map((file) => (
            <div key={file.name} className="flex items-center gap-1 py-2">
              {uploader.progress[file.name] && uploader.progress[file.name] === 100 ? (
                <div
                  className="w-96 cursor-pointer truncate text-sm"
                  onClick={() => {
                    window.open(`/api/upload?fileName=${file.name}`, '_blank');
                  }}
                >
                  {file.name}
                </div>
              ) : (
                <div className="w-96 truncate text-sm">{file.name}</div>
              )}
              <Progress value={uploader.progress[file.name] ?? 0} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
