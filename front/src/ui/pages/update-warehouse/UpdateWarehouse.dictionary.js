/* eslint-disable react/react-in-jsx-scope */
const TEST_NAME = "update-warehouse";

const UPDATE_WAREHOUSE = {
  ERROR: {
    CODE: {
      OK: -1,
      EMPTY_FIELDS: 0,
      UNKNOWN: 1,
      AUTH_ERROR: 2,
    },
    CONTENT: [
      <h3
        data-testid={`${TEST_NAME}-issue-0`}
        className="update-warehouse__issue"
      >
        Empty fields!
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-1`}
        className="update-warehouse__issue"
      >
        Unknown error
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-2`}
        className="update-warehouse__issue"
      >
        Auth error.
      </h3>,
    ],
  },
  INPUT: {
    TEST_ID: [
      `${TEST_NAME}-input-0`,
      `${TEST_NAME}-input-1`,
      `${TEST_NAME}-input-2`,
    ],
    PLACEHOLDER: [
      "Enter warehouse name",
      "Enter warehouse location city",
      "Disabled functionality",
    ],
  },
  BUTTON: {
    TEST_ID: [`${TEST_NAME}-button-0`, `${TEST_NAME}-button-1`],
    TEXT: ["Return", "Create"],
  },
  TEXTS: {
    MAIN_TITLE: "Update warehouse",
    PROMT_1: "Type your warehouse name here:",
    PROMT_2: "Type warehouse location:",
    PROMT_3: "Type collaborators email:",
  },
};

export default UPDATE_WAREHOUSE;
