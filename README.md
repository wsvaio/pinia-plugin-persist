# @wsvaio/pinia-plugin-persist

pinia 持久化辅助插件

## 快速使用

```typescript
import { createPinia } from "pinia";
import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";

const pinia = createPinia();
pinia.use(piniaPluginPersist());
// or
pinia.use(
  piniaPluginPersist({
    key: "xxx", // like "xxx" + store.$id, global has $id end
    setter(key, paths, state) {
      // content like...
      JSON.stringify(key, pick(state, paths));
    },
    getter(key) {
      // content like...
      return JSON.parse(localStore.getItem(key));
    },
  })
);
```

```typescript
...

defineStore("xxx", {

  ...
  persist: {
    key: "xxx", // global has $id end, overwrite global, just "xxx", no $id end;
    includes: [...],
    excludes: [...],
    // paths = includes.filter(item => !excludes.includes(item));
    setter(key, paths, state) {
      ...
    },
    getter(key) {
      ...
    }
  }

});
...

```

## uniapp

```typescript
import { createPinia } from "pinia";
import piniaPluginPersist from "@wsvaio/pinia-plugin-persist";

const pinia = createPinia();
pinia.use(
  piniaPluginPersist({
    setter(key, paths, state) {
      uni.setStorageSync(key, pick(state, paths));
    },
    getter(key) {
      return uni.getStorageSync(key);
    },
  })
);
```

## pick function
``` typescript
const pick = <T extends Object, K extends keyof T>(obj: T, keys: K[]) => {
  const result = <{ [P in K]: T[P] }>{};
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
};

```
