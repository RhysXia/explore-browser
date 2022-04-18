import { gql, useMutation } from '@apollo/client';
import { styled, Input, Button } from '@xl-vision/react';
import { NextComponentType } from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Link from 'next/link';
import React, { FormEvent } from 'react';
import { LayoutKey } from '../../layout';
import { useAppDispatch, useAppSelector } from '../../lib/store';
import { setToken } from '../../lib/store/store';
import { AppPageContext } from '../../../typings/next';
import { CaretRightFilled } from '@xl-vision/icons';

const Root = styled('div')(({ theme }) => {
  const { elevations, color } = theme;

  return {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url('https://static.zhihu.com/heifetz/assets/sign_bg.db29b0fb.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

    '.form-wrap': {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    '.form': {
      backgroundColor: theme.color.background.paper,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 24px 48px',
      width: 400,
      borderRadius: 4,
      ...elevations(5),

      '.title': {
        textAlign: 'center',
      },
      '.xl-input': {
        marginBottom: 20,
      },

      '.sign-up': {
        marginTop: 16,
        textAlign: 'right',
        a: {
          display: 'inline-flex',
          alignItems: 'center',
        },
      },
    },
  };
});

const loginGql = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const SignIn: NextComponentType<AppPageContext, { layout: LayoutKey }> = (props) => {
  const router = useRouter();

  const token = useAppSelector((state) => state.token);

  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState('');

  const [login] = useMutation<{ login: string }, { username: string; password: string }>(loginGql);

  React.useEffect(() => {
    // 用户已登录，则跳转回首页
    if (token) {
      router.replace('/');
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
        setError((e as Error).message);
      }
    },
    [login, dispatch, username, password],
  );

  return (
    <>
      <Head>
        <title>登录｜Explore</title>
      </Head>
      <Root>
        <div className='form-wrap'>
          <form className='form' onSubmit={handleSubmit}>
            <h1 className='title'>
              <Link href='/'>Explore</Link>
            </h1>
            {error && <div className='msg'>{error}</div>}
            <Input value={username} onChange={setUsername} placeholder='用户名'></Input>
            <Input.Password
              value={password}
              onChange={setPassword}
              placeholder='密码'
            ></Input.Password>
            <Button color='primary' type='submit'>
              登录
            </Button>
            <div className='sign-up'>
              <Link href='/signUp'>
                <a>
                  去注册
                  <CaretRightFilled />
                </a>
              </Link>
            </div>
          </form>
        </div>
      </Root>
    </>
  );
};

SignIn.getInitialProps = async (ctx) => {
  return {
    layout: 'empty',
  };
};

export default SignIn;
