import { styled } from '@xl-vision/react';
import React from 'react';
import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SpaceAside from '../components/SpaceAside';
import AppThemeContext, { AppTheme } from '../lib/theme';

const Root = styled('div')(() => {
  return {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };
});

const Container = styled('div')<{ appTheme: AppTheme }>(({ theme, styleProps }) => {
  const { appTheme } = styleProps;
  return {
    flex: 1,
    width: '100%',
    maxWidth: appTheme.maxWidth,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
  };
});

const Main = styled('div')(({ theme }) => {
  return {};
});

const DefaultLayout: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const appTheme = useContext(AppThemeContext);

  return (
    <Root>
      <Header />
      <Container styleProps={{ appTheme }}>
        <SpaceAside />
        <Main>{children}</Main>
      </Container>
      <Footer />
    </Root>
  );
};

export default DefaultLayout;
