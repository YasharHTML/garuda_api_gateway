import _express, { Request, Response, Express } from "express";
import { Collection } from "../types/main/collection";
import { RequestType } from "../types/constants/request_type";
import { getMethod } from "../utils/get_method";
import proxy from "express-http-proxy";

export function createGarudaApplication({
    express,
    collection,
}: {
    express?: Express;
    collection: Collection;
}) {
    const app = express || _express();
    const { routes, middlewares } = collection;

    middlewares && app.use(...middlewares);

    routes.forEach((route) => {
        const path = route.path;
        const endpoint = route.endpoint;
        switch (endpoint.type) {
            case RequestType.REDIRECT: {
                endpoint.middlewares
                    ? app.use(
                          path,
                          ...endpoint.middlewares,
                          proxy(endpoint.url)
                      )
                    : app.use(path, proxy(endpoint.url));
                break;
            }
            case RequestType.HANDLE: {
                const method = getMethod(endpoint.method);
                endpoint.middlewares
                    ? (app.route(path) as any)[method](
                          ...endpoint.middlewares,
                          endpoint.handler
                      )
                    : (app.route(path) as any)[method](endpoint.handler);
                break;
            }
        }
    });

    return app;
}
