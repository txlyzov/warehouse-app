/* eslint-disable react/react-in-jsx-scope */
const TEST_NAME = "create-warehouse";

const CREATE_WAREHOUSE = {
  ERROR: {
    CODE: {
      OK: -1,
      EMPTY_FIELDS: 0,
      UNKNOWN: 1,
      LIMIT_REACHED: 2,
      AUTH_ERROR: 3,
    },
    CONTENT: [
      <h3
        data-testid={`${TEST_NAME}-issue-0`}
        className="create-warehouse__issue"
      >
        Empty fields!
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-1`}
        className="create-warehouse__issue"
      >
        Unknown error
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-2`}
        className="create-warehouse__issue"
      >
        Warehouse limit reached! (20/20)
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-3`}
        className="create-warehouse__issue"
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
    MAIN_TITLE: "Create warehouse",
    PROMT_1: "Type your warehouse name here:",
    PROMT_2: "Type warehouse location:",
    PROMT_3: "Type collaborators email:",
  },
};

export default CREATE_WAREHOUSE;
