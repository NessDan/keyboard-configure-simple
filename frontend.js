import angles from "./constants/angles.js";
import {
  LStick,
  RStick,
  Button,
  DPad,
  actionOrders,
  actionSortOrder,
  keyEventCodeToC,
} from "./constants/enums.js";
import { SavedMappings } from "./components/SavedMappings.js";
import { testing } from "./index.js";

const buildConfigEl = document.getElementById("build-config");
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
const orderBtn1El = document.getElementById("order-1");
const orderBtn2El = document.getElementById("order-2");
const orderBtn3El = document.getElementById("order-3");
const orderBtnEls = [orderBtn1El, orderBtn2El, orderBtn3El];
const savedMappingsLStickEl = document.getElementById("saved-mappings-lstick");
const savedMappingsRStickEl = document.getElementById("saved-mappings-rstick");
const savedMappingsButtonEl = document.getElementById("saved-mappings-button");
const savedMappingsDPadEl = document.getElementById("saved-mappings-dpad");
const savedMappingsEls = [
  savedMappingsLStickEl,
  savedMappingsRStickEl,
  savedMappingsButtonEl,
  savedMappingsDPadEl,
];

// Output Elements
const addMappingEl = document.getElementById("add-mapping");
const actionTypeEl = document.getElementById("action-type-select");
const angleSelectEl = document.getElementById("angle-select");
const stickDistanceEl = document.getElementById("stick-distance");
const angleSelectWrapperEl = document.getElementById("angle-select-wrapper");
const buttonSelectEl = document.getElementById("button-select");

// Globals
let activeActionType = LStick;
let selectedAngle = 0;
let stickDistance = 100;
let selectedButton = "Y";
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

  // Don't allow duplicates into keysDown (e.g. someone holds "W", then keeps tapping "D")
  // Don't allow more than 4 keys to be held down
  if (!keysDown.includes(evt.code) && keysDown.length < 4) {
    keysDown.push(evt.code);

    keysDownToElements();
    hideUnsetKeyGroups();
  }
});

document.addEventListener("keyup", (evt) => {
  evt.preventDefault();
  if (numKeysDown > 0) numKeysDown--;

  keysDownToElements();
  hideUnsetKeyGroups();
});

addMappingEl.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (keysDown.length === 0) {
    return; // Nothing to do here.
  }

  // Format for W ⇿ A ⇾ Q = [["W", "A"], ["Q"]] (Nested array is an "any order" grouping.)
  let groupCounter = 0;
  let keyInGroupCounter = 0;
  const keyGroups = [[]];

  keysDown.forEach((keyDown, keyIdx) => {
    // Always add in the first key
    keyGroups[groupCounter][keyInGroupCounter] = keyDown;
    keyInGroupCounter++;

    // If we're dealing with a key that has a corresponding orderButton (last key doesn't have one)
    if (keyIdx < orderBtnEls.length) {
      // Check the corresponding order button's text to see whether we start a new array in keysDown or keep adding
      // to the existing one
      if (orderBtnEls[keyIdx].innerText === "⇾") {
        groupCounter++;
        keyInGroupCounter = 0;
        keyGroups[groupCounter] = []; // Gotta initialize that new array
      }
    }
  });

  const mappingToPush = {
    keys: keyGroups,
    action: {
      type: activeActionType,
    },
  };

  switch (activeActionType) {
    case LStick:
    case RStick:
      mappingToPush.action.angle = selectedAngle;
      mappingToPush.action.stickDistance = stickDistance;
      break;
    case Button:
      mappingToPush.action.button = selectedButton;
      break;
  }

  mappings.push(mappingToPush);

  console.log(mappings);
  document.body.focus(); // Prevent the "Add Mappings" button from being accidentally clicked again, e.g. someone hits "Space"

  // Clear the keys so they don't accidentally re-add their mapping
  keysDown = [];
  keysDownToElements();
  hideUnsetKeyGroups();
  renderMappingsOnPage();
});

// Have to set this to window so the SavedMapping component can call to it
// https://medium.com/codex/global-variables-and-javascript-modules-ce674a869164
window.deleteMapping = (ele) => {
  const idxToDelete = Number(ele.getAttribute("data-mappingidx"));
  mappings = mappings.filter((mapping, idx) => idx !== idxToDelete);

  renderMappingsOnPage();
};

const keysDownToElements = () => {
  keysDown.forEach((key, idx) => {
    if (idx >= keyTextEls.length) return;

    const keyHumanFriendlyName = keyEventCodeToC[key];
    keyTextEls[idx].textContent = keyHumanFriendlyName;
  });

  // TODO: Hide extra elements after setting text.
};

const renderMappingsOnPage = () => {
  mappings.sort((a, b) => {
    if (a.keys.flat().length < b.keys.flat().length) {
      return -1;
    }
  });

  mappings.sort((a, b) => {
    if (actionSortOrder[a.action.type] < actionSortOrder[b.action.type]) {
      return -1;
    }
  });

  savedMappingsEls.forEach((savedMappingsEl, idx) => {
    // Clear out the DOM
    savedMappingsEl.innerHTML = "";

    let htmlToSet = "";

    const mappingsForSection = mappings.filter(
      (mapping) => mapping.action.type === actionOrders[idx]
    );

    // Loop over mappings
    mappingsForSection.forEach((mapping) => {
      // Need to use the index in the full mapping array, not just this filtered set.
      const mappingTrueIdx = mappings.findIndex(
        (originalMapping) => originalMapping === mapping
      );
      htmlToSet += SavedMappings(mappingTrueIdx, mapping);
    });

    savedMappingsEl.insertAdjacentHTML("beforeend", htmlToSet);
  });
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

hideUnsetKeyGroups();

orderBtnEls.forEach((orderBtnEl) => {
  orderBtnEl.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (orderBtnEl.textContent === "⇾") {
      orderBtnEl.textContent = "⇿";
    } else {
      orderBtnEl.textContent = "⇾";
    }
  });
});

const watchActionInputs = () => {
  const showRelevantActionInputs = () => {
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
  };

  actionTypeEl.addEventListener("change", showRelevantActionInputs);

  showRelevantActionInputs();
};

angleSelectEl.addEventListener("change", (evt) => {
  selectedAngle = angleSelectEl.value;
});

stickDistanceEl.addEventListener("change", (evt) => {
  stickDistance = stickDistanceEl.value;
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

buildConfigEl.addEventListener("click", (evt) => {
  // Only one profile for now
  testing([
    {
      version: "1.0.0",
      configs: mappings,
    },
  ]);
});

watchActionInputs();
