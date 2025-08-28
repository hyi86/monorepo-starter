/**
 * 컴포넌트별 필수 스타일 목록
 * - style 태그로 들어감
 * - width, height, position, transform, overflow 등 렌더링에 필요한 필수 스타일
 * - border, padding, color, font 등은 제외
 */

export const defaultColumnWidth: React.CSSProperties['width'] = 48;
export const defaultColumnHeight: React.CSSProperties['height'] = 36;
export const contentWidth: React.CSSProperties['width'] = 700;
export const contentHeight: React.CSSProperties['height'] = 380;

// ------------------- Root -------------------
export const getRootStyle = () => {
  return {
    display: 'flex',
    position: 'relative',
  } as React.CSSProperties;
};

export const getCornerStyle = () => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: defaultColumnWidth,
    height: defaultColumnHeight,
    zIndex: 20,
  } as React.CSSProperties;
};

export const getRootContainerStyle = () => {
  return {
    width: contentWidth,
    height: contentHeight,
    overflow: 'auto',
  } as React.CSSProperties;
};

// ------------------- Row Header -------------------

export const getRowHeaderStyle = (
  height: React.CSSProperties['height'],
  paddingTop: React.CSSProperties['paddingTop'],
) => {
  return {
    height,
    flexShrink: 0,
    overflow: 'hidden',
    paddingTop,
  } as React.CSSProperties;
};

export const getRowHeaderContentStyle = (height: number) => {
  return {
    height,
  } as React.CSSProperties;
};

export const getRowHeaderContentScrollStyle = (scrollTop: number) => {
  return {
    transform: `translateY(-${scrollTop}px)`,
  } as React.CSSProperties;
};

export const getRowHeaderContentItemStyle = () => {
  return {
    contentVisibility: 'auto',
    containIntrinsicSize: defaultColumnHeight,
    height: defaultColumnHeight,
    width: defaultColumnWidth,
  } as React.CSSProperties;
};

// ------------------- Column Header -------------------

export const getColumnHeaderStyle = () => {
  return {
    position: 'sticky',
    top: 0,
    zIndex: 1,
  } as React.CSSProperties;
};

export const getColumnHeaderContentStyle = (width: React.CSSProperties['width']) => {
  return {
    width,
  } as React.CSSProperties;
};

export const getColumnHeaderItemStyle = (
  height: React.CSSProperties['height'],
  width: React.CSSProperties['width'],
  start: number,
) => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 0,
    height,
    width,
    transform: `translateX(${start}px)`,
  } as React.CSSProperties;
};

// ------------------- Resize Handle -------------------
export const getResizeHandleStyle = () => {
  return {
    position: 'absolute',
    height: '100%',
    width: 4,
    top: 0,
    right: 0,
    cursor: 'col-resize',
  } as React.CSSProperties;
};

// ------------------- Cell -------------------

export const getCellRootStyle = (height: number, width: number) => {
  return {
    position: 'relative',
    height,
    width,
  } as React.CSSProperties;
};

export const getCellStyle = (height: number, width: number, startX: number, startY: number) => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    transform: `translateX(${startX}px) translateY(${startY}px)`,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as React.CSSProperties;
};
