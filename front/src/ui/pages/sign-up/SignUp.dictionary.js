/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import { PATH_VARIBLES } from "../../../utils/Constants";

const TEST_NAME = "sign-up";

const SIGN_UP = {
  ERROR: {
    CODE: {
      OK: -1,
      EMPTY_FIELDS: 0,
      UNKNOWN: 1,
      EMAIL_VALIDATION: 2,
      EXIST_ACCOUNT: 3,
      PASSWORD_CONFIRM_FAILED: 4,
    },
    CONTENT: [
      <h3 data-testid={`${TEST_NAME}-issue-0`} className="sign-up__issue">
        Empty fields!
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-1`} className="sign-up__issue">
        Unknown error(request failed).
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-2`} className="sign-up__issue">
        Email should be like example@email.com
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-3`} className="sign-up__issue">
        Account already exist. [
        <Link className="" to={PATH_VARIBLES.SIGN_IN}>
          Sign in
        </Link>
        ]
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-4`} className="sign-up__issue">
        Passwords not confirmed.
      </h3>,
    ],
  },
  INPUT: {
    EMAIL: { TEST_ID: `${TEST_NAME}-input-0`, PLACEHOLDER: "Enter your email" },
    PASSWORD: {
      TEST_ID: `${TEST_NAME}-input-1`,
      PLACEHOLDER: "Enter your password",
    },
    CONFIRM_PASSWORD: {
      TEST_ID: `${TEST_NAME}-input-2`,
      PLACEHOLDER: "Confirm your password",
    },
  },
  BUTTON: {
    FORGOT_PASSWORD: {
      TEST_ID: `${TEST_NAME}-button-0`,
      TEXT: "Forgot password",
    },
    SIGN_UP: { TEST_ID: `${TEST_NAME}-button-1`, TEXT: "Sign up" },
  },
  TEXTS: {
    MAIN_TITLE: "Sign up",
    PROMT_1: "Type your account email here:",
    PROMT_2: "Type your password here:",
  },
};

export default SIGN_UP;
