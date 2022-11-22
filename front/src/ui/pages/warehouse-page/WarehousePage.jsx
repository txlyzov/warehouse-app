import './WarehousePage.scss';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import TableBasic from '../../components/table-basic/TableBasic';
import Input from '../../components/input/Input';
import { resetTableStorage, selectCheckboxesSelected, selectTableData, setGlobalCheckboxState, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import Pagination from '../../components/pagination/Pagination';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ConfirmModal } from '../../components/modal/modal-templates/modal-templates';
import { getCargosBywarehouseId } from '../../../services/CargoService';
import { deleteWarehouseById, getWarehouseById } from '../../../services/WarehouseService';

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

    const columnSettings = [
        { heading: 'Item Id', value: 'id' },
        { heading: 'Name', value: 'name' },
        { heading: 'Value', value: 'quantity' },
    ]

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const changeItemsOnPage = (value) => {
        setItemsOnPage(value)
        setCurrentTablePage(value)
        setDisplayedContent(tableData.slice(0, value))
    }

    const removeItems = () => {
        const itemsToRemove = tableData.filter(item => item.isSelected).map((item, index) => ({ ...item, index }));
        dispatch(setTableData(itemsToRemove));
        routeChange(`/warehouse/${params.warehouseId}/confirm-removing`);
    }

    useEffect(() => {
        dispatch(resetTableStorage());

        const asyncActions = async () => {
            const warehouseRequestResult = await getWarehouseById(params.warehouseId);

            if (warehouseRequestResult.status !== 200) {
                routeChange('/home');
                return
            }

            setWarehouseData(warehouseRequestResult.data)

            const cargoRequestResult = await getCargosBywarehouseId(params.warehouseId);


            if (cargoRequestResult.status !== 200) {
                routeChange('/home');
                return
            }

            const dataArray = []
            cargoRequestResult.data.rows.forEach((element, index) => {
                dataArray.push({ index, data: element, isSelected: false })
            });

            dispatch(setTableData(dataArray.slice(0, 9)));
            setDisplayedContent(dataArray.slice(0, 5))
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
                        onClick={() => { navigator.clipboard.writeText('name') }}
                    >
                        <h2 className='warehouse__name'>
                            Warehouse
                        </h2>
                        <h2 className='warehouse__name'>
                            {warehouseData ? warehouseData.name : "Loading"}
                        </h2>
                    </div>
                    <div className='warehouse__location-block'
                        aria-hidden="true"
                        onClick={() => { navigator.clipboard.writeText('id') }}
                    >
                        <h3 className='warehouse__id'>
                            Location: {warehouseData ? warehouseData.location : "Loading"}
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
                                className="warehouse__delete-selected-button"
                                type="primary"
                                text="Delete selected"
                                size="md"
                                disabled={selectedOptionsValue <= 0}
                            />
                            <Button click={() => {
                                dispatch(
                                    setModalContent(
                                        <ConfirmModal
                                            conformationValue={warehouseData.id}
                                            title="Delete warehouse?"
                                            noteText="Are you sure that you want to delete warehouse? 
                                            Place warehouse id to submit 
                                            (you can copy it by clicking on it)"
                                            action={() => {
                                                deleteWarehouseById(params.warehouseId)
                                                navigate("/home")
                                            }}
                                        />
                                    )
                                )
                            }

                            }
                                className="warehouse__delete-warehouse-button"
                                type="primary"
                                text="Delete warehouse"
                                size="md"
                            />
                        </div>
                        <div className='warehouse__edit-buttons'>
                            <Button click={() => routeChange(`/warehouse/${params.warehouseId}/create-entity`)}
                                className="warehouse__add-cargo-button"
                                type="secondary"
                                text="Add cargo"
                                size="md"
                            />
                            <Button click={() => routeChange(`/update-warehouse/${params.warehouseId}`)}
                                className="warehouse__edit-warehouse-button"
                                type="secondary"
                                text="Edit warehouse"
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
                                    type={itemsOnPage === 5 ? 'primary' : 'secondary'}
                                    size='smd'
                                    text='5'
                                    click={() => changeItemsOnPage(5)}
                                // disabled // should be removed after select counter fix
                                />
                                <Button
                                    className='warehouse__size-button'
                                    type={itemsOnPage === 15 ? 'primary' : 'secondary'}
                                    size='smd'
                                    text='15'
                                    click={() => changeItemsOnPage(15)}
                                // disabled // should be removed after select counter fix
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
                                placeholder="Search by name"
                                width="390px"
                                inputValue={inputSearch}
                                setInputValue={setInputSearch}
                            />
                        </div>
                        {tableData.length > 0 ?
                            <TableBasic
                                action={(element) => routeChange(`${location.pathname}/entity/${element.data.id}`)}
                                className="warehouse__table"
                                data={tableDisplayedContent}
                                column={columnSettings}
                                cellHeight='46px'
                                cellWidth='146px'
                                minRowsOnPage={itemsOnPage}
                            /> :
                            <div className='warehouse__empty-note-block'>
                                <h3 className='warehouse__empty-note'>
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    Warehouse have no registered records for it. You can add some with "Add cargo" option.
                                </h3>
                            </div>}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WarehousePage;
