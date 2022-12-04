import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import MainPage from './MainPage';
import MAIN_PAGE from './MainPage.dictionary';
import * as LocalStorageUtil from '../../../utils/LocalStorageUtil';

describe('No page component', () => {

    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderMainPageWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <MainPage />
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

    test(`should have ${MAIN_PAGE.TEXTS.MAIN_TITLE} block`, async () => {
        renderMainPageWithProvider();

        const title0 = screen.getByText(MAIN_PAGE.TEXTS.PROMT_1);
        const promt0 = screen.getByText(MAIN_PAGE.TEXTS.PROMT_1);
        const button0 = screen.getByTestId(MAIN_PAGE.BUTTON.TEST_ID[0]);
        const button1 = screen.getByTestId(MAIN_PAGE.BUTTON.TEST_ID[1]);

        expect(title0).toBeInTheDocument();
        expect(promt0).toBeInTheDocument();
        expect(button0).toBeInTheDocument();
        expect(button1).toBeInTheDocument();
    });

    test(`should have ${MAIN_PAGE.BUTTON.TEXT[0][0]} on button with ${MAIN_PAGE.BUTTON.TEST_ID[0]} and with exist localStorage data`, async () => {
        jest.spyOn(LocalStorageUtil, "getLoginData").mockReturnValue({
            email: "q@q.q", token: "12.12.12", username: "q"
        });

        renderMainPageWithProvider();

        const button0 = screen.getByTestId(MAIN_PAGE.BUTTON.TEST_ID[0]);
        expect(button0).toHaveTextContent(MAIN_PAGE.BUTTON.TEXT[0][0]);
    });

    test(`should have ${MAIN_PAGE.BUTTON.TEXT[0][1]} on button with ${MAIN_PAGE.BUTTON.TEST_ID[0]} and without exist localStorage data`, async () => {
        jest.spyOn(LocalStorageUtil, "getLoginData").mockReturnValue();

        renderMainPageWithProvider();

        const button0 = screen.getByTestId(MAIN_PAGE.BUTTON.TEST_ID[0]);
        expect(button0).toHaveTextContent(MAIN_PAGE.BUTTON.TEXT[0][1]);
    });
});
