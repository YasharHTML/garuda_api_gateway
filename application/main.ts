import { createGarudaApplication } from "../src/app/create_garuda_application";
import { RequestType } from "../src/types/constants/request_type";
import { Collection } from "../src/types/main/collection";
import { Route } from "../src/types/main/route";
import { convertRouteToCollection } from "../src/utils/convert_route_to_collection";

const collection1: Collection = {
    routes: [
        {
            path: "/",
            endpoint: {
                type: RequestType.HANDLE,
                method: "GET",
                handler: (req, res) => res.send("Hello World"),
            },
        },
    ],
};

const collection2: Collection = {
    routes: [
        {
            path: "/user/:id",
            endpoint: {
                type: RequestType.HANDLE,
                method: "GET",
                handler: (req, res) => res.json({ user: req.params.id }),
            },
        },
    ],
};

const app1 = createGarudaApplication({ collection: collection1 });
const app2 = createGarudaApplication({
    express: app1,
    collection: collection2,
});

const route: Route = {
    endpoint: {
        type: RequestType.HANDLE,
        method: "GET",
        handler: (req, res) => res.json({ user: "Cristiano Ronaldo" }),
        middlewares: [
            (req, res, next) => {
                if (Math.random() > 0.5) return next();
                else res.status(500).json({ message: "You are unlucky" });
            },
        ],
    },
    path: "/",
};

const collection3 = convertRouteToCollection(route);

const app3 = createGarudaApplication({ collection: collection3 });

const collection4 = convertRouteToCollection({
    path: "/",
    endpoint: { type: RequestType.REDIRECT, url: "https://www.google.com/" },
});

const app4 = createGarudaApplication({ collection: collection4 });

app1.listen(3000);
app2.listen(3001);
app3.listen(3002);
app4.listen(3003);
