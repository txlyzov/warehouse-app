const TEST_NAME = "home-page";

const HOME_PAGE = {
  TABLE: {
    COLUMN_SETTINGS: {
      header: "Warehouses",
      value: ["name", "id"],
      columns: 4,
      rows: 5,
    },
    MAX_RECORDS: 20,
  },
  INPUT: {
    SEARCH: { TEST_ID: `${TEST_NAME}-input-0`, PLACEHOLDER: "Search by name" },
  },
  BUTTON: {
    ADD_WAREHOUSE: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Add warehouse" },
  },
};

export default HOME_PAGE;
