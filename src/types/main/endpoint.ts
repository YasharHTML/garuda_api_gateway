import { Method } from "../constants/methods";
import { RequestType } from "../constants/request_type";
import { Handler, Middleware } from "./handlers";

export type Endpoint =
    | {
          type: RequestType.REDIRECT;
          url: string;
          middlewares?: Middleware[];
      }
    | {
          type: RequestType.HANDLE;
          method: Method;
          handler: Handler;
          middlewares?: Middleware[]
      };
