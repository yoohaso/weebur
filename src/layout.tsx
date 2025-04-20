import styled, { type DefaultTheme, ThemeProvider } from 'styled-components';
import GlobalStyle from './globalstyles';

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
  height: 100vh;
  max-width: 1000px;
  min-width: 300px;
  margin: 0 auto;
  border: 1px solid grey;
`;
