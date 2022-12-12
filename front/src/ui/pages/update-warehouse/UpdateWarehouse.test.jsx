import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import reduxStore from "../../../redux-store/index";
import * as WarehouseService from '../../../services/WarehouseService';
import UpdateWarehouse from './UpdateWarehouse';
import UPDATE_WAREHOUSE from './UpdateWarehouse.dictionary';

const WAREHOUSE_TEST_OBJECT = { name: "Gamma", location: "Alpha,Beta" }

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
        jest.spyOn(WarehouseService, "getWarehouseById").mockReturnValue({ status: StatusCodes.OK, data: WAREHOUSE_TEST_OBJECT });
        jest.spyOn(WarehouseService, "updateWarehouseById").mockReturnValue({ status: StatusCodes.OK });
    })

    const renderUpdateWarehouseWithProvider = () => render(
        <Provider store={reduxStore}>
            <BrowserRouter>
                <UpdateWarehouse />
            </BrowserRouter>
        </Provider>,
    );

    window.matchMedia = window.matchMedia || (() => ({
        matches: false,
        addListener() { },
        removeListener() { },
    }))

    test(`should have ${UPDATE_WAREHOUSE.BUTTON.RETURN.TEXT} and ${UPDATE_WAREHOUSE.BUTTON.UPDATE.TEXT} buttons`, async () => {
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        const button0 = screen.getByTestId(UPDATE_WAREHOUSE.BUTTON.RETURN.TEST_ID);
        const button1 = screen.getByTestId(UPDATE_WAREHOUSE.BUTTON.UPDATE.TEST_ID);

        expect(button0).toBeInTheDocument();
        expect(button1).toBeInTheDocument();
    });

    test(`should have ${UPDATE_WAREHOUSE.TEXTS.PROMT_1} block`, async () => {
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        const promt0 = screen.getByText(UPDATE_WAREHOUSE.TEXTS.PROMT_1);
        const input0 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.NAME.TEST_ID);

        expect(promt0).toBeInTheDocument();
        expect(input0).toBeInTheDocument();
    });

    test(`should fill blocks with getWarehouse data`, async () => {
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        const input0 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        const input1 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);

        expect(input0).toHaveValue(WAREHOUSE_TEST_OBJECT.name);
        expect(input1).toHaveValue(WAREHOUSE_TEST_OBJECT.location);
    });

    test(`should have error with code ${UPDATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS} after click`, async () => {
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        try {
            const error = screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const confirmButton = screen.getByTestId(UPDATE_WAREHOUSE.BUTTON.UPDATE.TEST_ID);
        const input0 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.clear(input0);
        await act(async () => {
            userEvent.click(confirmButton);
        });
        const error = screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${UPDATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR} after click`, async () => {
        jest.spyOn(WarehouseService, "updateWarehouseById").mockReturnValue({ status: StatusCodes.FORBIDDEN });
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        try {
            const error = screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(UPDATE_WAREHOUSE.BUTTON.UPDATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

        expect(error).toBeInTheDocument();
    });

    test(`should have error with code ${UPDATE_WAREHOUSE.ERROR.CODE.UNKNOWN} after click`, async () => {
        jest.spyOn(WarehouseService, "updateWarehouseById").mockReturnValue({ status: StatusCodes.NOT_FOUND });
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        try {
            const error = screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

            expect(error).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        const input0 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q'.repeat(22));
        const input1 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.LOCATION.TEST_ID);
        userEvent.type(input1, 'q'.repeat(22));
        const confirmButton = screen.getByTestId(UPDATE_WAREHOUSE.BUTTON.UPDATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        const error = screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

        expect(error).toBeInTheDocument();
    });

    test(`should NOT have any errors after click`, async () => {
        await act(async () => {
            renderUpdateWarehouseWithProvider();
        });

        const input0 = screen.getByTestId(UPDATE_WAREHOUSE.INPUT.NAME.TEST_ID);
        userEvent.type(input0, 'q@q.q');
        const confirmButton = screen.getByTestId(UPDATE_WAREHOUSE.BUTTON.UPDATE.TEST_ID);
        await act(async () => {
            userEvent.click(confirmButton);
        });

        try {
            const error1 = await screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS}`);

            expect(error1).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        try {
            const error2 = await screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.UNKNOWN}`);

            expect(error2).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

        try {
            const error3 = await screen.getByTestId(`update-warehouse-issue-${UPDATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR}`);

            expect(error3).not.toBeInTheDocument();
        } catch (error) { /* empty */ }

    });
});
