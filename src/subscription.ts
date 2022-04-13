import config from "./config";
import { GrassLengths } from "./enum";
import { getValidGrassSurfaceElement } from "./helper";

const ticks_per_month = 16384;
const ticks_per_grass_stage = ticks_per_month * 2; // It's a little over 2 months I think

var autoMowSubscription: IDisposable | null = null;
var current_x = 1;
var current_y = 0; // 1 is added to this when the process starts

function getNextTile() {
    current_y++;
    if (current_y > map.size.y - 2) {
        current_y = 1;
        current_x++;
        if (current_x > map.size.x - 2) {
            current_x = 1;
        }
    }
    return map.getTile(current_x, current_y);
}

function autoMow() {
    var tilesToUpdate = Array();
    var at_a_time = Math.ceil(
        ((map.size.x - 2) * (map.size.y - 2)) / ticks_per_grass_stage
    );
    // console.log("Tick!");
    for (var i = 0; i < at_a_time; i++) {
        var tile = getNextTile();
        // console.log("Checking tile x=" + tile.x + ", y=" + tile.y);
        var surfaceElement = getValidGrassSurfaceElement(tile);
        if (surfaceElement && surfaceElement.grassLength != config.mowType) {
            switch (config.mowType & 7) {
                // Only update to clear 0/1 if we aren't already clear 0/1
                case GrassLengths.CLEAR_0:
                case GrassLengths.CLEAR_1:
                    var grassStage = surfaceElement.grassLength & 7;
                    if (
                        grassStage != GrassLengths.CLEAR_0 &&
                        grassStage != GrassLengths.CLEAR_1
                    ) {
                        tilesToUpdate.push({
                            x: tile.x,
                            y: tile.y,
                        } as CoordsXY);
                    }
                    break;
                // Only update to clump if we aren't already clump
                case GrassLengths.CLUMP_0:
                case GrassLengths.CLUMP_1:
                case GrassLengths.CLUMP_2:
                    var grassStage = surfaceElement.grassLength & 7;
                    if (
                        grassStage != GrassLengths.CLUMP_0 &&
                        grassStage != GrassLengths.CLUMP_1 &&
                        grassStage != GrassLengths.CLUMP_2
                    ) {
                        tilesToUpdate.push({
                            x: tile.x,
                            y: tile.y,
                        } as CoordsXY);
                    }
                    break;
                // Mowed and clear 2 always get updated
                default:
                    tilesToUpdate.push({ x: tile.x, y: tile.y } as CoordsXY);
                    break;
            }
        }
    }
    if (tilesToUpdate.length > 0) {
        context.executeAction(
            "automow-set-grass-length",
            {
                tiles: tilesToUpdate,
                length: config.mowType,
            },
            function () {}
        );
    }
}

export function subscribeToAutoMow(enabled: boolean) {
    config.mowEnabled = enabled;
    if (enabled) {
        autoMowSubscription = context.subscribe("interval.tick", function () {
            autoMow();
        });
    } else {
        if (autoMowSubscription) {
            autoMowSubscription.dispose();
        }
    }
}

function registerSubscriptions() {
    // Only the server (and single player) can run these
    if (network.mode !== "client") {
        subscribeToAutoMow(config.mowEnabled);
    }
}

export default registerSubscriptions;
