import type { StateTree, Store } from "pinia";
export interface PersistOption<S extends StateTree = StateTree, SS = Store> {
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

// export type ValueOf<T> = T[keyof T];
// export type DeepKeys<T extends object> = ValueOf<{
//   [K in keyof T]: T[K] extends object ? `${K}.${DeepKeys<T[K]>}` | K : K
// }>;
