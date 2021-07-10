import { gql, useMutation } from "@apollo/client";
import { styled } from "@xl-vision/react";
import { NextComponentType } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import React, { FormEvent } from "react";
import { LayoutKey } from "../../layout";
import { useAppDispatch, useAppSelector } from "../../lib/redux";
import { setToken } from "../../lib/redux/store";
import { AppPageContext } from "../../typings/next";

const Root = styled("div")(({ theme }) => {
  return {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url('https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    ".form-wrap": {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
    },

    ".form": {
      backgroundColor: theme.color.background.paper,
      display: "flex",
      flexDirection: "column",
      padding: "0 24px 84px",
    },

    ".title": {
      textAlign: "center",
    },
  };
});

const loginGql = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const SignIn: NextComponentType<AppPageContext, { layout: LayoutKey }> = (
  props
) => {
  const router = useRouter();

  const token = useAppSelector((state) => state.token);

  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState("");

  const [login] = useMutation<
    { login: string },
    { username: string; password: string }
  >(loginGql);

  React.useEffect(() => {
    // 用户已登录，则跳转回首页
    if (token) {
      router.replace("/");
    }
  }, [router, token]);

  const handleSubmit = React.useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      try {
        const { data } = await login({
          variables: {
            username,
            password,
          },
        });
        dispatch(setToken(data?.login));
      } catch (e) {
        setError(e.message);
      }
    },
    [login, dispatch, username, password]
  );

  return (
    <>
      <Head>
        <title>登录｜Explore</title>
      </Head>
      <Root>
        <div className="form-wrap">
          <form className="form" onSubmit={handleSubmit}>
            <h1 className="title">
              <Link href="/">Explore</Link>
            </h1>
            {error && <div className="msg">{error}</div>}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="用户名"
            ></input>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              type="password"
            ></input>
            <button type="submit">登录</button>
          </form>
        </div>
      </Root>
    </>
  );
};

SignIn.getInitialProps = async (ctx) => {
  return {
    layout: "empty",
  };
};

export default SignIn;
