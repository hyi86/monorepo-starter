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
