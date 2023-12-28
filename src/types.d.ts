// import type { DeepKeys } from "@wsvaio/utils";
import type { StateTree, Store } from "pinia";
import type { DeepKeys } from "@wsvaio/utils";

export interface PersistOption<S extends StateTree = StateTree, SS = Store> {
  /**
   * 存储在本地存储中的键名，默认为 "pinia"
   */
  key?: string;
  /**
   * 需要持久化的状态属性名列表，默认为全部属性
   */
  includes?: DeepKeys<S>[] | string[];
  /**
   * 不需要持久化的状态属性名列表，默认为空
   */
  excludes?: DeepKeys<S>[] | string[];
  /**
   * 存储数据的函数，默认使用 localStorage.setItem
   */
  setter?: (this: SS, key: string, value: Partial<S>) => void;
  /**
   * 读取数据的函数，默认使用 localStorage.getItem
   */
  getter?: (this: SS, key: string) => Partial<S> | undefined | null | "";
}

declare module "pinia" {
  interface DefineStoreOptionsBase<S, Store> {
    /**
     * 持久化选项，可以是一个选项数组，也可以是一个选项对象，也可以是 true（全部持久化）
     */
    persist?: PersistOption<S, Store>[] | PersistOption<S, Store> | boolean;
  }

  interface PiniaCustomProperties {
    /**
     * 从本地存储中读取数据并恢复状态
     */
    $hydrate: () => void;
    /**
     * 将状态持久化到本地存储中
     */
    $persist: () => void;
  }
}
