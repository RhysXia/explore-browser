import Head from 'next/head';
import React from 'react';
import { Page } from '../../../typings/next';
import Editor from '../../components/Editor';
import { WriteStatus } from '../../components/write/types';
import WriteHeader from '../../components/write/WriteHeader';
import { ContentType } from '../../models/article';

const Write: Page = (props) => {
  const [status, setStatus] = React.useState<WriteStatus>();
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [contentType, setContentType] = React.useState<ContentType>(ContentType.MARKDOWN);

  return (
    <>
      <Head>
        <title>写文章｜Explore</title>
      </Head>
      <div>
        <WriteHeader title={title} content={content} contentType={contentType} status={status} />
        <Editor />
      </div>
    </>
  );
};

Write.getInitialProps = async ({ reduxStore }) => {
  if (!reduxStore.getState().currentUser) {
    return {
      error: {
        code: 403,
        title: '无权限访问',
      },
    };
  }
  return {
    layout: 'empty',
  };
};

export default Write;
