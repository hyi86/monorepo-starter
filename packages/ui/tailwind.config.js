/**
 * 기본적으로 tailwind 설정에는 tawilwind.config.js 파일이 필요 없지만,
 * @tailwindcss/typography 플러그인의 커스텀 설정을 사용하기 위해 추가.
 */
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'span[style]>strong': {
              color: 'inherit',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'ul[data-type="taskList"]>li>label+div': {
              display: 'inline-block',
              marginLeft: '0.5rem',
            },
            'ul[data-type="taskList"]>li>label': {
              position: 'relative',
              top: '0.125rem',
            },
          },
        },
      },
    },
  },
};
