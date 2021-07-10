import React from "react";
import Link from "next/link";
import { styled } from "@xl-vision/react";
import { useAppSelector } from "../../lib/redux";
import { useContext } from "react";
import AppThemeContext, { AppTheme } from "../../lib/theme";

export type HeaderProps = {};

const Root = styled("header")<{ appTheme: AppTheme }>(({ theme, styleProps }) => {
  const {appTheme}  = styleProps
  return {
    boxShadow: `0 1px 2px 0 ${theme.color.divider}`,
    backgroundColor: theme.color.background.paper,
    position: "sticky",
    top: 0,
    ul: {
      listStyle: "none",
    },
    a: {
      textDecoration: `none`,
      color: theme.color.text.primary,
      transition: theme.transition.standard("color"),
      "&:hover": {
        color: theme.color.themes.primary.color,
      },
    },
    ".container": {
      maxWidth: appTheme.maxWidth,
      margin: "auto",
      height: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    ".logo": {
      display: `inline-block`,
      fontSize: 18,
      fontWeight: "bold",
    },
    ".menus": {
      flex: 1,
    },
    ".user": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      li: {
        padding: `0 10px`,
      },
    },
  };
});

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const currentUser = useAppSelector((state) => state.currentUser);

  const appTheme = useContext(AppThemeContext);

  return (
    <Root styleProps={{ appTheme }}>
      <div className="container">
        <div className="logo">
          <Link href="/">Explore</Link>
        </div>
        <ul className="menus">{/* <li>123</li> */}</ul>
        <ul className="user">
          {currentUser ? (
            ""
          ) : (
            <>
              <li>
                <Link href="/signIn">登录</Link>
              </li>
              <li>
                <Link href="/signUp">注册</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </Root>
  );
};

export default Header;
