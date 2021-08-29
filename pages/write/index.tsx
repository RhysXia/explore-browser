import Head from "next/head";
import React from "react";
import { ContentType } from "../../types/model";
import { Page } from "../../typings/next";
import { WriteStatus } from "../../components/write/types";
import WriteHeader from "../../components/write/WriteHeader";

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
        <WriteHeader
          title={title}
          content={content}
          contentType={contentType}
          status={status}
        /> 
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
