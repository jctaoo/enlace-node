import { EnlaceServer, Injector } from "../core/";

export const useServer = (): EnlaceServer => {
  return Injector.shard.resolve(EnlaceServer)
}

// todo
// export const Server: ParameterDecorator = () => {
//
// }