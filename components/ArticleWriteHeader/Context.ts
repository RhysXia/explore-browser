import React from "react";
import { ContentType } from "../../model";

export enum WriteStatus {
  SAVING,
  SAVED,
}

export type ArticleContextProps = {
  title?: string;
  content?: string;
  contentType?: ContentType;
  status? : WriteStatus
};
export default React.createContext<ArticleContextProps>({});