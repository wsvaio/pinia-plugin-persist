import type { PiniaPlugin, StateTree, Store } from "pinia";
import { pick } from "@wsvaio/utils";
export interface PersistOption<S = StateTree, SS = Store> {
  key?: string;
  includes?: string[];
  excludes?: string[];
  setter?: (this: SS, key: string, value: Partial<S>) => void;
  getter?: (this: SS, key: string) => S | undefined | null | "";
}

declare module "pinia" {
  interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOption<S, Store>[] | PersistOption<S, Store> | boolean;
  }

  interface PiniaCustomProperties {
    $hydrate: () => void;
    $persist: () => void;
  }
}

export default (
  {
    key: KEY = "pinia",
    setter: SETTER = (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getter: GETTER = key => JSON.parse(String(localStorage.getItem(key))) as PersistOption["getter"],
  } = {} as Pick<PersistOption, "key" | "setter" | "getter">,
): PiniaPlugin =>
  ({ options, store }) => {
    const persistForEach = (
      callback: (options: {
        key: string;
        paths: string[];
        setter: PersistOption["setter"];
        getter: PersistOption["getter"];
      }) => void,
    ) => {
      let { persist } = options;
      if (!persist) return;
      if (persist === true) persist = [{}];
      if (!Array.isArray(persist)) persist = [persist];

      persist.forEach(
        (
          {
            key,
            includes = Object.keys(store.$state),
            excludes = [],
            setter = SETTER,
            getter = GETTER,
          },
          index,
        ) => {
          key ||= `${KEY}&${store.$id}&${index}`;
          const paths = includes.filter(item => !excludes.includes(item));
          callback({ key, paths, setter, getter });
        },
      );
    };

    store.$hydrate = () =>
      persistForEach(({ key, paths, getter, setter }) => {
        const persisted = getter.call(store, key);
        persisted
          ? store.$patch(pick(persisted, paths))
          : setter.call(store, key, pick(store.$state, paths));
      });
    store.$persist = () =>
      persistForEach(({ key, paths, setter }) => {
        setter.call(store, key, pick(store.$state, paths));
      });

    store.$hydrate();
    store.$subscribe(store.$persist);
  };
