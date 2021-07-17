import Head from "next/head";
import React from "react";
import ArticleWriteHeader from "../../components/ArticleWriteHeader";
import Context, {
  WriteStatus,
} from "../../components/ArticleWriteHeader/Context";
import { ContentType } from "../../model";
import { Page } from "../../typings/next";

const Write: Page = (props) => {
  const [status, setStatus] = React.useState<WriteStatus>();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [contentType, setContentType] = React.useState<ContentType>(
    ContentType.MARKDOWN
  );

  return (
    <>
      <Head>
        <title>写文章｜Explore</title>
      </Head>
      <div>
        <Context.Provider value={{ title, content, contentType, status }}>
          <ArticleWriteHeader />
        </Context.Provider>
      </div>
    </>
  );
};

Write.getInitialProps = async ({ reduxStore }) => {
  if (!reduxStore.getState().currentUser) {
    return {
      error: {
        code: 403,
        title: "无权限访问",
      },
    };
  }
  return {
    layout: "empty",
  };
};

export default Write;
