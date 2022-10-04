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
import { mappingsToBinary } from "./index.js";

const deployConfigEl = document.getElementById("deploy-config");
const deleteConfigEl = document.getElementById("delete-config");
const saveConfigToDiskEl = document.getElementById("save-to-file");
const keyTextEls = [
  document.getElementById("key-1-text"),
  document.getElementById("key-2-text"),
  document.getElementById("key-3-text"),
  document.getElementById("key-4-text"),
];
const keyGroupEls = [
  document.getElementById("key-1-group"),
  document.getElementById("key-2-group"),
  document.getElementById("key-3-group"),
  document.getElementById("key-4-group"),
];
const orderBtnEls = [
  document.getElementById("order-1"),
  document.getElementById("order-2"),
  document.getElementById("order-3"),
];
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
const configSizeEl = document.getElementById("config-size");
const loadConfigFromFileEl = document.getElementById("load-from-file");

// Output Elements
const addMappingEl = document.getElementById("add-mapping");
const actionTypeEl = document.getElementById("action-type-select");
const angleSelectEl = document.getElementById("angle-select");
const stickDistanceEl = document.getElementById("stick-distance");
const angleSelectWrapperEl = document.getElementById("angle-select-wrapper");
const dpadSelectEl = document.getElementById("dpad-direction-select");
const buttonSelectEl = document.getElementById("button-select");

const loadFromLocalStorage = () => {
  try {
    const fullMappingStructureAsString = localStorage.getItem("mappings");
    const fullMappingStructure = fullMappingStructureAsString
      ? JSON.parse(fullMappingStructureAsString)
      : null;

    if (fullMappingStructure) {
      return fullMappingStructure[0].configs;
    }
  } catch (e) {
    console.error("Couldn't load config, error with mapping :(", e);
    alert("Local storage config loading error! Please let NessDan know!");
    return null;
  }
};

const updateAndSaveMappings = (newMappings) => {
  mappings = newMappings;
  saveToLocalStorage(mappingsToFullMappingStructure(mappings));
  renderMappingsOnPage();
};

const mappingsToFullMappingStructure = (mappings) => {
  return [
    {
      version: "1.0.0",
      configs: mappings,
    },
  ];
};

// https://stackoverflow.com/a/34156339/231730
function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

// https://stackoverflow.com/a/26298948/231730
function readSingleFile(evt) {
  var file = evt.target.files[0];
  if (!file) {
    return;
  }

  // https://simon-schraeder.de/posts/filereader-async/
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
}

const checkAndSetMappingsConfigFile = async (evt) => {
  try {
    debugger;
    let contents = await readSingleFile(evt);
    contents = JSON.parse(contents);

    if (contents[0].version === "1.0.0" && contents[0].configs.length > 0) {
      updateAndSaveMappings(contents[0].configs);
    }
  } catch (err) {
    console.error("Couldn't load config, error with mapping :(", err);
    alert("Couldn't load config, error with mapping :( Contact NessDan!");
  }
};

// Globals
let activeActionType = LStick;
let selectedAngle = 0;
let stickDistance = 100;
let selectedButton = "Y";
let selectedDpad = 0;
let numKeysDown = 0;
let keysDown = [];
window.mappings = loadFromLocalStorage() ?? [];

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
    case DPad:
      mappingToPush.action.dpad = Number(selectedDpad);
      break;
  }

  mappings.push(mappingToPush);

  console.log(mappings);
  document.body.focus(); // Prevent the "Add Mappings" button from being accidentally clicked again, e.g. someone hits "Space"

  // Clear the keys so they don't accidentally re-add their mapping
  keysDown = [];
  updateAndSaveMappings(mappings);
  keysDownToElements();
  hideUnsetKeyGroups();
});

// Have to set this to window so the SavedMapping component can call to it
// https://medium.com/codex/global-variables-and-javascript-modules-ce674a869164
window.deleteMapping = (ele) => {
  const idxToDelete = Number(ele.getAttribute("data-mappingidx"));
  const newMappings = mappings.filter((mapping, idx) => idx !== idxToDelete);

  updateAndSaveMappings(newMappings);
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

const saveToLocalStorage = (mappings) => {
  localStorage.setItem("mappings", JSON.stringify(mappings));
};

const deleteFromLocalStorage = (mappings) => {
  localStorage.removeItem("mappings");
};

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
        dpadSelectEl.classList.add("hidden");
        buttonSelectEl.classList.add("hidden");
        break;
      case Button:
        buttonSelectEl.classList.remove("hidden");
        dpadSelectEl.classList.add("hidden");
        angleSelectWrapperEl.classList.add("hidden");
        break;
      case DPad:
        dpadSelectEl.classList.remove("hidden");
        buttonSelectEl.classList.add("hidden");
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

dpadSelectEl.addEventListener("change", (evt) => {
  selectedDpad = dpadSelectEl.value;
});

const stopDefaultAndPropogation = (evt) => {
  evt.stopPropagation();
};

document.querySelectorAll("input, select, option").forEach((inputEl) => {
  inputEl.addEventListener("keydown", stopDefaultAndPropogation);
  inputEl.addEventListener("keyup", stopDefaultAndPropogation);
});

saveConfigToDiskEl.addEventListener("click", (evt) => {
  evt.preventDefault();

  const mappingsToDownload = mappingsToFullMappingStructure(mappings);

  const fileName = prompt("Enter a file name to save the config to:");
  if (fileName) {
    download(
      JSON.stringify(mappingsToDownload),
      fileName + ".keyboardgg.json",
      "application/json"
    );
  } else {
    const date = new Date();
    const fileNameDate =
      [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("-") +
      " " +
      [date.getHours(), date.getMinutes(), date.getSeconds()].join("-");
    download(
      JSON.stringify(mappingsToDownload),
      fileNameDate.toLocaleString() + ".keyboardgg.json",
      "application/json"
    );
  }
});

deleteConfigEl.addEventListener("click", (evt) => {
  const wantsToDelete = confirm(
    "You sure you want to delete the config from your browser storage?"
  );

  wantsToDelete ? deleteFromLocalStorage() : null;

  window.location.reload();
});

deployConfigEl.addEventListener("click", (evt) => {
  // Only one profile for now
  try {
    const sizeOfConfig = mappingsToBinary(
      mappingsToFullMappingStructure(mappings)
    );

    configSizeEl.innerHTML = sizeOfConfig;
  } catch (e) {
    if (
      e.message.includes("buildEdgeguard") &&
      e.message.includes("is not a function")
    ) {
      alert(
        "Sorry, there's a race condition error. Try refreshing the page and rebuilding. Also let NessDan know!"
      );
    } else {
      alert("A new error has occurred, please let NessDan know!");
      alert(e.message);
    }
    console.error(e);
  }
});

loadConfigFromFileEl.addEventListener(
  "change",
  checkAndSetMappingsConfigFile,
  false
);

renderMappingsOnPage(); // In case we loaded some mappings
watchActionInputs();
