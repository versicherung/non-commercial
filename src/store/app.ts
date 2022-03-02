const changeTheme = (theme: string) => {
  if (theme === 'dark') {
    document.body.setAttribute('arco-theme', 'dark');
  } else {
    document.body.removeAttribute('arco-theme');
  }
};

const themeState = atom({
  key: 'theme',
  default: 'light',
  effects: [
    ({ onSet, setSelf }) => {
      const savedValue = localStorage.getItem('theme');
      if (savedValue != null) {
        setSelf(savedValue);
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem('theme')
          : localStorage.setItem('theme', newValue);
      });
    },
    ({ onSet }) => {
      const savedValue = localStorage.getItem('theme');
      if (savedValue != null) {
        changeTheme(savedValue);
      }

      onSet((newValue) => {
        changeTheme(newValue);
      });
    },
  ],
});

export { themeState };
