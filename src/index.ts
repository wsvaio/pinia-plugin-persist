import type { PiniaPlugin } from "pinia";
import { deepPick } from "./deepPick";
import type { PersistOption } from "./types";

export default (
  {
    key: KEY = "pinia",
    setter: SETTER = (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getter: GETTER = key =>
      JSON.parse(String(localStorage.getItem(key))) as PersistOption["getter"],
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
          ? store.$patch(deepPick(persisted, paths))
          : setter.call(store, key, deepPick(store.$state, paths));
      });
    store.$persist = () =>
      persistForEach(({ key, paths, setter }) =>
        setter.call(store, key, deepPick(store.$state, paths)),
      );

    store.$hydrate();
    store.$subscribe(store.$persist);
  };
