const TEST_NAME = "entity-page";

const ENTITY_PAGE = {
  INPUT: {
    MODAL_INPUT_NAME: { PLACEHOLDER: "Item name" },
    MODAL_INPUT_NOTE: { PLACEHOLDER: "Note text" },
    MODAL_INPUT_IMAGE: { PLACEHOLDER: "Image link" },
  },
  BUTTON: {
    RETURN: { TEST_ID: `${TEST_NAME}-button-0`, TEXT: "Return" },
    UPDATE: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Update" },
    DELETE: { TEST_ID: `${TEST_NAME}-button-2`, TEXT: "Delete" },
  },
  TEXTS: {
    LOADING: "Loading..",
    EMPTY_IMAGE: "No image for this item",
    EMPTY_NOTE: "No notes privided.",
  },
  MODAL: {
    TITLE_DELETE_NOTE: "Delete cargo data",
    TEXT_DELETE_NOTE: "Data deleted",
    TITLE_UPDATE_NOTE: "Update cargo data",
    TEXT_UPDATE_NOTE: "Data updated",
    TITLE_ERROR: "Request error",
    TEXT_ERROR: "Something happend with request. Please,relogin.",
    UNEXIST_WAREHOUSE_ERROR: "Unexist warehouse.",
    UNEXIST_CARGO_ENTITY_ERROR: "Unexist cargo entity",
    TITLE_INPUT_NAME: "Edit name",
    TEXT_INPUT_NAME: "You can update the name of cargo. Not empty string.",
    TITLE_INPUT_NOTE: "Edit note",
    TEXT_INPUT_NOTE: "You can update cargo note.",
    TITLE_INPUT_IMAGE: "Edit image",
    TEXT_INPUT_IMAGE: "You can update cargo image.",
  },
};

export default ENTITY_PAGE;
