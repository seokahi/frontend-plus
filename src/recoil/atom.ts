import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: 'user',
  storage: localStorage
});

// Atom for user state
export const userState = atom({
  key: 'userState',
  default: {
    _id: 0,
    email: "",
    name: "",
    profileImage: "",
    accessToken: "",
    refreshToken: ""
  },
  effects:[persistAtom]
});
