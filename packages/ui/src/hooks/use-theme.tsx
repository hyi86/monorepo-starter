import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes';

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();
  return { theme, setTheme };
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  );
}
