import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v1 } from "uuid";

const defaultBtnConfig = {
  actionBtnProps: {
    variant: "default",
    children: "확인",
  },
  cancelBtnProps: {
    variant: "outline",
    children: "취소",
  },
};

const triggerElements = new WeakMap();

export const useDialogStore = create(
  devtools(
    (set, get) => ({
      dialogList: [],

      alert: async ({ title, text, actionBtnProps, ...props }) => {
        const uuid = v1();
        const { dialogList } = get();

        const activeElement = document.activeElement;
        let triggerKey = null;
        if (activeElement) {
          triggerKey = {}; // 새 객체를 키로 생성
          triggerElements.set(triggerKey, activeElement);
          activeElement.blur();
        }

        return new Promise((resolve, reject) => {
          set({
            dialogList: [
              ...dialogList,
              {
                name: `alert-${uuid}`,
                trigger: triggerKey,
                resolve,
                title,
                text,
                actionBtnProps: {
                  ...defaultBtnConfig.actionBtnProps,
                  ...actionBtnProps,
                },
                ...props,
              },
            ],
          });
        });
      },

      confirm: async ({
        title,
        text,
        actionBtnProps,
        cancelBtnProps,
        ...props
      }) => {
        const uuid = v1();
        const { dialogList } = get();

        const activeElement = document.activeElement;
        let triggerKey = null;
        if (activeElement) {
          triggerKey = {}; // 새 객체를 키로 생성
          triggerElements.set(triggerKey, activeElement);
          activeElement.blur();
        }

        return new Promise((resolve, reject) => {
          set({
            dialogList: [
              ...dialogList,
              {
                name: `alert-${uuid}`,
                trigger: triggerKey,
                resolve,
                title,
                text,
                confirm: true,
                actionBtnProps: {
                  ...defaultBtnConfig.actionBtnProps,
                  ...actionBtnProps,
                },
                cancelBtnProps: {
                  ...defaultBtnConfig.cancelBtnProps,
                  ...cancelBtnProps,
                },
                ...props,
              },
            ],
          });
        });
      },

      dialogData: ({ dialogName = "" }) => {
        const { dialogList } = get();
        const currentDialog = dialogList.find((d) => d.name === dialogName);
        if (currentDialog) {
          return currentDialog.data;
        }
        return null;
      },

      dialogOpen: async (dialogName = "", { callback, data } = {}) => {
        const { dialogList } = get();
        try {
          if (dialogList.some((dialog) => dialog.name === dialogName))
            throw "이미 열려있는 모달";
          if (!dialogName) throw "모달 이름 입력";

          const activeElement = document.activeElement;
          let triggerKey = null;
          if (activeElement) {
            triggerKey = {}; // 새 객체를 키로 생성
            triggerElements.set(triggerKey, activeElement);
            activeElement.blur();
          }

          return new Promise((resolve, reject) => {
            set({
              dialogList: [
                ...dialogList,
                {
                  name: dialogName,
                  triggerKey,
                  resolve,
                  data,
                },
              ],
            });
            setTimeout(() => {
              if (callback) callback();
            }, 100);
          });
        } catch (e) {
          console.error(e);
        }
      },

      dialogClose: async (
        dialogName = "",
        { confirm = false, callback } = {}
      ) => {
        try {
          document.activeElement?.blur();
          const { dialogList } = get();
          if (dialogName === "") throw "모달 이름 입력";
          const dialog = dialogList.find(
            (dialog) => dialog.name === dialogName
          );
          if (!dialog) throw "없는 모달 닫음";

          set({
            dialogList: dialogList.filter(
              (dialog) => dialog.name !== dialogName
            ),
          });
          dialog.resolve(confirm);
          if (callback) callback();
          setTimeout(() => {
            if (dialog.triggerKey && triggerElements.has(dialog.triggerKey)) {
              const originalElement = triggerElements.get(dialog.triggerKey);
              if (
                originalElement &&
                typeof originalElement.focus === "function"
              ) {
                originalElement.focus();
              }
            }
          }, 100);
        } catch (e) {
          console.error(e);
        }
      },

      // 모든 모달 닫기
      dialogCloseAll: () => {
        const { dialogList } = get();
        // 모든 모달의 resolve 함수 호출
        dialogList.forEach((dialog) => {
          if (dialog.resolve) {
            dialog.resolve(false);
          }
        });

        set({
          dialogList: [],
        });
      },
    }),
    { name: "dialog-store" }
  )
);
