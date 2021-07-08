import { NextPageContext } from "next";
import { isServer } from "./env";

export default (req: NextPageContext['req']) => {
  if(isServer){
    req!.headers.cookie
  }
}
