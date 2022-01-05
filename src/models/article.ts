export enum ContentType {
  HTML,
  MARKDOWN,
}

export type Article = {
  id: number;
  title: number;
  content: string;
  contentType: ContentType;
};
