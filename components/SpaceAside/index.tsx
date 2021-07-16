import React from "react";
import { styled } from "@xl-vision/react";

export type HeaderProps = {};

const Root = styled("div")(
  ({ theme,  }) => {
    return {
    }
  }
);

const SpaceAside: React.FunctionComponent<HeaderProps> = (props) => {
  return <Root>aside</Root>
};

export default SpaceAside;
