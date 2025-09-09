# useFileUpload Hook

드래그 앤 드롭 지원, 파일 검증, 미리보기 생성이 포함된 유연하고 기능이 풍부한 파일 업로드 처리용 React Hook입니다.

> **참고:** 이 Hook은 파일 업로드를 위한 견고한 기반을 제공하지만 확장 가능하도록 설계되었습니다. 일시정지/재개 기능, 청크 업로드, 재시도 메커니즘, 특정 백엔드 서비스와의 통합과 같은 추가 기능을 구현할 수 있습니다.

## Features

- 📁 단일 또는 다중 파일 업로드
- 🖱️ 드래그 앤 드롭 지원
- 🔍 파일 타입 검증
- 📏 파일 크기 검증
- 🖼️ 이미지 미리보기 생성
- 🧹 중복 파일 감지
- ⚠️ 에러 처리
- 🔄 진행률 추적 통합
- 🎛️ 완전히 커스터마이징 가능한 UI

## Installation

이 Hook은 컴포넌트 라이브러리의 일부이며 별도 설치가 필요하지 않습니다.

## Basic Usage

```tsx
import { useFileUpload } from "@/registry/default/hooks/use-file-upload"

function FileUploadComponent() {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxFiles: 5,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: "image/*",
  })

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input {...getInputProps()} />

      <button onClick={openFileDialog}>파일 선택</button>

      {files.length > 0 && (
        <div>
          <h3>선택된 파일:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.id}>
                {file.file.name} ({formatBytes(file.file.size)})
                <button onClick={() => removeFile(file.id)}>제거</button>
              </li>
            ))}
          </ul>
          <button onClick={clearFiles}>모두 지우기</button>
        </div>
      )}

      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  )
}
```

## API Reference

### Hook Parameters

`useFileUpload` Hook은 다음 옵션들을 포함한 설정 객체를 받습니다:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxFiles` | `number` | `Infinity` | 허용되는 최대 파일 수 (`multiple`이 `true`일 때만 사용) |
| `maxSize` | `number` | `Infinity` | 최대 파일 크기 (바이트) |
| `accept` | `string` | `"*"` | 허용되는 파일 타입의 쉼표로 구분된 목록 (예: `"image/*,application/pdf"`) |
| `multiple` | `boolean` | `false` | 다중 파일 선택 허용 여부 |
| `initialFiles` | `FileMetadata[]` | `[]` | 업로더를 채울 초기 파일들 |
| `onFilesChange` | `(files: FileWithPreview[]) => void` | `undefined` | 파일 배열이 변경될 때마다 호출되는 콜백 함수 |
| `onFilesAdded` | `(addedFiles: FileWithPreview[]) => void` | `undefined` | 새 파일이 추가될 때 호출되는 콜백 함수 |

### Return Value

Hook은 두 개의 요소를 가진 튜플을 반환합니다:

#### State Object

| Property | Type | Description |
|----------|------|-------------|
| `files` | `FileWithPreview[]` | 미리보기 URL이 포함된 파일 배열 |
| `isDragging` | `boolean` | 파일이 드롭 영역 위로 드래그되고 있는지 여부 |
| `errors` | `string[]` | 에러 메시지 배열 |

#### Actions Object

| Method | Type | Description |
|--------|------|-------------|
| `addFiles` | `(files: FileList \| File[]) => void` | 프로그래밍 방식으로 파일 추가 |
| `removeFile` | `(id: string) => void` | ID로 파일 제거 |
| `clearFiles` | `() => void` | 모든 파일 제거 |
| `clearErrors` | `() => void` | 모든 에러 메시지 지우기 |
| `handleDragEnter` | `(e: DragEvent<HTMLElement>) => void` | 드래그 진입 이벤트 처리 |
| `handleDragLeave` | `(e: DragEvent<HTMLElement>) => void` | 드래그 벗어남 이벤트 처리 |
| `handleDragOver` | `(e: DragEvent<HTMLElement>) => void` | 드래그 오버 이벤트 처리 |
| `handleDrop` | `(e: DragEvent<HTMLElement>) => void` | 드롭 이벤트 처리 |
| `handleFileChange` | `(e: ChangeEvent<HTMLInputElement>) => void` | 파일 입력 변경 이벤트 처리 |
| `openFileDialog` | `() => void` | 파일 선택 대화상자 열기 |
| `getInputProps` | `(props?: InputHTMLAttributes<HTMLInputElement>) => InputHTMLAttributes<HTMLInputElement> & { ref: React.Ref<HTMLInputElement> }` | 파일 입력 요소의 props 가져오기 |

### Types

```typescript
type FileMetadata = {
  name: string
  size: number
  type: string
  url: string
  id: string
}

type FileWithPreview = {
  file: File | FileMetadata
  id: string
  preview?: string
}
```

## Advanced Usage

### 서버 통합을 통한 업로드 진행률 추적

서버 통합을 통한 파일 업로드 진행률 추적의 실제 예제입니다:

```tsx
import { useState } from "react"
import { useFileUpload, type FileWithPreview } from "./use-file-upload"

// 업로드 진행률 추적을 위한 타입
type UploadProgress = {
  fileId: string
  progress: number
  completed: boolean
  error?: string
}

function FileUploader() {
  const maxSize = 5 * 1024 * 1024 // 5MB

  // 각 파일의 업로드 진행률을 추적하는 상태
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])

  // 서버로 파일 업로드를 처리하는 함수
  const uploadFileToServer = async (file: File): Promise<{ url: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        // FormData 생성
        const formData = new FormData()
        formData.append('file', file)

        // 진행률을 추적하기 위한 XMLHttpRequest 생성
        const xhr = new XMLHttpRequest()

        // 업로드 진행률 추적
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progressPercent = Math.round((event.loaded / event.total) * 100)
            // 이 파일의 진행률 상태 업데이트
            setUploadProgress(prev => prev.map(item =>
              item.fileId === file.name ? { ...item, progress: progressPercent } : item
            ))
          }
        })

        // 완료 처리
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText)
            // 완료로 표시
            setUploadProgress(prev => prev.map(item =>
              item.fileId === file.name ? { ...item, completed: true } : item
            ))
            resolve(response)
          } else {
            // 에러 처리
            setUploadProgress(prev => prev.map(item =>
              item.fileId === file.name ? { ...item, error: '업로드 실패' } : item
            ))
            reject(new Error('업로드 실패'))
          }
        })

        // 에러 처리
        xhr.addEventListener('error', () => {
          setUploadProgress(prev => prev.map(item =>
            item.fileId === file.name ? { ...item, error: '네트워크 에러' } : item
          ))
          reject(new Error('네트워크 에러'))
        })

        // 요청 열기 및 전송
        xhr.open('POST', '/api/upload', true)
        xhr.send(formData)
      } catch (error) {
        reject(error)
      }
    })
  }

  // 새로 추가된 파일 처리
  const handleFilesAdded = (addedFiles: FileWithPreview[]) => {
    // 각 새 파일에 대한 진행률 추적 초기화
    const newProgressItems = addedFiles.map(file => ({
      fileId: file.id,
      progress: 0,
      completed: false
    }))

    // 상태에 새 진행률 항목 추가
    setUploadProgress(prev => [...prev, ...newProgressItems])

    // 각 파일에 대한 업로드 시작
    addedFiles.forEach(file => {
      if (file.file instanceof File) {
        uploadFileToServer(file.file)
          .then(response => {
            console.log('업로드 성공:', response.url)
          })
          .catch(error => {
            console.error('업로드 실패:', error)
          })
      }
    })
  }

  // 파일의 진행률 추적 제거
  const handleFileRemoved = (fileId: string) => {
    setUploadProgress(prev => prev.filter(item => item.fileId !== fileId))
  }

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    multiple: true,
    maxSize,
    onFilesAdded: handleFilesAdded,
  })

  return (
    <div className="flex flex-col gap-2">
      {/* 드롭 영역 */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]"
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="이미지 파일 업로드"
        />
        {files.length > 0 ? (
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="truncate text-sm font-medium">
                파일 ({files.length})
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={openFileDialog}>
                  <UploadIcon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  파일 추가
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // 모든 진행률 추적 지우기
                    setUploadProgress([])
                    clearFiles()
                  }}
                >
                  <Trash2Icon
                    className="-ms-0.5 size-3.5 opacity-60"
                    aria-hidden="true"
                  />
                  모두 제거
                </Button>
              </div>
            </div>

            <div className="w-full space-y-2">
              {files.map((file) => {
                const fileProgress = uploadProgress.find(
                  (p) => p.fileId === file.id
                )
                const isUploading = fileProgress && !fileProgress.completed

                return (
                  <div
                    key={file.id}
                    data-uploading={isUploading || undefined}
                    className="bg-background flex flex-col gap-1 rounded-lg border p-2 pe-3 transition-opacity duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 overflow-hidden in-data-[uploading=true]:opacity-50">
                        <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded border">
                          {getFileIcon(file)}
                        </div>
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <p className="truncate text-[13px] font-medium">
                            {file.file instanceof File
                              ? file.file.name
                              : file.file.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatBytes(
                              file.file instanceof File
                                ? file.file.size
                                : file.file.size
                            )}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                        onClick={() => {
                          handleFileRemoved(file.id)
                          removeFile(file.id)
                        }}
                        aria-label="파일 제거"
                      >
                        <XIcon className="size-4" aria-hidden="true" />
                      </Button>
                    </div>

                    {/* 업로드 진행률 바 */}
                    {fileProgress &&
                      (() => {
                        const progress = fileProgress.progress || 0
                        const completed = fileProgress.completed || false

                        if (completed) return null

                        return (
                          <div className="mt-1 flex items-center gap-2">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="bg-primary h-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground w-10 text-xs tabular-nums">
                              {progress}%
                            </span>
                          </div>
                        )
                      })()}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">파일을 여기에 드롭하세요</p>
            <p className="text-muted-foreground text-xs">
              최대 {maxFiles}개 파일 ∙ 최대 {maxSizeMB}MB
            </p>
            <Button variant="outline" className="mt-4" onClick={openFileDialog}>
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              이미지 선택
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  )
}
```

## Helper Functions

### formatBytes

바이트 값을 사람이 읽기 쉬운 문자열로 포맷합니다.

```typescript
function formatBytes(bytes: number, decimals = 2): string
```

Example:
```tsx
formatBytes(1024) // "1 KB"
formatBytes(1536, 1) // "1.5 KB"
```

## Extending the Hook

`useFileUpload` Hook은 파일 선택과 검증의 핵심 기능을 처리하는 시작점으로 설계되었습니다. 더 고급 기능을 구축하기 위해 확장할 수 있습니다:

### 업로드 일시정지 및 재개

XMLHttpRequest의 abort 메서드를 사용하고 업로드 진행률을 추적하여 일시정지/재개 기능을 구현할 수 있습니다:

```tsx
const uploadWithPauseResume = (file: File) => {
  let xhr: XMLHttpRequest | null = new XMLHttpRequest();
  let isPaused = false;
  let uploadedBytes = 0;

  const pause = () => {
    if (xhr && !isPaused) {
      xhr.abort();
      isPaused = true;
    }
  };

  const resume = () => {
    if (isPaused) {
      // 새 요청 생성
      xhr = new XMLHttpRequest();

      // 중단된 지점부터 재개하기 위한 Content-Range 헤더 설정
      const formData = new FormData();
      formData.append('file', file);

      xhr.open('POST', '/api/upload', true);
      xhr.setRequestHeader('Content-Range', `bytes ${uploadedBytes}-${file.size-1}/${file.size}`);

      // 진행률 추적 다시 설정
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          uploadedBytes = event.loaded;
          // 진행률 UI 업데이트
        }
      });

      xhr.send(formData);
      isPaused = false;
    }
  };

  return { pause, resume };
};
```

### Chunked Uploads

대용량 파일의 경우 청크 업로드를 구현할 수 있습니다:

```tsx
const uploadInChunks = (file: File, chunkSize = 1024 * 1024) => {
  let currentChunk = 0;
  const totalChunks = Math.ceil(file.size / chunkSize);

  const uploadNextChunk = async () => {
    if (currentChunk >= totalChunks) {
      // 모든 청크 업로드 완료
      return;
    }

    const start = currentChunk * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('fileName', file.name);
    formData.append('chunkIndex', currentChunk.toString());
    formData.append('totalChunks', totalChunks.toString());

    try {
      await fetch('/api/upload-chunk', {
        method: 'POST',
        body: formData
      });

      currentChunk++;
      // 진행률 UI 업데이트
      const progress = Math.round((currentChunk / totalChunks) * 100);

      // 다음 청크 계속 진행
      uploadNextChunk();
    } catch (error) {
      // 에러 처리, 재시도 로직 구현
    }
  };

  // 업로드 프로세스 시작
  uploadNextChunk();
};
```
