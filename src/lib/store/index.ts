import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { User } from '../../models/user';

const tokenStore = atom<string>('');

const currentUserStore = atom<User | null>(null);

export { tokenStore, currentUserStore };

// export const useHydrateStore = () => {
//   const [tokenValue] = useAtom(token);
//   const [currentUserValue] = useAtom(currentUser);

//   useHydrateAtoms([
//     [token, tokenValue],
//     [currentUser, currentUserValue],
//   ] as const);
// };
