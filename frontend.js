import {
  LStick,
  RStick,
  Button,
  DPad,
  actionOrders,
  actionSortOrder,
  keyEventCodeToC,
} from "./shared/constants/enums.js";
import { SavedMappings } from "./components/SavedMappings.js";
import { saveProfileToJSON } from "./shared/profiles/save.js";
import { mappingsToBinary } from "./shared/hardware/web-to-hardware-config.js";
import { wasd24Profile } from "./profiles/wasd24Profile.js";
import { wasd24QEZCProfile } from "./profiles/wasd24QEZCProfile.js";
import { wasd24SmashProfile } from "./profiles/wasd24SmashProfile.js";
import {
  connectToAdapter,
  getMaxProfileCount,
} from "./shared/hardware/device.js";

const deployProfileButtonEl = document.getElementById("deploy-config");
const deleteConfigEl = document.getElementById("delete-config");
const saveConfigToDiskEl = document.getElementById("save-to-file");
const connectAdapterButtonEl = document.getElementById("connect-adapter");
const profileNumberEl = document.querySelector("#profile-number");
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
const loadButtonEl = document.getElementById("load-button");
const loadOptionsEl = document.getElementById("load-options");
const loadFileEl = document.getElementById("load-file");

// Output Elements
const addMappingEl = document.getElementById("add-mapping");
const actionTypeEl = document.getElementById("action-type-select");
const angleSelectEl = document.getElementById("angle-select");
const stickDistanceEl = document.getElementById("stick-distance");
const angleSelectWrapperEl = document.getElementById("angle-select-wrapper");
const dpadSelectEl = document.getElementById("dpad-direction-select");
const buttonSelectEl = document.getElementById("button-select");
const helperEl = document.getElementById("helper");
const helperAngleEl = document.getElementById("helper-angle");

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

const loadJsonProfile = (profile) => {
  if (profile[0].version === "1.0.0" && profile[0].configs.length > 0) {
    updateAndSaveMappings(profile[0].configs);
  }
};

const updateProfileSelect = async (device) => {
  const profileSelectEl = document.getElementById("profile-number");

  if (!device) {
    profileSelectEl.disabled = true;
    profileSelectEl.title = "Please connect device to select profile";
    profileSelectEl.innerHTML = `<option value="0">1</option>`;
    return;
  }

  const maxProfiles = await getMaxProfileCount(device);

  console.log("Max profile count", maxProfiles);

  profileSelectEl.disabled = false;
  profileSelectEl.title = "";
  let optionMarkup = "";

  for (let i = 1; i <= maxProfiles; i++) {
    optionMarkup += `<option value="${i - 1}">${i}</option>`;
  }

  profileSelectEl.innerHTML = optionMarkup;
};

const showSaveHideConnect = () => {
  deployProfileButtonEl.classList.remove("hidden");
  connectAdapterButtonEl.classList.add("hidden");
};

const showConnectHideSave = () => {
  deployProfileButtonEl.classList.add("hidden");
  connectAdapterButtonEl.classList.remove("hidden");
};

const onDeviceConnect = async (device) => {
  showSaveHideConnect();
  await updateProfileSelect(device);
};

const onDeviceDisconnect = async () => {
  showConnectHideSave();
  await updateProfileSelect();
};

const checkAndSetMappingsConfigFile = async (evt) => {
  try {
    if (evt.target.files.length === 0) {
      // No file selected, cancel was pressed.
      return;
    }

    let profile = await readSingleFile(evt);

    if (!profile) {
      // No data in file.
      return;
    }

    profile = JSON.parse(profile);

    loadJsonProfile(profile);
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

    const moreKeysAhead = keyIdx < keysDown.length - 1;

    // If there's a key ahead of us
    if (moreKeysAhead) {
      // Check the corresponding order button's text to see whether we
      // start a new array in keysDown or keep adding to the existing one
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
        helperEl.className = "helper stick";
        angleSelectWrapperEl.classList.remove("hidden");
        dpadSelectEl.classList.add("hidden");
        buttonSelectEl.classList.add("hidden");
        break;
      case Button:
        helperEl.className = "helper button";
        buttonSelectEl.classList.remove("hidden");
        dpadSelectEl.classList.add("hidden");
        angleSelectWrapperEl.classList.add("hidden");
        break;
      case DPad:
        helperEl.className = "helper dpad";
        dpadSelectEl.classList.remove("hidden");
        buttonSelectEl.classList.add("hidden");
        angleSelectWrapperEl.classList.add("hidden");
        break;
    }
  };

  actionTypeEl.addEventListener("change", showRelevantActionInputs);

  showRelevantActionInputs();
};

angleSelectEl.addEventListener("input", (evt) => {
  selectedAngle = angleSelectEl.value % 360;
  helperAngleEl.style.setProperty("--angle", `${selectedAngle}deg`);
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

connectAdapterButtonEl.addEventListener("click", async () => {
  const device = await connectToAdapter();

  if (!device) {
    return;
  }

  onDeviceConnect(device);
});

navigator.usb.addEventListener("disconnect", (event) => {
  onDeviceDisconnect();
});

saveConfigToDiskEl.addEventListener("click", (evt) => {
  evt.preventDefault();
  const mappingsToDownload = mappingsToFullMappingStructure(mappings);
  saveProfileToJSON(mappingsToDownload);
});

deleteConfigEl.addEventListener("click", (evt) => {
  const wantsToDelete = confirm(
    "You sure you want to delete the config from your browser storage?"
  );

  wantsToDelete && deleteFromLocalStorage();

  window.location.reload();
});

deployProfileButtonEl.addEventListener("click", (evt) => {
  // Only one profile for now
  try {
    const profileIdx = Number(profileNumberEl?.value);
    const sizeOfConfig = mappingsToBinary(
      mappingsToFullMappingStructure(mappings),
      profileIdx
    );

    configSizeEl.innerHTML = sizeOfConfig;
  } catch (e) {
    alert("A new error has occurred, please let NessDan know!");

    let message;

    try {
      message = JSON.stringify(e);
    } catch (e) {
      message = e;
    }
    alert(message);

    console.error(e);
  }
});

loadFileEl.addEventListener("change", checkAndSetMappingsConfigFile, false);

loadButtonEl.addEventListener(
  "click",
  () => {
    const loadAction = loadOptionsEl.value;
    let wantsToLoad = false;
    let profileToLoad;

    switch (loadAction) {
      case "file":
        loadFileEl.click();
        break;
      case "wasd-24":
        profileToLoad = wasd24Profile;
        wantsToLoad = confirm(
          "Are you sure you want to load the WASD+QE 24 Profile? This will clear the current profile."
        );
        break;
      case "wasd-24-qezc":
        profileToLoad = wasd24QEZCProfile;
        wantsToLoad = confirm(
          "Are you sure you want to load the WASD+QEZC 24 Profile? This will clear the current profile."
        );
        break;
      case "wasd-24-smash":
        profileToLoad = wasd24SmashProfile;
        wantsToLoad = confirm(
          "Are you sure you want to load the 24-Angle + Numpad Tilt for Smash Profile? This will clear the current profile."
        );
        break;
      default:
        console.error("Unknown load action", loadAction);
    }

    if (wantsToLoad && profileToLoad) {
      loadJsonProfile(profileToLoad);
    }
  },
  false
);

document.addEventListener("DOMContentLoaded", (event) => {
  renderMappingsOnPage(); // In case we loaded some mappings
  watchActionInputs();
});
