import React from "react";
import Link from 'next/link'

export type HeaderProps = {};

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  return <header>
    <Link href="/login">login</Link>
  </header>;
};

export default Header;
