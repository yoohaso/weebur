import styled, { type DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyle from './globalstyles';
import Head from 'next/head';

const theme: DefaultTheme = {
  colors: {
    primary: '#000000',
    secondary: '#0070f3',
    background: '#ffffff',
  },
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <title>weebur</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Main>{children}</Main>
    </ThemeProvider>
  );
}

export default Layout;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1000px;
  min-width: 300px;
  margin: 20px auto;
`;
