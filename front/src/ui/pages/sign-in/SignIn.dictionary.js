/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";

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
        <Link className="" to="/sign-up">
          Registration
        </Link>
        ]
      </h3>,
      <h3 data-testid={`${TEST_NAME}-issue-4`} className="sign-in__issue">
        Wrong password. [
        <Link className="" to="/forgot-password">
          Reset password
        </Link>
        ]
      </h3>,
    ],
  },
  INPUT: {
    TEST_ID: [`${TEST_NAME}-input-0`, `${TEST_NAME}-input-1`],
    PLACEHOLDER: ["Enter your email", "Enter your password"],
  },
  BUTTON: {
    TEST_ID: [`${TEST_NAME}-button-0`, `${TEST_NAME}-button-1`],
    TEXT: ["Forgot password", "Sign in"],
  },
  TEXTS: {
    MAIN_TITLE: "Sign in",
    PROMT_1: "Type your account email here:",
    PROMT_2: "Type your password here:",
  },
};

export default SIGN_IN;
