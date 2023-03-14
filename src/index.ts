import { PiniaPluginContext, StateTree } from "pinia";
import { pick } from "@wsvaio/utils";
export type PersistOption<S extends StateTree = StateTree> = {
  key?: string;
  includes?: string[];
  excludes?: string[];
  setter?: (key: string, paths: string[], state: S) => void;
  getter?: (key: string) => S | undefined | null | "";
};

declare module "pinia" {
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOption<S>[] | PersistOption<S>;
  }
}

export default (
    {
      key: KEY = "",
      setter: SETTER = (key, paths, state) =>
        localStorage.setItem(key, JSON.stringify(pick(state, paths))),
      getter: GETTER = key => JSON.parse(localStorage.getItem(key) || ""),
    } = {} as Pick<PersistOption, "key" | "setter" | "getter">
  ) =>
  ({ options: { persist }, store }: PiniaPluginContext) => {
    if (!persist) return;
    Array.isArray(persist) || (persist = [persist]);
    persist.forEach(
      ({
        key = `${KEY}${store.$id}`,
        includes = Object.keys(store.$state),
        excludes = [],
        setter = SETTER,
        getter = GETTER,
      }) => {
        const paths = includes.filter(item => !excludes.includes(item));
        const persisted = getter(key);
        persisted ? store.$patch(pick(persisted, paths)) : setter(key, paths, store.$state);      
        store.$subscribe(() => setter(key, paths, store.$state));
      }
    );
  };
