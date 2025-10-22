import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react-vite';
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
