import React from "react";
import Link from "next/link";
import {
  styled,
  Dropdown,
  Dialog,
  Avatar,
  ThemeContext,
} from "@xl-vision/react";
import { useAppDispatch, useAppSelector } from "../../lib/redux";
import { useContext } from "react";
import AppThemeContext, { AppTheme } from "../../lib/theme";
import { gql, useMutation } from "@apollo/client";
import { setCurrentUser, setToken } from "../../lib/redux/store";
import { useRouter } from "next/dist/client/router";
import { Cookie } from "next-cookie";
import { TOKEN_KEY } from "../../utils/consts";
import NoSsr from "../NoSsr";

export type HeaderProps = {};

const Root = styled("header")<{ appTheme: AppTheme }>(
  ({ theme, styleProps }) => {
    const { appTheme } = styleProps;
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
  }
);

const logoutGql = gql`
  mutation {
    logout
  }
`;

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const currentUser = useAppSelector((state) => state.currentUser);

  const theme = React.useContext(ThemeContext);

  const appTheme = useContext(AppThemeContext);

  const [logout] = useMutation(logoutGql);

  const [dialog, contextHolder] = Dialog.useDialog();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleSignOut = React.useCallback(() => {
    dialog.confirm({
      title: "注销",
      content: "确认注销吗？",
      onConfirm: async () => {
        try {
          await logout();

          dispatch(setToken(undefined));
          dispatch(setCurrentUser(undefined));
          const cookie = new Cookie();
          cookie.remove(TOKEN_KEY);
          router.replace("/");
        } catch {}
      },
    });
  }, [dialog, logout, dispatch, router]);

  const handleSpace = React.useCallback(() => {
    router.push("/space");
  }, [router]);

  const handleWrite = React.useCallback(() => {
    router.push("/write");
  }, [router]);

  return (
    <Root styleProps={{ appTheme }}>
      <div className="container">
        <div className="logo">
          <Link href="/">Explore</Link>
        </div>
        <ul className="menus">{/* <li>123</li> */}</ul>
        <ul className="user">
          {currentUser ? (
            <li>
              <NoSsr>
                <Dropdown
                  menus={
                    <>
                      <Dropdown.Item onClick={handleSpace}>
                        个人主页
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleWrite}>
                        写文章
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleSignOut}>
                        注销
                      </Dropdown.Item>
                    </>
                  }
                >
                  {/* 如果图片链接失效，ssr会导致onError事件不触发，图片显示会出问题，所以使用NoSsr */}
                  <Avatar
                    style={{
                      backgroundColor: theme.color.themes.primary.color,
                      cursor: "pointer",
                    }}
                    src={currentUser.avatar}
                  >
                    {currentUser.nickname.slice(0, 1).toUpperCase()}
                  </Avatar>
                </Dropdown>
              </NoSsr>
            </li>
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
      {contextHolder}
    </Root>
  );
};

export default Header;
