import {
  actionsToStrings,
  LStick,
  RStick,
  Button,
  DPad,
  DPadMappings,
} from "../shared/constants/enums.js";
import { keyEventCodeToC } from "../shared/constants/enums.js";

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
      actionOutputValue = `🕹️ ${mapping.action.angle}&deg; 

      <div class="angle-circle-container">
        <div class="angle-circle">
          <div class="vert-line"></div>
          <div class="hori-line"></div>
          <div class="active-line" style="--angle:${mapping.action.angle}deg;"></div>
        </div>
      </div> @ ${mapping.action.stickDistance}%`;
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
      ${keyString} = ${actionOutputValue}
      <input class="delete-mapping" type="button" value="❌" data-mappingidx="${idx}" onClick="window.deleteMapping(this)" />
    </div>
  `;
};
