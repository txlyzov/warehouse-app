const TEST_NAME = "warehouse-page";

const WAREHOUSE_PAGE = {
  TABLE: {
    COLUMN_SETTINGS: [
      { heading: "Item Id", value: "id" },
      { heading: "Name", value: "name" },
      { heading: "Value", value: "quantity" },
    ],
    ITEMS_ON_PAGE_1: 5,
    ITEMS_ON_PAGE_2: 15,
  },
  INPUT: {
    SEARCH: { TEST_ID: `${TEST_NAME}-input-0`, PLACEHOLDER: "Search by name" },
  },
  BUTTON: {
    ADD_CARGO: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Add cargo" },
    DELETE_CARGO: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Delete selected" },
    EDIT_WAREHOUSE: {
      TEST_ID: `${TEST_NAME}-button-2`,
      TEXT: "Edit warehouse",
    },
    DELETE_WAREHOUSE: {
      TEST_ID: `${TEST_NAME}-button-3`,
      TEXT: "Delete warehouse",
    },
  },
  TEXTS: {
    LOADING: "Loading",
    EMPTY_TABLE:
      'Warehouse have no registered records for it. You can add some with "Add cargo" option.',
  },
  MODAL: {
    TITLE_CONFIRM_DELETE: "Delete warehouse?",
    TEXT_CONFIRM_DELETE:
      "Are you sure that you want to delete warehouse?" +
      "Place warehouse id to submit" +
      "(you can copy it by clicking on it)",
  },
};

export default WAREHOUSE_PAGE;
