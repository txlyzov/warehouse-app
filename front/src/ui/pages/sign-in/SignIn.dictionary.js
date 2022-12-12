/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import { PATH_VARIBLES } from "../../../utils/Constants";

const TEST_NAME = "sign-in";

const SIGN_IN = {
  ERROR: {
    CODE: {
      OK: -1,
      EMPTY_FIELDS: 0,
      UNKNOWN: 1,
      EMAIL_VALIDATION: 2,
      UNEXIST_ACCOUNT: 3,
      WRONG_PASSWORD: 4,
    },
    CONTENT: [
      <h3 data-testid={`${TEST_NAME}-issue-0`} className="sign-in__issue">
        Empty fields!
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-1`} className="sign-in__issue">
        Unknown error
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-2`} className="sign-in__issue">
        Email should be like example@email.com
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-3`} className="sign-in__issue">
        Account does not exist. [
        <Link className="" to={PATH_VARIBLES.SIGN_UP}>
          Registration
        </Link>
        ]
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-4`} className="sign-in__issue">
        Wrong password. [
        <Link className="" to={PATH_VARIBLES.FORGOT_PASSWORD}>
          Reset password
        </Link>
        ]
      </h3>,
    ],
  },
  INPUT: {
    EMAIL: { TEST_ID: `${TEST_NAME}-input-0`, PLACEHOLDER: "Enter your email" },
    PASSWORD: {
      TEST_ID: `${TEST_NAME}-input-1`,
      PLACEHOLDER: "Enter your password",
    },
  },
  BUTTON: {
    FORGOT_PASSWORD: {
      TEST_ID: `${TEST_NAME}-button-0`,
      TEXT: "Forgot password",
    },
    SIGN_IN: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Sign in" },
  },
  TEXTS: {
    MAIN_TITLE: "Sign in",
    PROMT_1: "Type your account email here:",
    PROMT_2: "Type your password here:",
  },
  SERVER: {
    WRONG_EMAIL_ERROR: "Wrong email.",
    WRONG_PASSWORD_ERROR: "Wrong password.",
  },
};

export default SIGN_IN;
