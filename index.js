const angles = {
  0: { x: 128, y: 0 },
  15: { x: 170, y: 0 },
  30: { x: 213, y: 0 },
  45: { x: 255, y: 0 },
  60: { x: 255, y: 43 },
  75: { x: 255, y: 85 },
  90: { x: 255, y: 128 },
  105: { x: 255, y: 170 },
  120: { x: 255, y: 213 },
  135: { x: 255, y: 255 },
  150: { x: 213, y: 255 },
  165: { x: 170, y: 255 },
  180: { x: 128, y: 255 },
  195: { x: 85, y: 255 },
  210: { x: 43, y: 255 },
  225: { x: 0, y: 255 },
  240: { x: 0, y: 213 },
  255: { x: 0, y: 170 },
  270: { x: 0, y: 128 },
  285: { x: 0, y: 85 },
  300: { x: 0, y: 43 },
  315: { x: 0, y: 0 },
  330: { x: 43, y: 0 },
  345: { x: 85, y: 0 },
  360: { x: 128, y: 0 },
};

let anglesSlower = {};
for (const angle in angles) {
  anglesSlower[angle] = {
    x: Math.round(
      angles[angle].x > 250
        ? (angles[angle].x - 128) * 0.7 + 129
        : (angles[angle].x - 128) * 0.7 + 128
    ),
    y: Math.round(
      angles[angle].y > 250
        ? (angles[angle].y - 128) * 0.7 + 129
        : (angles[angle].y - 128) * 0.7 + 128
    ),
  };
}

const webConfig = [
  {
    version: 1,
    mappings: [
      // 90s
      {
        keys: ["W"],
        action: {
          type: "lstick",
          ...angles[0],
        },
      },
      {
        keys: ["A"],
        action: {
          type: "lstick",
          ...angles[270],
        },
      },
      {
        keys: ["S"],
        action: {
          type: "lstick",
          ...angles[180],
        },
      },
      {
        keys: ["D"],
        action: {
          type: "lstick",
          ...angles[90],
        },
      },

      ///////////////////////////////
      // 45s
      {
        keys: ["W", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[315],
        },
      },
      {
        keys: ["W", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[45],
        },
      },
      {
        keys: ["S", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[225],
        },
      },
      {
        keys: ["S", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[135],
        },
      },

      ///////////////////////////////
      // 15s for 90s angle modifiers
      {
        keys: ["A", "D"],
        action: {
          type: "lstick",
          ...angles[255],
        },
      },
      {
        keys: ["A", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[285],
        },
      },
      {
        keys: ["D", "A"],
        action: {
          type: "lstick",
          ...angles[105],
        },
      },
      {
        keys: ["D", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[75],
        },
      },
      {
        keys: ["W", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[345],
        },
      },
      {
        keys: ["W", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[15],
        },
      },
      {
        keys: ["S", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[195],
        },
      },
      {
        keys: ["S", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[165],
        },
      },

      ///////////////////////////////
      // 15s for 45s
      {
        keys: ["W", "A", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[330],
        },
      },
      {
        keys: ["W", "A", "D"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...angles[300],
        },
      },
      {
        keys: ["W", "D", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[30],
        },
      },
      {
        keys: ["W", "D", "A"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...angles[60],
        },
      },
      {
        keys: ["S", "A", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[240],
        },
      },
      {
        keys: ["S", "A", "D"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...angles[210],
        },
      },
      {
        keys: ["S", "D", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[120],
        },
      },
      {
        keys: ["S", "D", "A"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...angles[150],
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START SHIFT SECTION!!!!             /////////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // 90s
      {
        keys: ["LEFTSHIFT", "W"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[0],
        },
      },
      {
        keys: ["LEFTSHIFT", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[270],
        },
      },
      {
        keys: ["LEFTSHIFT", "S"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[180],
        },
      },
      {
        keys: ["LEFTSHIFT", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[90],
        },
      },
      // 45s
      {
        keys: ["LEFTSHIFT", "W", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[315],
        },
      },
      {
        keys: ["LEFTSHIFT", "W", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[45],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[225],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[135],
        },
      },
      ///////////////////////////////
      // 15s for 90s angle modifiers
      {
        keys: ["LEFTSHIFT", "A", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[255],
        },
      },
      {
        keys: ["LEFTSHIFT", "A", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[285],
        },
      },
      {
        keys: ["LEFTSHIFT", "D", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[105],
        },
      },
      {
        keys: ["LEFTSHIFT", "D", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[75],
        },
      },
      {
        keys: ["LEFTSHIFT", "W", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[345],
        },
      },
      {
        keys: ["LEFTSHIFT", "W", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[15],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[195],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[165],
        },
      },
      ///////////////////////////////
      // 15s for 45s
      {
        keys: ["LEFTSHIFT", "W", "A", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[330],
        },
      },
      {
        keys: ["LEFTSHIFT", "W", "A", "D"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...anglesSlower[300],
        },
      },
      {
        keys: ["LEFTSHIFT", "W", "D", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[30],
        },
      },
      {
        keys: ["LEFTSHIFT", "W", "D", "A"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...anglesSlower[60],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "A", "E"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[240],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "A", "D"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...anglesSlower[210],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "D", "Q"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...anglesSlower[120],
        },
      },
      {
        keys: ["LEFTSHIFT", "S", "D", "A"],
        anyOrderModifier: true,
        action: {
          type: "lstick",
          ...anglesSlower[150],
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START RIGHT-HAND SECTION!!!!             ////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // LEFT
      {
        keys: ["KP4"],
        action: {
          type: "rstick",
          ...angles[270],
        },
      },
      // RIGHT
      {
        keys: ["KP6"],
        action: {
          type: "rstick",
          ...angles[90],
        },
      },
      // UP-LEFT
      {
        keys: ["KP7"],
        action: {
          type: "rstick",
          ...angles[330],
        },
      },
      // UP-RIGHT
      {
        keys: ["KP9"],
        action: {
          type: "rstick",
          ...angles[30],
        },
      },
      // DOWN-LEFT
      {
        keys: ["KP1"],
        action: {
          type: "rstick",
          ...angles[210],
        },
      },
      // DOWN-RIGHT
      {
        keys: ["KP3"],
        action: {
          type: "rstick",
          ...angles[150],
        },
      },

      // Angled Tilts
      // RIGHT-UP
      {
        keys: ["DOWN", "KP9"],
        anyOrder: true,
        action: {
          type: "rstick",
          ...angles[60],
        },
      },
      // RIGHT-DOWN
      {
        keys: ["DOWN", "KP3"],
        anyOrder: true,
        action: {
          type: "rstick",
          ...angles[120],
        },
      },
      // LEFT-UP
      {
        keys: ["DOWN", "KP7"],
        anyOrder: true,
        action: {
          type: "rstick",
          ...angles[300],
        },
      },
      // LEFT-DOWN
      {
        keys: ["DOWN", "KP1"],
        anyOrder: true,
        action: {
          type: "rstick",
          ...angles[240],
        },
      },

      // MAIN BUTTONS
      {
        keys: ["KP5"],
        action: {
          type: "button",
          button: "A",
        },
      },
      {
        keys: ["KP8"],
        action: {
          type: "button",
          button: "B",
        },
      },
      {
        keys: ["KP2"],
        action: {
          type: "button",
          button: "L",
        },
      },
      {
        keys: ["SPACE"],
        action: {
          type: "button",
          button: "Y",
        },
      },
      {
        keys: ["RIGHT"],
        action: {
          type: "button",
          button: "X",
        },
      },
      {
        keys: ["KPPLUS"],
        action: {
          type: "button",
          button: "ZR",
        },
      },
      {
        keys: ["KPENTER"],
        action: {
          type: "button",
          button: "R",
        },
      },

      // TERTIARY BUTTONS
      {
        keys: ["ENTER"],
        action: {
          type: "button",
          button: "PLUS",
        },
      },
      {
        keys: ["HOME"],
        action: {
          type: "button",
          button: "HOME",
        },
      },
    ],
  },
  {
    // GGST
    version: 1,
    mappings: [
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START LEFT-HAND SECTION!!!!             ////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // 90s
      {
        keys: ["SPACE"], // Space as jump!
        action: {
          type: "lstick",
          ...angles[0],
        },
      },
      {
        keys: ["W"],
        action: {
          type: "lstick",
          ...angles[0],
        },
      },
      {
        keys: ["A"],
        action: {
          type: "lstick",
          ...angles[270],
        },
      },
      {
        keys: ["S"],
        action: {
          type: "lstick",
          ...angles[180],
        },
      },
      {
        keys: ["D"],
        action: {
          type: "lstick",
          ...angles[90],
        },
      },

      ///////////////////////////////
      // 45s
      {
        keys: ["W", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[315],
        },
      },
      {
        keys: ["W", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[45],
        },
      },
      {
        keys: ["SPACE", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[315],
        },
      },
      {
        keys: ["SPACE", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[45],
        },
      },
      {
        keys: ["S", "A"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[225],
        },
      },
      {
        keys: ["S", "D"],
        anyOrder: true,
        action: {
          type: "lstick",
          ...angles[135],
        },
      },

      // An actual button:
      {
        keys: ["LEFTSHIFT"],
        action: {
          type: "button",
          button: "LCLICK",
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START RIGHT-HAND SECTION!!!!             ////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // MAIN BUTTONS
      {
        keys: ["KP4"],
        action: {
          type: "button",
          button: "B",
        },
      },
      {
        keys: ["KP5"],
        action: {
          type: "button",
          button: "A",
        },
      },
      {
        keys: ["KP6"],
        action: {
          type: "button",
          button: "Y",
        },
      },
      {
        keys: ["KPPLUS"],
        action: {
          type: "button",
          button: "X",
        },
      },
      {
        keys: ["KPENTER"],
        action: {
          type: "button",
          button: "X",
        },
      },
      {
        keys: ["KP7"],
        action: {
          type: "button",
          button: "L",
        },
      },
      {
        keys: ["KP8"],
        action: {
          type: "button",
          button: "R",
        },
      },
      {
        keys: ["KP1"],
        action: {
          type: "button",
          button: "ZL",
        },
      },
      {
        keys: ["KP2"],
        action: {
          type: "button",
          button: "ZR",
        },
      },
      {
        keys: ["RIGHT"],
        action: {
          type: "button",
          button: "RCLICK",
        },
      },
      {
        keys: ["DOWN"],
        action: {
          type: "button",
          button: "RCLICK",
        },
      },

      // TERTIARY BUTTONS
      {
        keys: ["ENTER"],
        action: {
          type: "button",
          button: "PLUS",
        },
      },
      {
        keys: ["HOME"],
        action: {
          type: "button",
          button: "HOME",
        },
      },
      {
        keys: ["SYSRQ"],
        action: {
          type: "button",
          button: "CAPTURE",
        },
      },
    ],
  },
];

let hardwareConfigs = [];

// https://stackoverflow.com/a/20871714/231730
function generateAllPossibleArrays(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur,
      memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

const generateHardwareConfig = (hardwareConfigs, mapping) => {
  let allPossibleKeyOrders;

  // https://recorder.google.com/share/fdd2f2db-99c6-4416-82d4-c233ff51af25
  // Keep calling this function with an array that we keep shrinking every recursive
  // call, e.g. ["W", "D"]. We only ever look at the first item. Next call would
  // be ["D"] and when we hit the last key, we apply the action onto that config.
  const buildTree = (orderedKeys, action, hardwareConfigs, currentDepth) => {
    const keyWeCareAbout = orderedKeys[0];
    const lastKey = orderedKeys.length === 1;
    // Go through the hardware config, see if we have already made a
    // mapping for the key we're searching through.
    let matchedMappingIdx = hardwareConfigs.findIndex((hardwareConfig) => {
      return hardwareConfig.key == keyWeCareAbout;
    });
    let matchedMapping;

    // We didn't find the mapping so we make our own!
    if (matchedMappingIdx == -1) {
      // Push the new object in and take note of the size of the array so
      // we can then refernce the new element.

      // This will hold the new length of the array
      const newLengthOfConfig = hardwareConfigs.push({
        key: keyWeCareAbout,
        priority: currentDepth,
      });

      // Set the mapping by taking the new length and subtracting one.
      matchedMapping = hardwareConfigs[newLengthOfConfig - 1];
    } else {
      matchedMapping = hardwareConfigs[matchedMappingIdx];
    }

    // We've still got some keys to go!
    if (!lastKey) {
      // Since we may or may not be building on a previous mapping tree,
      // check to see if we made a followed_by yet.
      if (!matchedMapping.followed_by) {
        matchedMapping.followed_by = [];
      }

      const orderedKeysWithoutCurrentIteration = orderedKeys.slice(1);
      const nextLevelOfTree = matchedMapping.followed_by;
      const nextDepth = currentDepth + 1;

      buildTree(
        orderedKeysWithoutCurrentIteration,
        action,
        nextLevelOfTree,
        nextDepth
      );
    } else {
      // We're done and at the end! Apply the action here!
      const hardwareAction = convertWebActionToHardwareAction(action);
      matchedMapping.actions = [hardwareAction];
    }
  };

  // Create an array of arrays of all possible combinations.
  if (mapping.anyOrder) {
    allPossibleKeyOrders = generateAllPossibleArrays(mapping.keys);
  } else if (mapping.anyOrderModifier) {
    // Grab all the "modifier" keys (every key except the last one)
    const modifierKeys = mapping.keys.slice(0, -1);
    const lastKey = mapping.keys[mapping.keys.length - 1];
    // Get all possible modifier combinations
    allPossibleKeyOrders = generateAllPossibleArrays(modifierKeys);
    // Push the last key onto all possible modifier combinations.
    allPossibleKeyOrders = allPossibleKeyOrders.map((arr) => {
      arr.push(lastKey);
      return arr;
    });
  } else {
    // If we're dealing with just a specific order, wrap it in an array
    // so below logic carriers over.
    allPossibleKeyOrders = [mapping.keys];
  }

  allPossibleKeyOrders.forEach((mappingKeyCombo) => {
    buildTree(mappingKeyCombo, mapping.action, hardwareConfigs, 0);
  });
};

const convertWebActionToHardwareAction = (action) => {
  switch (action.type) {
    case "lstick":
      return {
        key: "LANALOG",
        type: "ABSCOORDS",
        value: {
          x: action.x,
          y: action.y,
        },
      };
    case "rstick":
      return {
        key: "RANALOG",
        type: "ABSCOORDS",
        value: {
          x: action.x,
          y: action.y,
        },
      };
    case "button":
      return {
        key: action.button,
        type: "BOOLEAN",
        value: true,
      };
      break;
    default:
      break;
  }
};

webConfig[1].mappings.forEach((mapping) => {
  generateHardwareConfig(hardwareConfigs, mapping);
});

console.log(hardwareConfigs);
