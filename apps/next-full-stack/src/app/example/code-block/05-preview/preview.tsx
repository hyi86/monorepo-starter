import fs from 'node:fs';
import { ComponentType } from 'react';
import { PreviewProvider } from './preview-provider';

type Props = {
  fileName: string;
};

/**
 * 코드 블럭 파일 미리보기 컴포넌트
 * ⚠️ 코드를 직접 경로에서 읽어오기 때문에 주의
 */
export async function Preview({ fileName }: Props) {
  try {
    const Component = (await import(`~/app/example/${fileName}`)).default as ComponentType;
    const code = fs.readFileSync(`src/app/example/${fileName}`, 'utf8');
    return (
      <PreviewProvider code={code}>
        <Component />
      </PreviewProvider>
    );
  } catch (error) {
    console.error(error);
    return <div>File not found</div>;
  }
}
