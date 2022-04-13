import { GrassLengths } from "./enum";

export function getValidGrassSurfaceElement(tile: Tile) {
    for (var i = 0; i < tile.numElements; i++) {
        var element = tile.getElement(i);
        if (element && element.type === "surface") {
            var surfaceElement = <SurfaceElement>element;
            if (
                surfaceElement.hasOwnership &&
                surfaceElement.waterHeight <= surfaceElement.baseZ && // Not underwater
                surfaceElement.grassLength != GrassLengths.CLEAR_0 // Structure/path isn't on it
            ) {
                return surfaceElement;
            }
        }
    }
    return null;
}
