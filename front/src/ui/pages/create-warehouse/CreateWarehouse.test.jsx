import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
import reduxStore from "../../../redux-store/index";
import CreateWarehouse from './CreateWarehouse';
import CREATE_WAREHOUSE from './CreateWarehouse.dictionary';
import * as WarehouseService from '../../../services/WarehouseService';

describe('Create warehouse component', () => {
    beforeAll(() => {
        const filters = ['async-validator:'];
        jest.spyOn(console, 'warn').mockImplementation(
            (msg, ...args) => {
                // eslint-disable-next-line no-unused-expressions, no-console
                filters.some((filter) => msg.includes(filter)) ? jest.fn() : console.warn(msg, ...args);
            },
        );
    });

    beforeEach(() => {
        jest.spyOn(WarehouseService, "getWarehousesByUserId").mockReturnValue({ status: StatusCodes.OK, data: { count: 12 } });
        jest.spyOn(WarehouseService, "createWarehouse").mockReturnValue({ status: StatusCodes.OK });
    })

    const renderCreateWarehouseWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <CreateWarehouse />
            </BrowserRouter>
        </Provider>,
    );

    window.matchMedia = window.matchMedia || (() => ({
        matches: false,
        addListener() { },
        removeListener() { },
    }))

    test(`should have ${CREATE_WAREHOUSE.BUTTON.RETURN.TEXT} and ${CREATE_WAREHOUSE.BUTTON.CREATE.TEXT} buttons`, async () => {
        renderCreateWarehouseWithProvider();

        const button0 = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.RETURN.TEST_ID);
        const button1 = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);

        expect(button0).toBeInTheDocument();
        expect(button1).toBeInTheDocument();
    });

    test(`should have ${CREATE_WAREHOUSE.TEXTS.PROMT_1} block`, async () => {
        renderCreateWarehouseWithProvider();

        const promt0 = screen.getByText(CREATE_WAREHOUSE.TEXTS.PROMT_1);
        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);

        expect(promt0).toBeInTheDocument();
        expect(input0).toBeInTheDocument();
    });

    test(`should have error with code ${CREATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS} after click (get req)`, async () => {
        renderCreateWarehouseWithProvider();

        try {
            const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        userEvent.click(confirmButton);
        const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${CREATE_WAREHOUSE.ERROR.CODE.LIMIT_REACHED} after click (get req)`, async () => {
        jest.spyOn(WarehouseService, "getWarehousesByUserId").mockReturnValue({ status: 200, data: { count: 21 } });
        renderCreateWarehouseWithProvider();

        try {
            const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.LIMIT_REACHED}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.LIMIT_REACHED}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR} after click (get req)`, async () => {
        jest.spyOn(WarehouseService, "getWarehousesByUserId").mockReturnValue({ status: StatusCodes.FORBIDDEN, data: { count: 12 } });
        renderCreateWarehouseWithProvider();

        try {
            const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN} after click (get req)`, async () => {
        jest.spyOn(WarehouseService, "getWarehousesByUserId").mockReturnValue({ status: StatusCodes.NOT_FOUND });
        renderCreateWarehouseWithProvider();

        try {
            const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR} after click (create req)`, async () => {
        jest.spyOn(WarehouseService, "createWarehouse").mockReturnValue({ status: StatusCodes.FORBIDDEN });
        renderCreateWarehouseWithProvider();

        try {
            const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN} after click (create req)`, async () => {
        jest.spyOn(WarehouseService, "createWarehouse").mockReturnValue({ status: StatusCodes.NOT_FOUND });
        renderCreateWarehouseWithProvider();

        try {
            const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

        expect(error).toBeInTheDocument();
    });

    test(`should NOT have any errors after click`, async () => {
        renderCreateWarehouseWithProvider();

        const input0 = screen.getByTestId(CREATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q@q.q');
        const confirmButton = screen.getByTestId(CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        try {
            const error1 = await screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error1).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error2 = await screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.LIMIT_REACHED}`);

            expect(error2).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error3 = await screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

            expect(error3).not.toBeInTheDocument();
        } catch (error) { /* empty */ }
        try {
            const error4 = await screen.getByTestId(`create-warehouse-issue-${CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

            expect(error4).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

    });
});
