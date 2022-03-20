import angles from "./angles.js";

const key1TextEl = document.getElementById("key-1-text");
const key2TextEl = document.getElementById("key-2-text");
const key3TextEl = document.getElementById("key-3-text");
const key4TextEl = document.getElementById("key-4-text");
const keyTextEls = [key1TextEl, key2TextEl, key3TextEl, key4TextEl];
const key1GroupEl = document.getElementById("key-1-group");
const key2GroupEl = document.getElementById("key-2-group");
const key3GroupEl = document.getElementById("key-3-group");
const key4GroupEl = document.getElementById("key-4-group");
const keyGroupEls = [key1GroupEl, key2GroupEl, key3GroupEl, key4GroupEl];
const orderBtnEl = document.getElementById("order-1");

// Output Elements
const addMappingEl = document.getElementById("add-mapping");
const actionTypeEl = document.getElementById("action-type-select");
const angleSelectEl = document.getElementById("angle-select");
const angleSelectWrapperEl = document.getElementById("angle-select-wrapper");
const buttonSelectEl = document.getElementById("button-select");

// ENUMS
const LStick = "lstick";
const RStick = "rstick";
const Button = "button";
const DPad = "dpad";
const BtnY = "Y";
const BtnB = "B";
const BtnA = "A";
const BtnX = "X";
const BtnL = "L";
const BtnR = "R";
const BtnZL = "ZL";
const BtnZR = "ZR";
const BtnMinus = "MINUS";
const BtnPlus = "PLUS";
const BtnHome = "HOME";
const BtnCapture = "CAPTURE";
const BtnLClick = "LCLICK";
const BtnRClick = "RCLICK";

// Globals
let activeActionType = LStick;
let selectedAngle = 0;
let selectedButton = "Y";

orderBtnEl.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (orderBtnEl.textContent === "⇾") {
    orderBtnEl.textContent = "⇿";
  } else {
    orderBtnEl.textContent = "⇾";
  }
});

let numKeysDown = 0;
let keysDown = [];
let mappings = [];

document.addEventListener("keydown", (evt) => {
  // If someone is holding the key down, we don't want to reprocess.
  if (evt.repeat) return;
  evt.preventDefault();

  if (numKeysDown === 0) {
    keysDown = [];
  }

  numKeysDown++;

  console.log(evt.code);

  keysDown.push(evt.code);

  keysDownToElements();
  hideUnsetKeyGroups();
});

document.addEventListener("keyup", (evt) => {
  evt.preventDefault();
  if (numKeysDown > 0) numKeysDown--;

  keysDownToElements();
  hideUnsetKeyGroups();
});

addMappingEl.addEventListener("click", (evt) => {
  evt.preventDefault();

  const mappingToPush = {
    keys: [keysDown],
    action: {
      type: activeActionType,
    },
  };

  switch (activeActionType) {
    case LStick:
    case RStick:
      mappingToPush.x = angles[selectedAngle]?.x;
      mappingToPush.y = angles[selectedAngle]?.y;
      break;
    case Button:
      mappingToPush.button = selectedButton;
      break;
  }

  mappings.push(mappingToPush);

  console.log(mappings);
  document.body.focus();
});

const keysDownToElements = () => {
  keysDown.forEach((key, idx) => {
    if (idx >= keyTextEls.length) return;

    const keyName = key.replace("Key", "");
    keyTextEls[idx].textContent = keyName;
  });

  // TODO: Hide extra elements after setting text.
};

const hideUnsetKeyGroups = () => {
  keyGroupEls.forEach((keyGroup, idx) => {
    if (idx < keysDown.length) {
      keyGroup.classList.remove("hidden");
    } else {
      keyGroup.classList.add("hidden");
    }
  });
};

actionTypeEl.addEventListener("change", (evt) => {
  activeActionType = actionTypeEl.value;

  switch (activeActionType) {
    case LStick:
    case RStick:
      angleSelectWrapperEl.classList.remove("hidden");
      buttonSelectEl.classList.add("hidden");
      break;
    case Button:
      buttonSelectEl.classList.remove("hidden");
      angleSelectWrapperEl.classList.add("hidden");
      break;
  }
});

angleSelectEl.addEventListener("change", (evt) => {
  selectedAngle = angleSelectEl.value;
});

buttonSelectEl.addEventListener("change", (evt) => {
  selectedButton = buttonSelectEl.value;
});

const stopDefaultAndPropogation = (evt) => {
  evt.stopPropagation();
};

document.querySelectorAll("input, select, option").forEach((inputEl) => {
  inputEl.addEventListener("keydown", stopDefaultAndPropogation);
  inputEl.addEventListener("keyup", stopDefaultAndPropogation);
});
