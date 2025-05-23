type Command = {
  commandType: 'bash' | 'file';
  filePath?: string;
  code: string;
};
