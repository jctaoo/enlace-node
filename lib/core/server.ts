import {
  Adaptor,
  AdaptorConfig
} from "./adaptor/";
import {
  EndpointWithConfigure
} from "./endpoint";
import { Constructor, Util } from "../util/";
import {
  MiddleWareWithConfigure,
  Middleware,
} from "./middleware";
import { GenericEndpointInput } from "./endpoint/";
import { Client } from "../client";
import { Router } from "./router";
import ObservableMap from "../util/observable_map";
import { Injector } from "./injector/";

export class EnlaceServer {

  #isStarted: boolean = false;
  public get isStarted(): boolean {
    return this.#isStarted;
  }

  public start() {
    this.#isStarted = true;
    for (const [adaptor, configure] of this.adaptorsToConfigure) {
      adaptor.attachOnServer(this, configure);
    }
  }

  /**
   * A map table store the relationship between adaptors and thier own configure.
   */
  public readonly adaptorsToConfigure: ObservableMap<Adaptor, AdaptorConfig> = new ObservableMap();

  /**
   * Router instance contained in the EnlaceServer.
   */
  public readonly router: Router = new Router(this);

  /**
   * A list value indicates all the adaptors in the EnlaceServer.
   */
  protected get adaptors(): Adaptor[] {
    return [...this.adaptorsToConfigure.keys()];
  }

  /**
   * Register the given adaptor and it's own configure in the EnlaceServer.
   * 
   * @param adaptor The adaptor to register.
   * @param configure The configure of the adaptor to register.
   */
  public addAdaptorWithConfigure(adaptor: Constructor<Adaptor>, configure: AdaptorConfig): Adaptor {
    // register adaptor on injector
    Injector.shard.register(adaptor);
    const instance = Injector.shard.resolve(adaptor);
    // add adaptor on server
    if (this.#isStarted) {
      instance.attachOnServer(this, configure);
    }
    instance.didReceiveContent = (content, client) => {
      this.receiveContent(instance, content, client).then();
    };
    this.adaptorsToConfigure.set(instance, configure);

    return instance
  }

  /**
   * The callback function called by self when notified by a registered 
   * adapter. @see Adaptor.didReceiveContent
   * 
   * @param adaptor The adapter that notified the EnlaceServer.
   * @param input The package of the message from the client in the network 
   *              request provided by the given adaptor.
   * @param client Used to mark unique network requests. Provided by the given
   *               adaptor.
   */
  protected async receiveContent(adaptor: Adaptor, input: GenericEndpointInput, client: Client): Promise<void> {
    const path = input.path;
    const middleWaresWithConfigure = this.getMiddlewaresWithPathAndAdaptor(path, adaptor);
    const endpointWithConfigure = this.getEndpointWithPathAndAdaptor(path, adaptor);

    this.executeMiddleWaresWithInput(middleWaresWithConfigure.map(mw => mw.middleWare), input);
    if (endpointWithConfigure) {
      const result = await this.executeEndpointWithConfigure(endpointWithConfigure, path, input);
      if (result) {
        adaptor.sendToClient(client, result);
      } else {
        // todo 404
      }
    } else {
      // todo no matched endpoint
    }
  }

  /**
   * Find all the suitable middleware in the EnlaceServer and given adaptor.
   * 
   * @param path the actual-path
   * @param adaptor The adaptor to find middleware in it.
   */
  protected getMiddlewaresWithPathAndAdaptor(path: string, adaptor: Adaptor): MiddleWareWithConfigure[] {
    return [
      ...this.router.matchMiddleWareWithPath(path),
      ...adaptor.router.matchMiddleWareWithPath(path),
    ];
  }

  /**
   * Find all the suitable endpoints in the EnlaceServer and given adaptor.
   * 
   * @param path the actual-path
   * @param adaptor The adaptor to find endpoints in it. 
   */
  protected getEndpointWithPathAndAdaptor(path: string, adaptor: Adaptor): EndpointWithConfigure | null {
    let endpointWithConfigure: EndpointWithConfigure | null;
    // match in EnalceServer
    const endpointWithConfigureInRoot = this.router.matchEndpointWithPath(path);
    if (endpointWithConfigureInRoot && endpointWithConfigureInRoot.configure.selectAdaptor(adaptor)) {
      endpointWithConfigure = endpointWithConfigureInRoot;
    } else {
      // match in given adaptor
      const endpointWithConfigureInAdaptor = adaptor.router.matchEndpointWithPath(path);
      endpointWithConfigure = endpointWithConfigureInAdaptor;
    }
    return endpointWithConfigure;
  }

  /**
   * Execute the given endpoint and return it's result. If the result of 
   * given endpoint's execution is a Promise, this method will unwrap it.
   * 
   * @param endpointWithConfigure The endpoint to execute and it's own configure.
   * @param path the actual-path
   * @param input The package of the message from the client in the network request.
   *              Will be passed into the given endpoint.
   * @returns The result of given endpoint's execution.
   */
  protected async executeEndpointWithConfigure(endpointWithConfigure: EndpointWithConfigure, path: string, input: GenericEndpointInput): Promise<any> {
    const pathParameters = Util.parsePath(path, endpointWithConfigure.configure.expectedPath);
    input.pathParameters = pathParameters;
    let result = endpointWithConfigure.endpoint.receive(input);
    if (result instanceof Promise) {
      result = await result;
    }
    return result;
  }

  /**
   * Use recursion to execute all the given middleware in turn.
   * 
   * @param middleware The list value indicates all the middleware to execute.
   * @param input The package of the message from the client in the network request. Will be 
   *              passed into each given middleware.
   */
  protected executeMiddleWaresWithInput(middleware: Middleware[], input: GenericEndpointInput) {
    if (middleware.length > 0) {
      const first = middleware[0];
      first(input, () => {
        this.executeMiddleWaresWithInput(middleware.splice(1), input);
      });
    }
  }

}
