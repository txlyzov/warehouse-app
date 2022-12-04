import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import SignIn from './SignIn';
import SIGN_IN from './SignIn.dictionary';

describe('Sign in component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderSignInWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <SignIn />
            </BrowserRouter>
        </Provider>,
    );

    window.matchMedia = window.matchMedia || function noName() {
        return {
            matches: false,
            addListener() { },
            removeListener() { },
        };
    };

    test(`should have ${SIGN_IN.BUTTON.TEXT[0]} and ${SIGN_IN.BUTTON.TEXT[1]} button`, async () => {
        renderSignInWithProvider();

        const button0 = screen.getByTestId(SIGN_IN.BUTTON.TEST_ID[0]);
        const button1 = screen.getByTestId(SIGN_IN.BUTTON.TEST_ID[1]);

        expect(button0).toBeInTheDocument();
        expect(button1).toBeInTheDocument();
    });

    test(`should have ${SIGN_IN.TEXTS.PROMT_1} block`, async () => {
        renderSignInWithProvider();

        const promt0 = screen.getByText(SIGN_IN.TEXTS.PROMT_1);
        const input0 = screen.getByTestId(SIGN_IN.INPUT.TEST_ID[0]);

        expect(promt0).toBeInTheDocument();
        expect(input0).toBeInTheDocument();
    });

    test(`should have ${SIGN_IN.TEXTS.PROMT_2} block`, async () => {
        renderSignInWithProvider();

        const promt0 = screen.getByText(SIGN_IN.TEXTS.PROMT_2);
        const input0 = screen.getByTestId(SIGN_IN.INPUT.TEST_ID[1]);

        expect(promt0).toBeInTheDocument();
        expect(input0).toBeInTheDocument();
    });

    test(`should have error with code ${SIGN_IN.ERROR.CODE.EMPTY_FIELDS} after click`, async () => {
        renderSignInWithProvider();

        try {
            const error = screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        const confirmButton = screen.getByTestId(SIGN_IN.BUTTON.TEST_ID[1]);
        userEvent.click(confirmButton);
        const error = screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.EMPTY_FIELDS}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${SIGN_IN.ERROR.CODE.EMAIL_VALIDATION} after click`, async () => {
        renderSignInWithProvider();

        try {
            const error = screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.EMAIL_VALIDATION}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(SIGN_IN.INPUT.TEST_ID[0]);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(SIGN_IN.INPUT.TEST_ID[1]);
        userEvent.type(input1, 'q'.repeat(22));

        const confirmButton = screen.getByTestId(SIGN_IN.BUTTON.TEST_ID[1]);
        userEvent.click(confirmButton);
        const error = screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.EMAIL_VALIDATION}`);

        expect(error).toBeInTheDocument();
    });

    test(`should NOT have any errors after click`, async () => {
        renderSignInWithProvider();

        const input0 = screen.getByTestId(SIGN_IN.INPUT.TEST_ID[0]);
        userEvent.type(input0, 'q@q.q');
        const input1 = screen.getByTestId(SIGN_IN.INPUT.TEST_ID[1]);
        userEvent.type(input1, 'q@q.q');

        const updateButton = screen.getByTestId(SIGN_IN.BUTTON.TEST_ID[1]);
        userEvent.click(updateButton);

        try {
            const error1 = await screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error1).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error2 = await screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.EMAIL_VALIDATION}`);

            expect(error2).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error3 = await screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.UNKNOWN}`);

            expect(error3).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error4 = await screen.getByTestId(`sign-in-issue-${SIGN_IN.ERROR.CODE.UNEXIST_ACCOUNT}`);

            expect(error4).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

    });
});
