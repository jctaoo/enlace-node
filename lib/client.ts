import * as UUID from "uuid";
import * as Http from "http";

Http.createServer()

/**
 * Used to mark a unique network request instead of a unique user
 */
export class Client {

  constructor(
    public readonly ip: string,
    public readonly id: string
  ) {}

  static generate(ip: string): Client {
    const id = UUID.v4();
    return new Client(ip, id);
  }

}