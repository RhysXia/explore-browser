import { styled } from "@xl-vision/react";
import React from "react";
import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AppThemeContext, { AppTheme } from "../lib/theme";

const Root = styled('div')(() => {
  return {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }
})

const Main = styled("div")<{ appTheme: AppTheme }>(({ theme, styleProps }) => {
  const { appTheme } = styleProps;
  return {
    flex: 1,
    margin: "16px auto",
    maxWidth: appTheme.maxWidth,
  };
});

const DefaultLayout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const appTheme = useContext(AppThemeContext);

  return (
    <Root>
      <Header />
      <Main styleProps={{ appTheme }}>{children}</Main>
      <Footer />
    </Root>
  );
};

export default DefaultLayout;
