import { name as id } from "../package.json";
import { GrassLengths } from "./enum";

const configPrefix = id + ".";

const mowEnabled = configPrefix + "mowEnabled";
const mowType = configPrefix + "mowType";

export const optionsMowType = [
    {
        label: "Clear",
        value: GrassLengths.CLEAR_0,
    },
    {
        label: "Mowed",
        value: GrassLengths.MOWED,
    },
];

const defaults = {
    mowEnabled: true,
    mowType: optionsMowType[0].value,
};

const config = {
    get mowEnabled() {
        return context.sharedStorage.get(mowEnabled, defaults.mowEnabled);
    },
    set mowEnabled(v) {
        context.sharedStorage.set(mowEnabled, v);
    },
    get mowType() {
        return context.sharedStorage.get(mowType, defaults.mowType);
    },
    set mowType(v) {
        context.sharedStorage.set(mowType, v);
    },
};

export default config;
