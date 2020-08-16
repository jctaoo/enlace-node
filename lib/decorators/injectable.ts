import { getParams, typeInfo } from "../core/";

export const injectable: ClassDecorator = (target) => {
  getParams(target);
}

