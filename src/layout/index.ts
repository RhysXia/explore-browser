import DefaultLayout from './Default';
import EmptyLayout from './Empty';
import SpaceLayout from './Space';

const LayoutMap = {
  default: DefaultLayout,
  empty: EmptyLayout,
  space: SpaceLayout,
};

export default LayoutMap;

export type LayoutKey = keyof typeof LayoutMap;
