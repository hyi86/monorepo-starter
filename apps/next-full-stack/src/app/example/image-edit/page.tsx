'use client';

import { Button } from '@monorepo-starter/ui/components/button';
import { useRef } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';

export default function ImageEditPage() {
  const cropperRef = useRef<CropperRef>(null);

  const onReset = () => {
    if (cropperRef.current) {
      cropperRef.current.reset();
    }
  };

  const onFlip = (horizontal: boolean, vertical: boolean) => {
    if (cropperRef.current) {
      cropperRef.current.flipImage(horizontal, vertical);
    }
  };

  const onRotate = (angle: number) => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(angle);
    }
  };

  const onDownload = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${cropperRef.current.getCanvas()?.toDataURL()}"/>`;
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Image Edit</h1>
      <div className="mb-4 flex gap-2">
        <Button onClick={onReset}>Reset</Button>
        <Button onClick={() => onFlip(true, false)}>Flip Horizontal</Button>
        <Button onClick={() => onFlip(false, true)}>Flip Vertical</Button>
        <Button onClick={() => onRotate(90)}>Rotate 90°</Button>
        <Button onClick={() => onRotate(-90)}>Rotate -90°</Button>
        <Button onClick={onDownload}>Download</Button>
      </div>
      <div className="size-100">
        <Cropper
          ref={cropperRef}
          src="/images/cat.jpg"
          className="cropper"
          stencilProps={{
            movable: true,
            resizable: true,
            grid: true,
          }}
        />
      </div>
    </div>
  );
}
