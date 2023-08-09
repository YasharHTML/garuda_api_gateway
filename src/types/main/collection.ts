import { Middleware } from "./handlers";
import { Route } from "./route";

export interface Collection {
    routes: Route[];
    middlewares?: Middleware[];
}
