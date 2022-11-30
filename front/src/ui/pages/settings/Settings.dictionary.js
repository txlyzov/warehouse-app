/* eslint-disable react/react-in-jsx-scope */

const SETTINGS = {
  ERROR: {
    CODE: {
      OK: -1,
      EMPTY_FIELDS: 0,
      UNKNOWN: 1,
      WRONG_ORIGINAL_PASSWORD: 2,
      NOT_EQUAL_CONFIRM_FIELD: 3,
    },
    CONTENT: [
      "Empty fields!",
      "Unknown error(request failed).",
      "Wrong original password",
      "Passwords not confirmed.",
    ],
  },
  INPUT: {
    TEST_ID: ["settings-input-1", "settings-input-2", "settings-input-3"],
    PLACEHOLDER: [
      "Enter your old password",
      "Enter your new password",
      "Confirm your new password",
    ],
  },
  BUTTON: {
    TEST_ID: ["settings-button-1", "settings-button-2"],
    TEXT: ["Return", "Update"],
  },
  TEXTS: {
    MAIN_TITLE: "Settings",
    PROMT_1: "Change password:",
  },
  MODAL: {
    TITLE_NOTE: "Success!",
    TEXT_NOTE: "Now you can use your new password.",
  },
};

export default SETTINGS;
