const TEST_NAME = "create-entity";

const CREATE_ENTITY = {
  INPUT: {
    MODAL_INPUT_NAME: { PLACEHOLDER: "Item name" },
    MODAL_INPUT_NOTE: { PLACEHOLDER: "Note text" },
    MODAL_INPUT_IMAGE: { PLACEHOLDER: "Image link" },
  },
  BUTTON: {
    RETURN: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Return" },
    CREATE: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Create" },
  },
  TEXTS: {
    LOADING: "Loading..",
    EMPTY_NAME: "Set entity name",
    EMPTY_IMAGE: "You can link image or left field empty",
    EMPTY_NOTE: "You can write notes here or left field empty.",
  },
  MODAL: {
    TITLE_ERROR: "Request error",
    TEXT_ERROR: "Something happend with request. Please,relogin.",
    UNEXIST_WAREHOUSE_ERROR: "Unexist warehouse.",
    TITLE_INPUT_NAME: "Edit name",
    TEXT_INPUT_NAME: "You can update the name of cargo. Not empty string.",
    TITLE_INPUT_NOTE: "Edit note",
    TEXT_INPUT_NOTE: "You can update cargo note.",
    TITLE_INPUT_IMAGE: "Edit image",
    TEXT_INPUT_IMAGE: "You can update cargo image.",
  },
};

export default CREATE_ENTITY;
