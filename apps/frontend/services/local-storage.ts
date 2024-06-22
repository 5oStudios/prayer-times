const browserLocalStorage = {
  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getItem(key: string) {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
};
const serverLocalStorage = {
  setItem(key: string, value: any) {
    return;
  },
  getItem(key: string) {
    return {};
  },
  removeItem(key: string) {
    return;
  },
  clear() {
    return;
  },
};

export const safeLocalStorage = (() => {
  if (typeof window === 'undefined') {
    return serverLocalStorage;
  }
  return browserLocalStorage;
})();
