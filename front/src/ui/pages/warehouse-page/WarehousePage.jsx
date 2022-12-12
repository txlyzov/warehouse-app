import './WarehousePage.scss';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import TableBasic from '../../components/table-basic/TableBasic';
import Input from '../../components/input/Input';
import { resetTableStorage, selectCheckboxesSelected, selectTableData, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import Pagination from '../../components/pagination/Pagination';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ConfirmModal } from '../../components/modal/modal-templates/modal-templates';
import { getCargosByWarehouseId } from '../../../services/CargoService';
import { deleteWarehouseById, getWarehouseById } from '../../../services/WarehouseService';
import { PATH_VARIBLES } from '../../../utils/Constants';
import WAREHOUSE_PAGE from './WarehousePage.dictionary';

function WarehousePage() {
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const tableData = useSelector(selectTableData);
    const selectedOptionsValue = useSelector(selectCheckboxesSelected);
    const [warehouseData, setWarehouseData] = useState(null);
    const [tableDisplayedContent, setDisplayedContent] = useState([]);
    const [currentTablePage, setCurrentTablePage] = useState(0);
    const [itemsOnPage, setItemsOnPage] = useState(5);
    const [inputSearch, setInputSearch] = useState('');

    const navigate = useNavigate();
    const routeChange = (route, options = {}) => {
        navigate(route, options);
    };

    const changeItemsOnPage = (value) => {
        setItemsOnPage(value)
        setCurrentTablePage(value)
        setDisplayedContent(tableData.slice(0, value))
    }

    const removeItems = () => {
        const itemsToRemove = tableData.filter(item => item.isSelected).map((item, index) => ({ ...item, index }));
        routeChange(
            `${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}${PATH_VARIBLES.CONFIRM_REMOVING}`,
            {
                state: {
                    selectedOptionsValue: itemsToRemove,
                    warehouseData,
                }
            }
        );
    }

    useEffect(() => {
        dispatch(resetTableStorage());

        const asyncActions = async () => {
            const warehouseRequestResult = await getWarehouseById(params[PATH_VARIBLES.WAREHOUSE_ID]);

            if (warehouseRequestResult.status !== StatusCodes.OK) {
                routeChange(PATH_VARIBLES.HOME);
                return
            }

            setWarehouseData(warehouseRequestResult.data)

            const cargoRequestResult = await getCargosByWarehouseId(params[PATH_VARIBLES.WAREHOUSE_ID]);


            if (cargoRequestResult.status !== StatusCodes.OK) {
                routeChange(PATH_VARIBLES.HOME);
                return
            }

            const dataArray = []
            cargoRequestResult.data.rows.forEach((element, index) => {
                dataArray.push({ index, data: element, isSelected: false })
            });

            dispatch(setTableData(dataArray));
            setDisplayedContent(dataArray.slice(0, WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_1))
        }

        asyncActions();
    }, []);

    useEffect(() => {
        setCurrentTablePage(0)
        if (inputSearch.length === 0) {
            setDisplayedContent(tableData.slice(0, itemsOnPage));
            return;
        }
        const regex = new RegExp(inputSearch, 'g');
        const searchResults = tableData.filter((element) => element.data.name.match(regex));
        setDisplayedContent(searchResults)
    }, [inputSearch]);

    return (
        <div className="warehouse wrapper">
            <div className="warehouse__elements-block">
                <div className="warehouse__top-elements">
                    <div className='warehouse__name-block'
                        aria-hidden="true"
                        onClick={() => { navigator.clipboard.writeText(warehouseData.name || null) }}
                    >
                        <h2 className='warehouse__name'>
                            Warehouse
                        </h2>
                        <h2 className='warehouse__name'>
                            {warehouseData ? warehouseData.name : WAREHOUSE_PAGE.TEXTS.LOADING}
                        </h2>
                    </div>
                    <div className='warehouse__location-block'>
                        <h3 className='warehouse__id'>
                            Location: {warehouseData ? warehouseData.location : WAREHOUSE_PAGE.TEXTS.LOADING}
                        </h3>
                    </div>
                    <div className='warehouse__items-counter-block'>
                        <h3 className='warehouse__items-counter'>
                            Total elements: {tableData.length}
                        </h3>
                    </div>
                </div>
                <div className="warehouse__center-elements">
                    <div className='warehouse__options-buttons-block'>
                        <div className='warehouse__delete-buttons'>
                            <Button click={() => removeItems()}
                                data-testid={WAREHOUSE_PAGE.BUTTON.DELETE_CARGO.TEST_ID}
                                text={WAREHOUSE_PAGE.BUTTON.DELETE_CARGO.TEXT}
                                className="warehouse__delete-selected-button"
                                type="primary"
                                size="md"
                                disabled={selectedOptionsValue <= 0}
                            />
                            <Button
                                data-testid={WAREHOUSE_PAGE.BUTTON.DELETE_WAREHOUSE.TEST_ID}
                                text={WAREHOUSE_PAGE.BUTTON.DELETE_WAREHOUSE.TEXT}
                                click={() => {
                                    dispatch(
                                        setModalContent(
                                            <ConfirmModal
                                                conformationValue={warehouseData.id}
                                                title={WAREHOUSE_PAGE.MODAL.TITLE_CONFIRM_DELETE}
                                                noteText={WAREHOUSE_PAGE.MODAL.TEXT_CONFIRM_DELETE}
                                                action={() => {
                                                    deleteWarehouseById(params[PATH_VARIBLES.WAREHOUSE_ID])
                                                    navigate(PATH_VARIBLES.HOME)
                                                }}
                                            />
                                        )
                                    )
                                }
                                }
                                className="warehouse__delete-warehouse-button"
                                type="primary"
                                size="md"
                            />
                        </div>
                        <div className='warehouse__edit-buttons'>
                            <Button
                                data-testid={WAREHOUSE_PAGE.BUTTON.ADD_CARGO.TEST_ID}
                                text={WAREHOUSE_PAGE.BUTTON.ADD_CARGO.TEXT}
                                click={() => routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}${PATH_VARIBLES.CREATE_ENTITY}`)}
                                className="warehouse__add-cargo-button"
                                type="secondary"
                                size="md"
                            />
                            <Button
                                data-testid={WAREHOUSE_PAGE.BUTTON.EDIT_WAREHOUSE.TEST_ID}
                                text={WAREHOUSE_PAGE.BUTTON.EDIT_WAREHOUSE.TEXT}
                                click={() => routeChange(`${PATH_VARIBLES.UPDATE_WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)}
                                className="warehouse__edit-warehouse-button"
                                type="secondary"
                                size="md"
                            />
                        </div>

                        <Pagination
                            inputCurrentPage={currentTablePage + 1}
                            totalPages={Math.ceil(tableData.length / itemsOnPage)}
                            className="warehouse__pagination"
                            size="lg"
                            outputCurrentPage={(pageNumber) => {
                                setCurrentTablePage(pageNumber - 1)
                                setDisplayedContent(tableData.slice(
                                    (pageNumber - 1) * itemsOnPage,
                                    (pageNumber) * itemsOnPage
                                ))
                            }}
                        />
                    </div>
                    <div className='warehouse__table-block'>
                        <div className='warehouse__table-options'>
                            <div className='warehouse__table-sizes'>
                                <Button
                                    className='warehouse__size-button'
                                    type={itemsOnPage === WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_1 ? 'primary' : 'secondary'}
                                    size='smd'
                                    text={WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_1}
                                    click={() => changeItemsOnPage(WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_1)}
                                />
                                <Button
                                    className='warehouse__size-button'
                                    type={itemsOnPage === WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_2 ? 'primary' : 'secondary'}
                                    size='smd'
                                    text={WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_2}
                                    click={() => changeItemsOnPage(WAREHOUSE_PAGE.TABLE.ITEMS_ON_PAGE_2)}
                                />
                                <Button
                                    className='warehouse__size-button'
                                    type={itemsOnPage === tableData.length
                                        ? 'primary' : 'secondary'}
                                    size='smd'
                                    text='all'
                                    click={() => changeItemsOnPage(tableData.length)}
                                />
                            </div>
                            <Input
                                closable
                                className="warehouse__table-search"
                                placeholder={WAREHOUSE_PAGE.INPUT.SEARCH.PLACEHOLDER}
                                width="390px"
                                inputValue={inputSearch}
                                setInputValue={setInputSearch}
                            />
                        </div>
                        {tableData.length > 0 ?
                            <TableBasic
                                action={(element) => routeChange(`${location.pathname}${PATH_VARIBLES.ENTITY}${element.data.id}`)}
                                className="warehouse__table"
                                data={tableDisplayedContent}
                                column={WAREHOUSE_PAGE.TABLE.COLUMN_SETTINGS}
                                cellHeight='46px'
                                cellWidth='146px'
                                minRowsOnPage={itemsOnPage}
                            /> :
                            <div className='warehouse__empty-note-block'>
                                <h3 className='warehouse__empty-note'>
                                    {WAREHOUSE_PAGE.TEXTS.EMPTY_TABLE}
                                </h3>
                            </div>}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WarehousePage;
