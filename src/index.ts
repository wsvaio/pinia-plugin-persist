import type { PiniaPlugin, StateTree } from "pinia";
import { pick } from "@wsvaio/utils";
export interface PersistOption<S extends StateTree = StateTree> {
  key?: string;
  includes?: string[];
  excludes?: string[];
  setter?: (key: string, value: Partial<S>, store: S) => void;
  getter?: (key: string, store: S) => S | undefined | null | "";
}

declare module "pinia" {
  interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: PersistOption<S>[] | PersistOption<S> | boolean;
  }
}

export default (
  {
    key: KEY = "",
    setter: SETTER = (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getter: GETTER = key => JSON.parse(String(localStorage.getItem(key))),
  } = {} as Pick<PersistOption, "key" | "setter" | "getter">,
): PiniaPlugin =>
  ({ options: { persist }, store }) => {
    if (!persist) return;
    if (persist === true) persist = {};
    if (!Array.isArray(persist)) persist = [persist];
    persist.forEach(
      ({
        key = `${KEY}${store.$id}`,
        includes = Object.keys(store.$state),
        excludes = [],
        setter = SETTER,
        getter = GETTER,
      }) => {
        const paths = includes.filter(item => !excludes.includes(item));
        const persisted = getter(key, store);
        persisted
          ? store.$patch(pick(persisted, paths), store)
          : setter(key, pick(store.$state, paths), store);
        store.$subscribe(() => setter(key, pick(store.$state, paths), store));
      },
    );
  };
