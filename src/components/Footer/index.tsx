import { styled } from "@xl-vision/react";
import React, { useContext } from "react";
import AppThemeContext, { AppTheme } from "../../lib/theme";

export type FooterProps = {};

const Root = styled("footer")<{ appTheme: AppTheme }>(({ styleProps }) => {
  const { appTheme } = styleProps;
  return {
    margin: "auto",
    maxWidth: appTheme.maxWidth,
  };
});

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  const appTheme = useContext(AppThemeContext);

  return <Root styleProps={{ appTheme }}>Footer</Root>;
};

export default Footer;
