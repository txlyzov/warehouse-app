import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import ConfirmRemoving from './ConfirmRemoving';
import CONFIRM_REMOVING from './ConfirmRemoving.dictionary';

describe.skip('Confirm removing component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderConfirmRemovingWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <ConfirmRemoving />
            </BrowserRouter>
        </Provider>,
    );

    window.matchMedia = window.matchMedia || (() => ({
        matches: false,
        addListener() { },
        removeListener() { },
    }))

    test(`should`, async () => {

        renderConfirmRemovingWithProvider();

        const confirmDeleteButton = screen.getByTestId(CONFIRM_REMOVING.BUTTON.CONFIRM_DELETE.TEST_ID);
        expect(confirmDeleteButton).toBeInTheDocument();
    });
});
