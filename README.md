# gywx

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## IE11 兼容性说明

本项目已针对 IE11 进行兼容性适配，包括 Babel 转译、Polyfill 引入和构建配置调整。

### 已完成的适配工作

1.  **Babel 配置**: 
    - 启用了 `@vue/cli-plugin-babel/preset` 的 `useBuiltIns: 'entry'` 模式。
    - 目标环境包含 `IE 11`。
    - 引入了 `core-js@3` 和 `regenerator-runtime` 以支持 ES6+ 特性。

2.  **构建配置**:
    - 在 `vue.config.js` 中配置了 `transpileDependencies`，强制转译 `element-ui`, `axios`, `vuex`, `vue-router` 等依赖。
    - 配置 `browserslist` 为 `> 0.25%, last 2 versions, IE 11`。

3.  **入口文件**:
    - 在 `src/main.js` 顶部引入了 `core-js/stable` 和 `regenerator-runtime/runtime`。

### PDF 预览 (PDF.js) 注意事项

本项目使用的 PDF.js 版本可能包含 ES6 语法（如 `class`），这在 IE11 中无法运行。

**解决方案**:
1.  下载兼容 ES5 的 PDF.js 构建版本 (Legacy Build)。
    - 访问 [PDF.js GitHub Releases](https://github.com/mozilla/pdf.js/releases) 寻找 `es5` 或 `legacy` 版本。
    - 替换 `public/pdf/build/pdf.js` 和 `public/pdf/build/pdf.worker.js`。
2.  确保 `public/pdf/web/viewer.html` 中引入了 `polyfill.js`。
    - 如果 `public` 目录下缺少 `polyfill.js`，请从 PDF.js 的发布包中复制该文件到 `public/` 目录。
    - 取消 `viewer.html` 中对 `polyfill.js` 的注释。

### 开发建议

- 避免在 `public/` 目录下的静态文件中直接编写 ES6 代码，因为这些文件不会经过 Babel 转译。
- 尽量使用 `npm` 依赖并在 `vue` 组件中编写代码，以确保构建工具能正确处理兼容性。
