import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import NoPage from './NoPage';
import NO_PAGE from './NoPage.dictionary';

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

    const renderNoPageWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <NoPage />
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

    test(`should have ${NO_PAGE.TEXTS.MAIN_TITLE} block`, async () => {
        renderNoPageWithProvider();

        const title0 = screen.getByText(NO_PAGE.TEXTS.PROMT_1);
        const promt0 = screen.getByText(NO_PAGE.TEXTS.PROMT_1);
        const button0 = screen.getByTestId(NO_PAGE.BUTTON.TEST_ID[0]);

        expect(title0).toBeInTheDocument();
        expect(promt0).toBeInTheDocument();
        expect(button0).toBeInTheDocument();
    });
});
