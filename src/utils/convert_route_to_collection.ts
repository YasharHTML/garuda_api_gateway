import { Collection } from "../types/main/collection";
import { Middleware } from "../types/main/handlers";
import { Route } from "../types/main/route";

export function convertRouteToCollection(
    route: Route,
    middlewares?: Middleware[]
): Collection {
    return { routes: [route], middlewares };
}
