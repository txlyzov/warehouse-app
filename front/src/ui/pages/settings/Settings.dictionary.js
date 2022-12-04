/* eslint-disable react/react-in-jsx-scope */
const TEST_NAME = "settings";

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
    TEST_ID: [
      `${TEST_NAME}-input-0`,
      `${TEST_NAME}-input-1`,
      `${TEST_NAME}-input-2`,
    ],
    PLACEHOLDER: [
      "Enter your old password",
      "Enter your new password",
      "Confirm your new password",
    ],
  },
  BUTTON: {
    TEST_ID: [`${TEST_NAME}-button-0`, `${TEST_NAME}-button-1`],
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
