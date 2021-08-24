import React from "react";
import { ContentType } from "../../types/model";
import { Button, styled } from "@xl-vision/react";
import AppThemeContext, { AppTheme } from "../../lib/theme";
import Link from "next/link";
import { WriteStatus } from "./types";

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
        marginLeft: 16,
        borderLeft: `1px solid ${theme.color.divider}`,
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        padding: 0,

        li: {
          paddingLeft: 16,
        },
      },
      ".label": {
        fontWeight: theme.typography.fontWeight.bold,
      },
      ".status": {
        color: theme.color.text.hint,
      },
      ".actions": {
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

export type WriteHeaderProps = {
  title?: string;
  content?: string;
  contentType?: ContentType;
  status?: WriteStatus;
};

const WriteHeader: React.FunctionComponent<WriteHeaderProps> = (props) => {
  const appTheme = React.useContext(AppThemeContext);

  const { title, content, contentType, status } = props;

  const handlePublish = React.useCallback(() => {}, []);

  return (
    <Root styleProps={{ appTheme }}>
      <div className="container">
        <div className="logo">
          <Link href="/">Explore</Link>
        </div>
        <ul className="menus">
          <li className="label">写文章</li>
          <li className="status">
            {status === WriteStatus.SAVED
              ? "已保存"
              : status === WriteStatus.SAVING
              ? "保存中..."
              : ""}
          </li>
        </ul>
        <div className="actions">
          <Button
            disableElevation
            variant="outlined"
            theme="primary"
            size="small"
            disabled={!title || !content || !contentType}
            onClick={handlePublish}
          >
            发布
          </Button>
        </div>
      </div>
    </Root>
  );
};

export default WriteHeader;
