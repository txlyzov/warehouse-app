/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import DropdownMenu from './DropdownMenu';
import DROPDOWN_MENU from './DropdownMenu.dictionary';

const MockFunction1 = jest.fn();
const MockFunction2 = jest.fn();

const TRIGGER_NAMES = [
    'Trigger-0',
]
const CONTENT_1_NAMES = [
    'Content-0',
    'Content-1',
    'Content-2',
]

const CONTENT_2_NAMES = [
    'Content-3',
]

const trigger = (
    <div>
        <button data-testid={TRIGGER_NAMES[0]} type='button'>{TRIGGER_NAMES[0]}</button>
    </div>
)

const content1 = (
    <div>
        <button data-testid={CONTENT_1_NAMES[0]} type='button' onClick={() => { MockFunction1() }}>{CONTENT_1_NAMES[0]}</button>
        <button data-testid={CONTENT_1_NAMES[1]} type='button' onClick={() => { MockFunction2() }}>{CONTENT_1_NAMES[1]}</button>
        <button data-testid={CONTENT_1_NAMES[2]} type='button' onClick={() => { MockFunction2() }}>{CONTENT_1_NAMES[2]}</button>
    </div>
)
const content2 = (
    <div>
        <h1 data-testid={CONTENT_2_NAMES[0]}>{CONTENT_2_NAMES[0]}</h1>
    </div>
)

describe('Dropdown Menu component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    const renderDropdownMenuWithProvider = (triggerContent, dropdownContent) => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <DropdownMenu triggerContent={triggerContent} dropdownContent={dropdownContent} />
            </BrowserRouter>
        </Provider>,
    );

    const renderDropdownMenuWithProviderAndWidth = (triggerContent, dropdownContent, width) => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <DropdownMenu triggerContent={triggerContent} dropdownContent={dropdownContent} width={width} />
            </BrowserRouter>
        </Provider>,
    );

    const renderDropdownMenuWithProviderAndPosition = (triggerContent, dropdownContent, position) => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <DropdownMenu triggerContent={triggerContent} dropdownContent={dropdownContent} position={position} />
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

    test(`should have ${TRIGGER_NAMES.length} buttons before trigger click`, async () => {
        renderDropdownMenuWithProvider(trigger, content1);

        const buttonsBeforeClick = screen.getAllByRole('button', { hidden: 'true' });
        expect(buttonsBeforeClick).toHaveLength(1);
    });

    test(`should have ${CONTENT_1_NAMES.length + TRIGGER_NAMES.length} buttons after 1 trigger click`, async () => {
        renderDropdownMenuWithProvider(trigger, content1);

        const buttonsBeforeClick = screen.getAllByRole('button', { hidden: 'true' });
        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const buttonsAfterFirstClick = screen.getAllByRole('button', { hidden: 'true' });

        expect(buttonsBeforeClick).toHaveLength(1);
        expect(buttonsAfterFirstClick).toHaveLength(4);
    });

    test(`should have ${TRIGGER_NAMES.length} buttons after 2 trigger clicks`, async () => {
        renderDropdownMenuWithProvider(trigger, content1);

        const buttonsBeforeClick = screen.getAllByRole('button', { hidden: 'true' });
        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const buttonsFirstAfterClick = screen.getAllByRole('button', { hidden: 'true' });
        userEvent.click(triggerButton);
        const buttonsAfterSecondClick = screen.getAllByRole('button', { hidden: 'true' });

        expect(buttonsBeforeClick).toHaveLength(1);
        expect(buttonsFirstAfterClick).toHaveLength(4);
        expect(buttonsAfterSecondClick).toHaveLength(1);
    });

    test(`should have ${TRIGGER_NAMES.length} buttons after 1 trigger click and 1 content click`, async () => {
        renderDropdownMenuWithProvider(trigger, content1);

        const buttonsBeforeClick = screen.getAllByRole('button', { hidden: 'true' });
        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const buttonsAfterClick = screen.getAllByRole('button', { hidden: 'true' });
        const contentButton = screen.getByTestId(CONTENT_1_NAMES[0]);
        userEvent.click(contentButton);
        const buttonsSecondClick = screen.getAllByRole('button', { hidden: 'true' });

        expect(buttonsBeforeClick).toHaveLength(1);
        expect(buttonsAfterClick).toHaveLength(4);
        expect(buttonsSecondClick).toHaveLength(1);
        expect(MockFunction1).toBeCalledTimes(1);
        expect(MockFunction2).toBeCalledTimes(0);
    });

    test(`should have 1 MockFunction1 calls and 2 MockFunction2 calls`, async () => {
        renderDropdownMenuWithProvider(trigger, content1);

        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const contentButton0 = screen.getByTestId(CONTENT_1_NAMES[0]);
        userEvent.click(contentButton0);
        userEvent.click(triggerButton);
        const contentButton1 = screen.getByTestId(CONTENT_1_NAMES[1]);
        userEvent.click(contentButton1);
        userEvent.click(triggerButton);
        const contentButton2 = screen.getByTestId(CONTENT_1_NAMES[2]);
        userEvent.click(contentButton2);

        expect(MockFunction1).toBeCalledTimes(1);
        expect(MockFunction2).toBeCalledTimes(2);
    });

    test(`should have ${CONTENT_2_NAMES[0]} text`, async () => {
        renderDropdownMenuWithProvider(trigger, content2);

        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const contentText = screen.getByText(CONTENT_2_NAMES[0]);

        expect(contentText).toBeInTheDocument();
    });

    test(`should have top/left/width autostyles`, async () => {
        renderDropdownMenuWithProvider(trigger, content2);

        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const dropdownContent = screen.getByTestId(DROPDOWN_MENU.TEST_ID.DROPDOWN_CONTENT);

        expect(dropdownContent).toHaveStyle(`width: auto; top: auto; left: auto`);
    });

    test(`should have top/left autostyles and setted width`, async () => {
        const width = '270px'
        renderDropdownMenuWithProviderAndWidth(trigger, content2, width);

        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const dropdownContent = screen.getByTestId(DROPDOWN_MENU.TEST_ID.DROPDOWN_CONTENT);

        expect(dropdownContent).toHaveStyle(`width: ${width}; top: auto; left: auto`);
    });

    test(`should have top/left/width autostyles`, async () => {
        const position =
        {
            top: "70px",
            left: "-10px"
        }
        renderDropdownMenuWithProviderAndPosition(trigger, content2, position);

        const triggerButton = screen.getByTestId(TRIGGER_NAMES[0]);
        userEvent.click(triggerButton);
        const dropdownContent = screen.getByTestId(DROPDOWN_MENU.TEST_ID.DROPDOWN_CONTENT);

        expect(dropdownContent).toHaveStyle(`width: auto; top: ${position.top}; left: ${position.left}`);

    });
});
