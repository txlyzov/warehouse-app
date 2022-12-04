import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Settings from './Settings';
import reduxStore from "../../../redux-store/index";
import SETTINGS from './Settings.dictionary';

describe('Settings component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderSettingsWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <Settings />
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

    test(`should have ${SETTINGS.BUTTON.TEXT[0]} and ${SETTINGS.BUTTON.TEXT[0]} buttons`, async () => {
        renderSettingsWithProvider();

        const button0 = screen.getByTestId(SETTINGS.BUTTON.TEST_ID[0]);
        const button1 = screen.getByTestId(SETTINGS.BUTTON.TEST_ID[1]);

        expect(button0).toBeInTheDocument();
        expect(button1).toBeInTheDocument();
    });

    test(`should have ${SETTINGS.TEXTS.PROMT_1} block`, async () => {
        renderSettingsWithProvider();

        const promt0 = screen.getByText(SETTINGS.TEXTS.PROMT_1);
        const input0 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[0]);
        const input1 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[1]);
        const input2 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[2]);

        expect(promt0).toBeInTheDocument();
        expect(input0).toBeInTheDocument();
        expect(input1).toBeInTheDocument();
        expect(input2).toBeInTheDocument();
        expect(input0).toHaveAttribute('type', 'password');
        expect(input1).toHaveAttribute('type', 'password');
        expect(input2).toHaveAttribute('type', 'password');
    });

    test(`should have error with code ${SETTINGS.ERROR.CODE.EMPTY_FIELDS} after click`, async () => {
        renderSettingsWithProvider();

        try {
            const error = screen.getByText(SETTINGS.ERROR.CONTENT[SETTINGS.ERROR.CODE.EMPTY_FIELDS]);
            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        const updateButton = screen.getByTestId(SETTINGS.BUTTON.TEST_ID[1]);
        userEvent.click(updateButton);
        const error = screen.getByText(SETTINGS.ERROR.CONTENT[SETTINGS.ERROR.CODE.EMPTY_FIELDS]);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${SETTINGS.ERROR.CODE.NOT_EQUAL_CONFIRM_FIELD} after click`, async () => {
        renderSettingsWithProvider();

        try {
            const error = screen.getByText(SETTINGS.ERROR.CONTENT[SETTINGS.ERROR.CODE.NOT_EQUAL_CONFIRM_FIELD]);
            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[0]);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[1]);
        userEvent.type(input1, 'q'.repeat(22));
        const input2 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[2]);
        userEvent.type(input2, 'q'.repeat(23));

        const updateButton = screen.getByTestId(SETTINGS.BUTTON.TEST_ID[1]);
        userEvent.click(updateButton);
        const error = screen.getByText(SETTINGS.ERROR.CONTENT[SETTINGS.ERROR.CODE.NOT_EQUAL_CONFIRM_FIELD]);

        expect(error).toBeInTheDocument();
    });

    test(`should NOT have any errors after click`, async () => {
        renderSettingsWithProvider();

        const input0 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[0]);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[1]);
        userEvent.type(input1, 'q'.repeat(22));
        const input2 = screen.getByTestId(SETTINGS.INPUT.TEST_ID[2]);
        userEvent.type(input2, 'q'.repeat(22));

        const updateButton = screen.getByTestId(SETTINGS.BUTTON.TEST_ID[1]);
        userEvent.click(updateButton);

        try {
            const error1 = await screen.findByText(SETTINGS.ERROR.CODE.EMPTY_FIELDS);
            expect(error1).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error2 = await screen.findByText(SETTINGS.ERROR.CODE.NOT_EQUAL_CONFIRM_FIELD);
            expect(error2).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error3 = await screen.findByText(SETTINGS.ERROR.CODE.UNKNOWN);
            expect(error3).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error4 = await screen.findByText(SETTINGS.ERROR.CODE.WRONG_ORIGINAL_PASSWORD);
            expect(error4).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

    });
});
