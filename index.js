import { keyEventCodeToC } from "./constants/enums.js";

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

const commonMappings = [
  // 90s
  {
    keys: [["W"]],
    action: {
      type: "lstick",
      angle: 0,
      stickDistance: 100,
    },
  },
  {
    keys: [["A"]],
    action: {
      type: "lstick",
      angle: 270,
      stickDistance: 100,
    },
  },
  {
    keys: [["S"]],
    action: {
      type: "lstick",
      angle: 180,
      stickDistance: 100,
    },
  },
  {
    keys: [["D"]],
    action: {
      type: "lstick",
      angle: 90,
      stickDistance: 100,
    },
  },
  // TERTIARY BUTTONS
  {
    keys: [["ENTER"]],
    action: {
      type: "button",
      button: "PLUS",
    },
  },
  {
    keys: [["MINUS"]],
    action: {
      type: "button",
      button: "MINUS",
    },
  },
  {
    keys: [["HOME"]],
    action: {
      type: "button",
      button: "HOME",
    },
  },
  {
    keys: [["SYSRQ"]],
    action: {
      type: "button",
      button: "CAPTURE",
    },
  },
];

const allProfiles = [
  {
    version: "1.0.0",
    configs: [
      ...commonMappings,
      ///////////////////////////////
      // 45s
      {
        keys: [["W", "A"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "D"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "A"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 100,
        },
      },

      ///////////////////////////////
      // 15s for 90s angle modifiers
      {
        keys: [["A", "D"]],
        action: {
          type: "lstick",
          angle: 255,
          stickDistance: 100,
        },
      },
      {
        keys: [["A", "E"]],
        action: {
          type: "lstick",
          angle: 285,
          stickDistance: 100,
        },
      },
      {
        keys: [["D", "A"]],
        action: {
          type: "lstick",
          angle: 105,
          stickDistance: 100,
        },
      },
      {
        keys: [["D", "Q"]],
        action: {
          type: "lstick",
          angle: 75,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "Q"]],
        action: {
          type: "lstick",
          angle: 345,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "E"]],
        action: {
          type: "lstick",
          angle: 15,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "Q"]],
        action: {
          type: "lstick",
          angle: 195,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "E"]],
        action: {
          type: "lstick",
          angle: 165,
          stickDistance: 100,
        },
      },

      ///////////////////////////////
      // 15s for 45s
      {
        keys: [["W", "A", "E"]],
        action: {
          type: "lstick",
          angle: 330,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "A"], ["D"]],
        action: {
          type: "lstick",
          angle: 300,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "D", "Q"]],
        action: {
          type: "lstick",
          angle: 30,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "D"], ["A"]],
        action: {
          type: "lstick",
          angle: 60,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "A", "E"]],
        action: {
          type: "lstick",
          angle: 240,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "A"], ["D"]],
        action: {
          type: "lstick",
          angle: 210,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D", "Q"]],
        action: {
          type: "lstick",
          angle: 120,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"], ["A"]],
        action: {
          type: "lstick",
          angle: 150,
          stickDistance: 100,
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START SHIFT SECTION!!!!             /////////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // 90s
      {
        keys: [["LEFTSHIFT", "W"]],
        action: {
          type: "lstick",
          angle: 0,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "A"]],
        action: {
          type: "lstick",
          angle: 270,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S"]],
        action: {
          type: "lstick",
          angle: 180,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "D"]],
        action: {
          type: "lstick",
          angle: 90,
          stickDistance: 70,
        },
      },
      // 45s
      {
        keys: [["LEFTSHIFT", "W", "A"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "D"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "A"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "D"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 70,
        },
      },
      ///////////////////////////////
      // 15s for 90s angle modifiers
      {
        keys: [["LEFTSHIFT", "A"], ["D"]],
        action: {
          type: "lstick",
          angle: 255,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "A", "E"]],
        action: {
          type: "lstick",
          angle: 285,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "D"], ["A"]],
        action: {
          type: "lstick",
          angle: 105,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "D", "Q"]],
        action: {
          type: "lstick",
          angle: 75,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "Q"]],
        action: {
          type: "lstick",
          angle: 345,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "E"]],
        action: {
          type: "lstick",
          angle: 15,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "Q"]],
        action: {
          type: "lstick",
          angle: 195,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "E"]],
        action: {
          type: "lstick",
          angle: 165,
          stickDistance: 70,
        },
      },
      ///////////////////////////////
      // 15s for 45s
      {
        keys: [["LEFTSHIFT", "W", "A", "E"]],
        action: {
          type: "lstick",
          angle: 330,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "A"], ["D"]],
        action: {
          type: "lstick",
          angle: 300,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "D", "Q"]],
        action: {
          type: "lstick",
          angle: 30,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "D"], ["A"]],
        action: {
          type: "lstick",
          angle: 60,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "A", "E"]],
        action: {
          type: "lstick",
          angle: 240,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "A"], ["D"]],
        action: {
          type: "lstick",
          angle: 210,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "D", "Q"]],
        action: {
          type: "lstick",
          angle: 120,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "D"], ["A"]],
        action: {
          type: "lstick",
          angle: 150,
          stickDistance: 70,
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START RIGHT-HAND SECTION!!!!             ////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // LEFT
      {
        keys: [["KP4"]],
        action: {
          type: "rstick",
          angle: 270,
          stickDistance: 100,
        },
      },
      // RIGHT
      {
        keys: [["KP6"]],
        action: {
          type: "rstick",
          angle: 90,
          stickDistance: 100,
        },
      },
      // UP-LEFT
      {
        keys: [["KP7"]],
        action: {
          type: "rstick",
          angle: 330,
          stickDistance: 100,
        },
      },
      // UP-RIGHT
      {
        keys: [["KP9"]],
        action: {
          type: "rstick",
          angle: 30,
          stickDistance: 100,
        },
      },
      // DOWN-LEFT
      {
        keys: [["KP1"]],
        action: {
          type: "rstick",
          angle: 210,
          stickDistance: 100,
        },
      },
      // DOWN-RIGHT
      {
        keys: [["KP3"]],
        action: {
          type: "rstick",
          angle: 150,
          stickDistance: 100,
        },
      },

      // Doesn't work, makes W and S stop working. Inherit is buggy too.
      // // Angled Tilts
      // // RIGHT-UP
      // {
      //  [ keys: [["W", "KP6"]]],
      //   // inherit: true,
      //   action: {
      //     type: "rstick",
      // angle: 60,
      // stickDistance: 100
      //   },
      // },
      // // LEFT-UP
      // {
      //  [ keys: [["W", "KP4"]]],
      //   // inherit: true,
      //   action: {
      //     type: "rstick",
      // angle: 300,
      // stickDistance: 100
      //   },
      // },
      // // RIGHT-DOWN
      // {
      //  [ keys: [["S", "KP6"]]],
      //   // inherit: true,
      //   action: {
      //     type: "rstick",
      // angle: 120,
      // stickDistance: 100
      //   },
      // },
      // // LEFT-DOWN
      // {
      //  [ keys: [["S", "KP4"]]],
      //   // inherit: true,
      //   action: {
      //     type: "rstick",
      // angle: 240,
      // stickDistance: 100
      //   },
      // },

      // MAIN BUTTONS
      {
        keys: [["KP5"]],
        action: {
          type: "button",
          button: "A",
        },
      },
      {
        keys: [["KP8"]],
        action: {
          type: "button",
          button: "B",
        },
      },
      {
        keys: [["KP2"]],
        action: {
          type: "button",
          button: "L",
        },
      },
      {
        keys: [["SPACE"]],
        action: {
          type: "button",
          button: "Y",
        },
      },
      {
        keys: [["RIGHT"]],
        action: {
          type: "button",
          button: "X",
        },
      },
      {
        keys: [["KPPLUS"]],
        action: {
          type: "button",
          button: "ZR",
        },
      },
      {
        keys: [["KPENTER"]],
        action: {
          type: "button",
          button: "R",
        },
      },
    ],
  },
  {
    // GGST
    version: "1.0.0",
    configs: [
      ...commonMappings,
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START LEFT-HAND SECTION!!!!             ////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // 90s
      {
        keys: [["SPACE"]],
        action: {
          type: "lstick",
          angle: 0,
          stickDistance: 100,
        },
      },

      // WORKAROUND FOR A BUG! When D -> A is pressed, A action should happen BUT
      // Because D -> A -> W exists, it lands on that "A" which doesn't have an action.
      {
        keys: [["A", "D"]],
        action: {
          type: "lstick",
          angle: 90,
          stickDistance: 100,
        },
      },
      {
        keys: [["D", "A"]],
        action: {
          type: "lstick",
          angle: 270,
          stickDistance: 100,
        },
      },

      // We want straight up or down when left, right, and up/down are pressed.
      {
        keys: [["W", "A", "D"]],
        action: {
          type: "lstick",
          angle: 0,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "A", "D"]],
        action: {
          type: "lstick",
          angle: 0,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D", "A"]],
        action: {
          type: "lstick",
          angle: 180,
          stickDistance: 100,
        },
      },

      ///////////////////////////////
      // 45s
      {
        keys: [["W", "A"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "D"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "A"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "D"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "A"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 100,
        },
      },

      // How we want 45 degree up-downs to override
      {
        keys: [["S", "A"], ["W"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"], ["W"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "A"], ["SPACE"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"], ["SPACE"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "A"], ["S"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "D"], ["S"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "A"], ["S"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 100,
        },
      },
      {
        keys: [["SPACE", "D"], ["S"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 100,
        },
      },

      // An actual button:
      {
        keys: [["LEFTSHIFT"]],
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
        keys: [["KP4"]],
        action: {
          type: "button",
          button: "B",
        },
      },
      {
        keys: [["KP5"]],
        action: {
          type: "button",
          button: "A",
        },
      },
      {
        keys: [["KP6"]],
        action: {
          type: "button",
          button: "Y",
        },
      },
      {
        keys: [["KPPLUS"]],
        action: {
          type: "button",
          button: "X",
        },
      },
      {
        keys: [["KPENTER"]],
        action: {
          type: "button",
          button: "X",
        },
      },
      {
        keys: [["KP7"]],
        action: {
          type: "button",
          button: "L",
        },
      },
      {
        keys: [["KP8"]],
        action: {
          type: "button",
          button: "R",
        },
      },
      {
        keys: [["KP1"]],
        action: {
          type: "button",
          button: "ZL",
        },
      },
      {
        keys: [["KP2"]],
        action: {
          type: "button",
          button: "ZR",
        },
      },
      {
        keys: [["RIGHT"]],
        action: {
          type: "button",
          button: "RCLICK",
        },
      },
      {
        keys: [["DOWN"]],
        action: {
          type: "button",
          button: "RCLICK",
        },
      },
    ],
  },
  {
    // Smash for Everyone
    version: "1.0.0",
    configs: [
      ...commonMappings,
      // WORKAROUND FOR A BUG! When D -> A is pressed, A action should happen BUT
      // Because D -> A -> W exists, it lands on that "A" which doesn't have an action.
      {
        keys: [["A", "D"]],
        action: {
          type: "lstick",
          angle: 90,
          stickDistance: 100,
        },
      },
      {
        keys: [["D", "A"]],
        action: {
          type: "lstick",
          angle: 270,
          stickDistance: 100,
        },
      },

      // We want straight up or down when left, right, and up/down are pressed.
      {
        keys: [["W", "A", "D"]],
        action: {
          type: "lstick",
          angle: 0,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D", "A"]],
        action: {
          type: "lstick",
          angle: 180,
          stickDistance: 100,
        },
      },

      ///////////////////////////////
      // 45s
      {
        keys: [["W", "A"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["W", "D"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "A"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 100,
        },
      },

      // How we want 45 degree up-downs to override
      {
        keys: [["S", "A"], ["W"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 100,
        },
      },
      {
        keys: [["S", "D"], ["W"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 100,
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START SHIFT SECTION!!!!             /////////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // 90s
      {
        keys: [["LEFTSHIFT", "W"]],
        action: {
          type: "lstick",
          angle: 0,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "A"]],
        action: {
          type: "lstick",
          angle: 270,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S"]],
        action: {
          type: "lstick",
          angle: 180,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "D"]],
        action: {
          type: "lstick",
          angle: 90,
          stickDistance: 70,
        },
      },
      // 45s
      {
        keys: [["LEFTSHIFT", "W", "A"]],
        action: {
          type: "lstick",
          angle: 315,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "W", "D"]],
        action: {
          type: "lstick",
          angle: 45,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "A"]],
        action: {
          type: "lstick",
          angle: 225,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "S", "D"]],
        action: {
          type: "lstick",
          angle: 135,
          stickDistance: 70,
        },
      },

      // Shift -> A -> D goes full right, not half right. Need to override
      {
        keys: [["LEFTSHIFT", "A"], ["D"]],
        action: {
          type: "lstick",
          angle: 90,
          stickDistance: 70,
        },
      },
      {
        keys: [["LEFTSHIFT", "D"], ["A"]],
        action: {
          type: "lstick",
          angle: 270,
          stickDistance: 70,
        },
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      /////////////////        START RIGHT-HAND SECTION!!!!             ////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // LEFT
      {
        keys: [["KP7"]],
        action: {
          type: "rstick",
          angle: 270,
          stickDistance: 100,
        },
      },
      {
        keys: [["KP1"]],
        action: {
          type: "rstick",
          angle: 270,
          stickDistance: 100,
        },
      },
      // RIGHT
      {
        keys: [["KP9"]],
        action: {
          type: "rstick",
          angle: 90,
          stickDistance: 100,
        },
      },
      {
        keys: [["KP3"]],
        action: {
          type: "rstick",
          angle: 90,
          stickDistance: 100,
        },
      },
      // UP
      {
        keys: [["KP8"]],
        action: {
          type: "rstick",
          angle: 0,
          stickDistance: 100,
        },
      },
      // DOWN
      {
        keys: [["KP2"]],
        action: {
          type: "rstick",
          angle: 180,
          stickDistance: 100,
        },
      },

      // Doesn't work, makes W and S stop working. Inherit is buggy too.
      // // Angled Tilts
      // // RIGHT-UP
      // {
      //  [ keys: [["W", "KP9"]]],
      //   action: {
      //     type: "rstick",
      // angle: 60,
      // stickDistance: 100
      //   },
      // },
      // // LEFT-UP
      // {
      //  [ keys: [["W", "KP7"]]],
      //   action: {
      //     type: "rstick",
      // angle: 300,
      // stickDistance: 100
      //   },
      // },
      // // RIGHT-DOWN
      // {
      //  [ keys: [["S", "KP3"]]],
      //   action: {
      //     type: "rstick",
      // angle: 120,
      // stickDistance: 100
      //   },
      // },
      // // LEFT-DOWN
      // {
      //  [ keys: [["S", "KP1"]]],
      //   action: {
      //     type: "rstick",
      // angle: 240,
      // stickDistance: 100
      //   },
      // },

      // MAIN BUTTONS
      {
        keys: [["KP4"]],
        action: {
          type: "button",
          button: "A",
        },
      },
      {
        keys: [["KP5"]],
        action: {
          type: "button",
          button: "B",
        },
      },
      {
        keys: [["KP6"]],
        action: {
          type: "button",
          button: "R",
        },
      },
      {
        keys: [["KPPLUS"]],
        action: {
          type: "button",
          button: "ZR",
        },
      },
      {
        keys: [["KPENTER"]],
        action: {
          type: "button",
          button: "ZL",
        },
      },
      {
        keys: [["SPACE"]],
        action: {
          type: "button",
          button: "Y",
        },
      },
      {
        keys: [["RIGHT"]],
        action: {
          type: "button",
          button: "X",
        },
      },
    ],
  },
];

let hardwareConfigs = [];

// https://stackoverflow.com/a/20871714/231730
function generateAllPossibleArrays(inputArr) {
  var results = [];
  var allResults = [];

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

  function convertArrayOfPermsToStrings(arrayPerms) {
    let allPremutations = arrayPerms[0];

    for (const resultIdx in arrayPerms) {
      const result = arrayPerms[resultIdx];
      if (resultIdx === "0") {
        continue;
      }
      let newTotal = [];
      for (const oldTotalIdx in allPremutations) {
        const oldTotal = allPremutations[oldTotalIdx];
        for (const permIdx in result) {
          const perm = result[permIdx];
          newTotal.push(oldTotal.concat(perm));
        }
      }
      allPremutations = newTotal;
    }

    return allPremutations;
  }

  inputArr.forEach((arr) => {
    permute(arr);
    allResults.push(results);
    results = [];
  });

  return convertArrayOfPermsToStrings(allResults);
}

const generateHardwareConfig = (hardwareConfigs, mapping) => {
  let allPossibleKeyOrders;

  // https://recorder.google.com/share/fdd2f2db-99c6-4416-82d4-c233ff51af25
  // Keep calling this function with an array that we keep shrinking every recursive
  // call, e.g. ["W", "D"]. We only ever look at the first item. Next call would
  // be ["D"] and when we hit the last key, we apply the action onto that config.
  const buildTree = (
    orderedKeys,
    webMapping,
    hardwareConfigs,
    currentDepth
  ) => {
    const keyWeCareAbout = orderedKeys[0];
    const actualKeyName = keyEventCodeToC[keyWeCareAbout];
    const lastKey = orderedKeys.length === 1;
    // Go through the hardware config, see if we have already made a
    // mapping for the key we're searching through.
    let matchedMappingIdx = hardwareConfigs.findIndex((hardwareConfig) =>  hardwareConfig.key == actualKeyName);
    let matchedMapping;

    // We didn't find the mapping so we make our own!
    if (matchedMappingIdx == -1) {
      // Push the new object in and take note of the size of the array so
      // we can then refernce the new element.

      // This will hold the new length of the array
      const newLengthOfConfig = hardwareConfigs.push({
        key: actualKeyName,
        priority: currentDepth,
      });

      // Set the mapping by taking the new length and subtracting one.
      matchedMapping = hardwareConfigs[newLengthOfConfig - 1];
    } else {
      matchedMapping = hardwareConfigs[matchedMappingIdx];
    }

    if (webMapping.inherit) {
      matchedMapping.inherit = true;
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
        webMapping,
        nextLevelOfTree,
        nextDepth
      );
    } else {
      // We're done and at the end! Apply the action here!
      const hardwareAction = convertWebActionToHardwareAction(
        webMapping.action
      );
      matchedMapping.actions = [hardwareAction];
    }
  };

  // Create an array of arrays of all possible combinations.
  allPossibleKeyOrders = generateAllPossibleArrays(mapping.keys);

  allPossibleKeyOrders.forEach((mappingKeyCombo) => {
    buildTree(mappingKeyCombo, mapping, hardwareConfigs, 0);
  });
};

const convertWebActionToHardwareAction = (action) => {
  switch (action.type) {
    case "lstick":
      return {
        key: "LANALOG",
        type: "ABSCOORDS",
        value: {
          x: angles[action.angle].x,
          y: angles[action.angle].y,
        },
      };
    case "rstick":
      return {
        key: "RANALOG",
        type: "ABSCOORDS",
        value: {
          x: angles[action.angle].x,
          y: angles[action.angle].y,
        },
      };
    case "button":
      return {
        key: action.button,
        type: "BOOLEAN",
        value: true,
      };
    case "dpad":
      return {
        key: "DPAD",
        type: "UINT8",
        value: action.dpad,
      };
    default:
      break;
  }
};

export const mappingsToBinary = (mappings) => {
  mappings.forEach((profile) => {
    profile.configs.forEach((mapping) => {
      generateHardwareConfig(hardwareConfigs, mapping);
    });

    const hardwareProfile = {
      ...profile,
      configs: hardwareConfigs,
    };
    console.log(hardwareProfile);

    window.buildEdgeguardConfigBlob(JSON.stringify(hardwareProfile));

    console.log(dataBlob);
    hardwareConfigs = [];
  });
};

Module.onRuntimeInitialized = () => {
  window.buildEdgeguardConfigBlob = Module.cwrap("buildguard", null, ["string"]);
  // mappingsToBinary(allProfiles);
};
