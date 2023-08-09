import { Endpoint } from "./endpoint";

export interface Route {
    path: string;
    endpoint: Endpoint;
}
