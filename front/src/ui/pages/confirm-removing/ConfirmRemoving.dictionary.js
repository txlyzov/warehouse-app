const TEST_NAME = "confirm-removing";

const CONFIRM_REMOVING = {
  TABLE: [
    { CELL_HEADER: "Item Id", VALUE_KEY: "id" },
    { CELL_HEADER: "Name", VALUE_KEY: "name" },
    { CELL_HEADER: "Value", VALUE_KEY: "quantity" },
  ],
  INPUT: {
    SEARCH: { TEST_ID: `${TEST_NAME}-input-0`, PLACEHOLDER: "Search by name" },
  },
  BUTTON: {
    CANCEL: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Cancel" },
    DELETE: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "" },
    CONFIRM_DELETE: { TEST_ID: `${TEST_NAME}-button-2`, TEXT: "" },
  },
  TEXTS: {
    WAREHOUSE_TITLE: "Warehouse",
    INFO_TEXT:
      "Check sheet before deletion." +
      "You can unselect some positions here if nessesary." +
      "If you agreed with list - confirm by clicking buttons below.",
  },
  MODAL: {
    TITLE_NOTE: "Delete cargo data",
    TEXT_NOTE: "Data deleted",
    TITLE_ERROR: "Request error",
    TEXT_ERROR: "Something happend with request. Please,relogin.",
  },
};

export default CONFIRM_REMOVING;
