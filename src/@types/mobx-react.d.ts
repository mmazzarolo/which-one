/// <reference types="node" />
import { Omit } from "typelevel-ts";

declare module "mobx-react" {
  export function inject<D extends object>(
    mapStoresToProps: (stores: any) => D
  ): <A extends D>(
    component: React.ComponentType<A>
  ) => React.ComponentType<Omit<A, keyof D> & Partial<D>>;
}
