import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import HELP from './Help.dictionary';
import Help from './Help';

describe('Help component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderHelpWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <Help />
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

    test(`should have ${HELP.INSTRUCTIONS.length} help blocks`, async () => {
        const { container } = renderHelpWithProvider();

        HELP.INSTRUCTIONS.forEach((element, index) => {
            const title = screen.getByText(HELP.INSTRUCTIONS[index].title);
            const promt = screen.getByText(HELP.INSTRUCTIONS[index].text);

            expect(title).toBeInTheDocument();
            expect(promt).toBeInTheDocument();
        });

        expect(container.getElementsByClassName('help__block').length).toBe(HELP.INSTRUCTIONS.length)
    });

    test(`should have ${Math.floor(HELP.INSTRUCTIONS.length / 2) + HELP.INSTRUCTIONS.length % 2} left help blocks`, async () => {
        const { container } = renderHelpWithProvider();

        expect(container.getElementsByClassName('left-position').length).toBe(Math.floor(HELP.INSTRUCTIONS.length / 2) + HELP.INSTRUCTIONS.length % 2)
    });

    test(`should have ${Math.floor(HELP.INSTRUCTIONS.length / 2)} rigth help blocks`, async () => {
        const { container } = renderHelpWithProvider();

        expect(container.getElementsByClassName('right-position').length).toBe(Math.floor(HELP.INSTRUCTIONS.length / 2))
    });
});
