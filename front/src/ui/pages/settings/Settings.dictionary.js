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
    OLD_PASSWORD: {
      TEST_ID: `${TEST_NAME}-input-0`,
      PLACEHOLDER: "Enter your old password",
    },
    NEW_PASSWORD: {
      TEST_ID: `${TEST_NAME}-input-1`,
      PLACEHOLDER: "Enter your new password",
    },
    CONFIRM_NEW_PASSWORD: {
      TEST_ID: `${TEST_NAME}-input-2`,
      PLACEHOLDER: "Confirm your new password",
    },
  },
  BUTTON: {
    RETURN: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Return" },
    UPDATE: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Update" },
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
