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
    NAME: {
      TEST_ID: `${TEST_NAME}-input-0`,
      PLACEHOLDER: "Enter warehouse name",
    },
    LOCATION: {
      TEST_ID: `${TEST_NAME}-input-1`,
      PLACEHOLDER: 'Enter warehouse location city (Example: "City,Contry")',
    },
    DISABLED: {
      TEST_ID: `${TEST_NAME}-input-2`,
      PLACEHOLDER: "Disabled functionality",
    },
  },
  BUTTON: {
    RETURN: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Return" },
    UPDATE: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Update" },
  },
  TEXTS: {
    MAIN_TITLE: "Update warehouse",
    PROMT_1: "Type your warehouse name here:",
    PROMT_2: "Type warehouse location:",
    PROMT_3: "Type collaborators email:",
  },
};

export default UPDATE_WAREHOUSE;
