# @wsvaio/pinia-plugin-persist

pinia 持久化辅助插件

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

全局配置会作为局部配置的默认值

**_全局的 key 配置，为了保持唯一性，会在结尾追加对应 store 的$id 值_**  
**_局部的 key 配置，写了什么就是什么，所以要注意保持唯一性_**

### key

定义持久化的 key 名

### getter & setter

定义如何获取和设置持久化，默认设置至 localStorage

```typescript
setter(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
},
getter(key) {
  return JSON.parse(String(localStorage.getItem(key)))
}
```

### include & exclude

定义要持久化的属性名，include 包含、exclude 排除，优先级：exclude > include  
默认 include 包含所有，exclude 为空

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
