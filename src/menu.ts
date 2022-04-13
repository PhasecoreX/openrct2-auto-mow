import { displayName, name as windowTag } from "../package.json";
import config, { optionsMowType } from "./config";
import { subscribeToAutoMow } from "./subscription";

function showWindow(): void {
    const window = ui.getWindow(windowTag);
    if (window) {
        window.bringToFront();
        return;
    }

    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 160,
        height: 50,
        title: displayName,
        widgets: [
            makeAutoMowEnabledCheckbox(20),
            makeAutoMowTypeLabel(35),
            makeAutoMowTypeDropdown(35),
        ],
    };
    ui.openWindow(windowDesc);
}

function makeCheckbox(
    y: number,
    tooltip: string,
    text: string,
    isChecked: boolean,
    onChange: (isChecked: boolean) => void
): CheckboxWidget {
    return {
        type: "checkbox",
        x: 5,
        y,
        width: 160,
        height: 10,
        tooltip,
        text,
        isChecked,
        onChange,
    };
}

function makeAutoMowEnabledCheckbox(y: number): CheckboxWidget {
    return makeCheckbox(
        y,
        "Automatically mow the grass",
        "AutoMow",
        config.mowEnabled,
        (isChecked: boolean) => {
            subscribeToAutoMow(isChecked);
        }
    );
}

function makeAutoMowTypeLabel(y: number): LabelWidget {
    return {
        type: "label",
        x: 5,
        y,
        width: 160,
        height: 10,
        tooltip: "The type of grass you would like to have",
        text: "Grass type:",
        onChange: () => {},
    };
}

function makeAutoMowTypeDropdown(y: number): DropdownWidget {
    return {
        type: "dropdown",
        x: 80,
        y,
        width: 75,
        height: 13,
        items: optionsMowType.map(function (index) {
            return index.label;
        }),
        selectedIndex: optionsMowType
            .map(function (index) {
                return index.value;
            })
            .indexOf(config.mowType),
        onChange: (index: number) => {
            config.mowType = optionsMowType[index].value;
        },
    };
}

function registerMenuItems() {
    // Only the server (and single player) can see this
    if (network.mode !== "client") {
        if (typeof ui !== "undefined") {
            ui.registerMenuItem(displayName, function () {
                showWindow();
            });
        }
    }
}

export default registerMenuItems;
