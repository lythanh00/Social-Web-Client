// src/utils/navigate.ts
let navigator: ((path: string) => void) | null = null;

export const setNavigator = (navFn: (path: string) => void) => {
  navigator = navFn;
};

export const navigateTo = (path: string) => {
  if (navigator) {
    navigator(path);
  } else {
    console.warn('Navigator chưa được thiết lập');
  }
};
