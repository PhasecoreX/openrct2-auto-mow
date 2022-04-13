/// <reference path="../lib/openrct2.d.ts" />

import {
    author,
    displayName as name,
    license as licence,
    version,
} from "../package.json";
import registerActions from "./action";
import registerMenuItems from "./menu";
import registerSubscriptions from "./subscription";

function main() {
    registerActions();
    registerSubscriptions();
    registerMenuItems();
}

registerPlugin({
    name,
    version,
    authors: [author],
    type: "remote",
    licence,
    main,
});
