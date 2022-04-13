import { getValidGrassSurfaceElement } from "./helper";

function setGrassLengthGA(
    isExecuting: boolean,
    args: { tiles: Array<CoordsXY>; length: number }
) {
    if (isExecuting) {
        // console.log(args);
        for (const i in args.tiles) {
            var tile = map.getTile(args.tiles[i].x, args.tiles[i].y);
            if (!tile) {
                console.log(
                    "Received invalid tile: x=" +
                        args.tiles[i].x +
                        ", y=" +
                        args.tiles[i].y
                );
                continue;
            }
            var surfaceElement = getValidGrassSurfaceElement(tile);
            if (surfaceElement && surfaceElement.grassLength != args.length) {
                surfaceElement.grassLength = args.length;
            }
        }
    }
    return {
        error: 0,
    } as GameActionResult;
}

function registerActions() {
    context.registerAction(
        "automow-set-grass-length",
        function (args: { tiles: Array<CoordsXY>; length: number }) {
            return setGrassLengthGA(false, args);
        },
        function (args: { tiles: Array<CoordsXY>; length: number }) {
            return setGrassLengthGA(true, args);
        }
    );
}

export default registerActions;
