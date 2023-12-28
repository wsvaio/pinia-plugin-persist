<center>

# @wsvaio/pinia-plugin-persist

pinia 持久化辅助插件

[![Size](https://img.shields.io/bundlephobia/minzip/@wsvaio/pinia-plugin-persist/latest)](https://www.npmjs.com/package/@wsvaio/pinia-plugin-persist) [![Version](https://img.shields.io/npm/v/@wsvaio/pinia-plugin-persist)](https://www.npmjs.com/package/@wsvaio/pinia-plugin-persist) [![Languages](https://img.shields.io/github/languages/top/wsvaio/pinia-plugin-persist)](https://www.npmjs.com/package/@wsvaio/pinia-plugin-persist) [![License](https://img.shields.io/npm/l/@wsvaio/pinia-plugin-persist)](https://www.npmjs.com/package/@wsvaio/pinia-plugin-persist) [![Star](https://img.shields.io/github/stars/wsvaio/pinia-plugin-persist)](https://github.com/wsvaio/pinia-plugin-persist) [![Download](https://img.shields.io/npm/dm/@wsvaio/pinia-plugin-persist)](https://www.npmjs.com/package/@wsvaio/pinia-plugin-persist)

</center>

## 快速使用

```typescript
import { createPinia } from "pinia";
import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPluginPersist());
```

```typescript
defineStore("xxx", {
  ...
  persist: true,
  ...
});

```

## 配置

### 全局与局部配置

在 pinia 注册插件时只有 key、getter、setter 的配置
在每个 defineStore 中的配置有 key、getter、setter、incldue、exclude 配置，或是一个布尔值，用于快速启用

**_全局配置会作为局部配置的默认值_**
**_局部配置可以是一个布尔值、一个对象，也可以为一个数组！_**

### key

定义持久化的 key 名，需要确保唯一性
默认为 publicKey + & + store.$id + & + index

### getter & setter

定义如何获取和设置持久化，默认设置至 localStorage
可以通过 this 访问 store 实例

```typescript
setter(key, value) {
  console.log(this); // 访问store
  localStorage.setItem(key, JSON.stringify(value));
},
getter(key) {
  return JSON.parse(String(localStorage.getItem(key)))
}
```

### include & exclude

定义要持久化的属性名，include 包含、exclude 排除，优先级：exclude > include
默认 include 包含所有，exclude 为空

```typescript
includes: ['a', 'b', 'c.a', 'c.b'],
excludes: ['a', 'b', 'c.a', 'c.b'],
```

## UNIAPP

通过设置全局的 getter 和 setter，可以兼容微信小程序

```typescript
piniaPluginPersist({
  setter(key, value) {
    uni.setStorageSync(key, value);
  },
  getter(key) {
    return uni.getStorageSync(key);
  },
});
```
