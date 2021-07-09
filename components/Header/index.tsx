import React from "react";
import Link from "next/link";
import { styled } from "@xl-vision/react";

export type HeaderProps = {};

const Root = styled("header")(
  ({ theme }) => `
  border-bottom: 1px solid ${theme.color.divider};
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
