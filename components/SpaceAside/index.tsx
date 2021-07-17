import React from "react";
import { styled } from "@xl-vision/react";
import Link from "next/link";

export type HeaderProps = {};

const Root = styled("ul")(({ theme }) => {
  return {};
});

const SpaceAside: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Root>
      <li>
        <Link href="/space/article">我的文章</Link>
      </li>
    </Root>
  );
};

export default SpaceAside;
