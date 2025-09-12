/**
 * `web` 에서 콘솔 로그 스타일을 유지하기 위한 유틸리티 Logger
 */
export function webLog(type: 'process' | 'success' | 'info' | 'warn' | 'error' | 'none', ...args: any[]) {
  switch (type) {
    case 'process':
      console.log(`%c⏳ ${args[0]}`, 'color:rgb(161,161,170);', ...args.slice(1));
      return;
    case 'success':
      console.log(`%c✅ ${args[0]}`, 'color:rgb(21,128,61);', ...args.slice(1));
      return;
    case 'info':
      console.log(`%c💡 ${args[0]}`, 'color:rgb(100,149,237);', ...args.slice(1));
      return;
    case 'warn':
      console.log(`%c⚠️ ${args[0]}`, 'color:rgb(202,138,4);', ...args.slice(1));
      return;
    case 'error':
      console.log(`%c❌ ${args[0]}`, 'color:rgb(185,28,28);', ...args.slice(1));
      return;
    default:
      console.log(...args);
      return;
  }
}
