# Vue後台前端

## 架構圖

<https://cacoo.com/diagrams/82xaZglNdHwM5MB7/3FD9B>

<img src="./docs/img/vue-booking-admin-structure-diagram.png" alt="image_name png" />

## Features

- Vue 3
- Pnpm 8
- Vite 4
- [Pinia](https://pinia.vuejs.org/) store
  - [pinia-plugin-persistedstate](https://www.npmjs.com/package/pinia-plugin-persistedstate)
- Routing using [vue-router 4](https://router.vuejs.org/)
- TypeScript 5
- Axios
- Tailwind CSS 3
- Vue-i18n 9
- PostCSS 8 w/ `postcss-nesting` plugin
- [Cssnano](https://cssnano.co/) for minimizing production CSS
- [Postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem) generates rem units from pixel units
- [Vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons) generate svg sprite map
- [Unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components) auto importing for common components
- Eslint
  - [config airbnb](https://www.npmjs.com/package/eslint-config-airbnb-base)
- Prettier
- [Husky](https://www.npmjs.com/package/husky) to improves commits
  - if encounter npx: command not found, can execute `ln -s $(which npx) /usr/local/bin/npx` in zsh
  - [commitlint](https://commitlint.js.org/#/) checks if your commit messages meet the conventional commit format
  - [lint-staged](https://github.com/okonet/lint-staged) filter files checked by pre commit lint
- Alias `@` to `<project_root>/src`
- UI Library use [Element Plus](https://element-plus.org/#/en-US)
- Mock use [msw](https://mswjs.io/)
  - `npx msw init ./public`
- Unit test use [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
  - [jsdom](https://www.npmjs.com/package/jsdom)
  - [@vitest/coverage-v8](https://vitest.dev/guide/coverage.html)
  - [@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)
  - [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro/)
  - [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/)
- E2E test use [playwright](https://playwright.dev/)
  - `npx playwright install`
- Predefined and fully typed global variables:
  - `VITE_APP_VERSION` is read from `package.json` version at build time
  - `VITE_APP_BUILD_EPOCH` is populated as `new Date().getTime()` at build time
- GitHub workflows
  - release please action
  - Automated unit tests
  - Automated e2e tests

## Project Files

```text
src/
├── __tests__/
│   ├── __mocks__/
│   ├── setup/
│   │   └── unitTest.ts
│   ├── e2e/*
│   └── unit/*
├── apis/*
├── assets/*
│   └── images/
│       └── svgIcons
│          └── vue.svg
├── components/
│   ├── common/
│   │   └── SvgIcon.vue
│   └── indexPage/
│       └── HelloWorld.vue
├── configs/*
├── hooks/*
├── locales/
│   ├── en-US.json
│   └── zh-CN.json
├── mocks/
│   ├── handlers/*
│   │   ├── apis/*
│   │   └── index.ts
│   │── browser.ts
│   └── server.ts
├── pages/
│   └── IndexPage.vue
├── plugins/
│   └── i18n.ts
├── router/
│   └── index.ts
├── stores/
│   ├── modules
│   │   └── config.ts
│   └── index.ts
├── styles/
│   ├── common/
|   │   ├── all.postcss
|   │   └── button.postcss
│   ├── index.postcss
│   └── tailwind.postcss
├── types/*
├── utils/*
├── App.vue
├── vite-env.d.ts
└── main.ts
```
