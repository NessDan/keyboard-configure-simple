import {
  actionsToStrings,
  LStick,
  RStick,
  Button,
  DPad,
  DPadMappings,
} from "../constants/enums.js";
import { keyEventCodeToC } from "../constants/enums.js";

export const SavedMappings = (idx, mapping) => {
  const flattenedKeys = mapping.keys.map((keyGroup) => {
    const keyGroupHumanFriendly = keyGroup.map((group) => {
      return keyEventCodeToC[group];
    });
    return keyGroupHumanFriendly.join(" ⇿ ");
  });
  const stringifiedKeys = flattenedKeys.join(" ⇾ ");
  const keyString = `${stringifiedKeys}`;
  let actionOutputValue = "";

  switch (mapping.action.type) {
    case LStick:
    case RStick:
      actionOutputValue = `🕹️ ${mapping.action.angle}&deg; @ ${mapping.action.stickDistance}%`;
      break;
    case Button:
      actionOutputValue = `🔘 ${mapping.action.button}`;
      break;
    case DPad:
      actionOutputValue = `${DPadMappings[mapping.action.dpad]}`;
      break;
  }

  return `
    <div class="saved-mapping" id="mapping-${idx}">
      ${keyString} = ${
    actionsToStrings[mapping.action.type]
  } ${actionOutputValue}
      <input class="delete-mapping" type="button" value="❌" data-mappingidx="${idx}" onClick="window.deleteMapping(this)" />
    </div>
  `;
};
