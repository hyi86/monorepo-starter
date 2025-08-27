/*
getRootStyle
  ├── getCornerStyle
  ├── getRowHeaderStyle
  └── getRootContainerStyle
      ├── getColumnHeaderStyle
          ├── getColumnHeaderContentStyle
      └── getColumnHeaderItemStyle
  ├── getResizeHandleStyle
  └── getCellStyle
      ├── getCellContentStyle
      └── getCellContentItemStyle
*/

// ------------------- Root -------------------
export const getRootStyle = () => {
  return {
    display: 'flex',
    position: 'relative',
  } as React.CSSProperties;
};

export const getCornerStyle = (height: React.CSSProperties['height']) => {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 36,
    height,
    zIndex: 20,
  } as React.CSSProperties;
};

export const getRootContainerStyle = (width: React.CSSProperties['width'], height: React.CSSProperties['height']) => {
  return {
    width,
    height,
    overflow: 'auto',
  } as React.CSSProperties;
};

// ------------------- Row Header -------------------

export const getRowHeaderStyle = (height: React.CSSProperties['height'], paddingTop: number) => {
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

export const getRowHeaderContentItemStyle = (height: number) => {
  return {
    contentVisibility: 'auto',
    containIntrinsicSize: height,
    height,
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

export const getColumnHeaderItemStyle = (height: number, width: number, start: number) => {
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
    width: 2,
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
