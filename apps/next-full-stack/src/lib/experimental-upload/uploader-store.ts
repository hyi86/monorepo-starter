import { createStore } from 'zustand/vanilla';

type UploaderState = {
  status: 'ready' | 'uploading' | 'done';
  files: File[];
  progress: Record<string, number>;
  totalUploaded: number; // 누적 업로드 바이트
  totalSize: number; // 전체 파일 크기
  overallPercent: number; // 전체 진행률
};

type UploaderActions = {
  setStatus: (status: UploaderState['status']) => void;
  setFiles: (files: File[]) => void;
  setProgress: (fileName: string, percent: number) => void;
  setOverallProgress: (uploaded: number, total: number) => void;
  init: () => void;
};

export const initUploaderStore = (): UploaderState => ({
  status: 'ready',
  files: [],
  progress: {},
  totalUploaded: 0,
  totalSize: 0,
  overallPercent: 0,
});

export const createUploaderStore = (initState = initUploaderStore()) =>
  createStore<UploaderState & UploaderActions>()((set) => {
    return {
      ...initState,
      setStatus: (status: UploaderState['status']) => set({ status }),
      setFiles: (files) => set((state) => ({ files: [...state.files, ...files] })),
      setProgress: (fileName, percent) => {
        set((state) => ({
          progress: { ...state.progress, [fileName]: percent },
        }));
      },
      setOverallProgress: (uploaded, total) => {
        set(() => ({
          totalUploaded: uploaded,
          totalSize: total,
          overallPercent: total === 0 ? 0 : Math.round((uploaded / total) * 100),
        }));
      },
      init: () => {
        set(initUploaderStore());
      },
    };
  });
