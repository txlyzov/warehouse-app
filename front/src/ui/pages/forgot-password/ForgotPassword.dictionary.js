/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";

const TEST_NAME = "forgot-password";

const FORGOT_PASSWORD = {
  ERROR: {
    CODE: {
      OK: -1,
      EMPTY_FIELDS: 0,
      UNKNOWN: 1,
      EMAIL_VALIDATION: 2,
      UNEXIST_ACCOUNT: 3,
    },
    CONTENT: [
      <h3
        data-testid={`${TEST_NAME}-issue-0`}
        className="forgot-password__issue"
      >
        Empty fields!
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-1`}
        className="forgot-password__issue"
      >
        Unknown error(request failed).
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-2`}
        className="forgot-password__issue"
      >
        Email should be like example@email.com
      </h3>,
      <h3
        data-testid={`${TEST_NAME}-issue-3`}
        className="forgot-password__issue"
      >
        Account does not exist. [
        <Link className="" to="/sign-up">
          Registration
        </Link>
        ]
      </h3>,
    ],
  },
  INPUT: {
    TEST_ID: [`${TEST_NAME}-input-0`],
    PLACEHOLDER: ["Enter your email"],
  },
  BUTTON: {
    TEST_ID: [`${TEST_NAME}-button-0`],
    TEXT: ["Reset password"],
  },
  TEXTS: {
    MAIN_TITLE: "Forgot password?",
    PROMT_1: "Type your account email here:",
  },
};

export default FORGOT_PASSWORD;
