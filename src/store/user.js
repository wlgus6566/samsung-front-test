import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  user: null,
  isLoggedIn: false,
};

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        // 사용자 정보 설정
        setUser: (user) =>
          set({
            user,
            isLoggedIn: !!user,
          }),

        // 사용자 정보 초기화 (로그아웃 시 사용)
        clearUser: () => set(initialState),
      }),
      {
        name: "user-store",
      }
    )
  )
);
