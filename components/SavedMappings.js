import { actionsToStrings, LStick, RStick, Button, DPad } from "../enums.js";

export const SavedMappings = (idx, mapping) => {
  const flattenedKeys = mapping.keys.map((keyGroup) => {
    return keyGroup.join(" ⇿ ");
  });
  const stringifiedKeys = flattenedKeys.join(" ⇾ ");
  const keyString = `${stringifiedKeys}`;
  let actionOutputValue = "";

  switch (mapping.action.type) {
    case LStick:
    case RStick:
      actionOutputValue = `@ ${mapping.action.x}x ${mapping.action.y}y`;
      break;
    case Button:
      actionOutputValue = `${mapping.action.button}`;
      break;
    case DPad:
      actionOutputValue = `${mapping.action.dpad}`;
      break;
  }

  return `
    <div id="mapping-${idx}">
      ${keyString} = ${
    actionsToStrings[mapping.action.type]
  } ${actionOutputValue}
    </div>
  `;
};
