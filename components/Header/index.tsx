import React from "react";
import Link from "next/link";
import { styled } from "@xl-vision/react";

export type HeaderProps = {};

const Root = styled("header")(
  ({ theme }) => `
  box-shadow: 0 1px 2px 0 ${theme.color.divider};
  background-color: ${theme.color.background.paper};
  height: 60px;
`
);

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return (
    <Root>
      <Link href="/login">login</Link>
    </Root>
  );
};

export default Header;
