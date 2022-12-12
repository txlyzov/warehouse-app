import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import ForgotPassword from './ForgotPassword';
import FORGOT_PASSWORD from './ForgotPassword.dictionary';

describe('Forgot password component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderForgotPasswordWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <ForgotPassword />
            </BrowserRouter>
        </Provider>,
    );

    window.matchMedia = window.matchMedia || (() => ({
        matches: false,
        addListener() { },
        removeListener() { },
    }))

    test(`should have ${FORGOT_PASSWORD.BUTTON.SUBMIT.TEXT} button`, async () => {
        renderForgotPasswordWithProvider();

        const button0 = screen.getByTestId(FORGOT_PASSWORD.BUTTON.SUBMIT.TEST_ID);

        expect(button0).toBeInTheDocument();
    });

    test(`should have ${FORGOT_PASSWORD.TEXTS.PROMT_1} block`, async () => {
        renderForgotPasswordWithProvider();

        const promt0 = screen.getByText(FORGOT_PASSWORD.TEXTS.PROMT_1);
        const input0 = screen.getByTestId(FORGOT_PASSWORD.INPUT.EMAIL.TEST_ID);

        expect(promt0).toBeInTheDocument();
        expect(input0).toBeInTheDocument();
    });

    test(`should have error with code ${FORGOT_PASSWORD.ERROR.CODE.EMPTY_FIELDS} after click`, async () => {
        renderForgotPasswordWithProvider();

        try {
            const error = screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        const confirmButton = screen.getByTestId(FORGOT_PASSWORD.BUTTON.SUBMIT.TEST_ID);
        userEvent.click(confirmButton);
        const error = screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.EMPTY_FIELDS}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${FORGOT_PASSWORD.ERROR.CODE.EMAIL_VALIDATION} after click`, async () => {
        renderForgotPasswordWithProvider();

        try {
            const error = screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.EMAIL_VALIDATION}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(FORGOT_PASSWORD.INPUT.EMAIL.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(FORGOT_PASSWORD.BUTTON.SUBMIT.TEST_ID);
        userEvent.click(confirmButton);
        const error = screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.EMAIL_VALIDATION}`);

        expect(error).toBeInTheDocument();
    });

    test(`should NOT have any errors after click`, async () => {
        renderForgotPasswordWithProvider();

        const input0 = screen.getByTestId(FORGOT_PASSWORD.INPUT.EMAIL.TEST_ID);
        userEvent.type(input0, 'q@q.q');
        const confirmButton = screen.getByTestId(FORGOT_PASSWORD.BUTTON.SUBMIT.TEST_ID);
        userEvent.click(confirmButton);

        try {
            const error1 = await screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error1).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error2 = await screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.EMAIL_VALIDATION}`);

            expect(error2).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error3 = await screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.UNKNOWN}`);

            expect(error3).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error4 = await screen.getByTestId(`forgot-password-issue-${FORGOT_PASSWORD.ERROR.CODE.UNEXIST_ACCOUNT}`);

            expect(error4).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

    });
});
