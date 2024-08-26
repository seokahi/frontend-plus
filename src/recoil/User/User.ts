import { selector } from 'recoil';
import { userState } from '../atom';

export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => {
    return get(userState); 
  },

  set: ({ set }, newValue) => set(userState, newValue),
});

export const logoutState = selector({
  key: 'logoutState',
  get: ({ get }) => {
    return get(userState); 
  },
  set: ({ set },value) => {
    set(userState, value);
  },
});
