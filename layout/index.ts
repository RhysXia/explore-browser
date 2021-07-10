import DefaultLayout from "./Default";
import EmptyLayout from "./Empty";

const LayoutMap = {
  default: DefaultLayout,
  empty: EmptyLayout,
}

export default LayoutMap

export type LayoutKey = keyof typeof LayoutMap