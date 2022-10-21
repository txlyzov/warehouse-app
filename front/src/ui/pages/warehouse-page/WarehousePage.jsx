import './WarehousePage.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import TableBasic from '../../components/table-basic/TableBasic';
import Input from '../../components/input/Input';
import { selectCheckboxesSelected, selectTableData, setGlobalCheckboxState, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import Pagination from '../../components/pagination/Pagination';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';

function WarehousePage() {
    const location = useLocation();
    const params = useParams();

    const dispatch = useDispatch();
    const tableData = useSelector(selectTableData);
    const selectedOptionsValue = useSelector(selectCheckboxesSelected);

    const [tableDisplayedContent, setDisplayedContent] = useState([]);
    const [currentTablePage, setCurrentTablePage] = useState(0);
    const [itemsOnPage, setItemsOnPage] = useState(5);
    const [inputSearch, setInputSearch] = useState('');

    // const qwe = useSelector(selectModalTitle)


    const columnSettings = [
        { heading: 'Item Id', value: 'id' },
        { heading: 'Name', value: 'name' },
        { heading: 'Value', value: 'username' },
    ]

    useEffect(() => {
        if (selectedOptionsValue === tableData.length) {
            dispatch(setGlobalCheckboxState(true))
        }
        if (selectedOptionsValue === 0) {
            dispatch(setGlobalCheckboxState(false))
        }
    }, [selectedOptionsValue]);

    useEffect(() => {
        const fetchData = async () => axios('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                const dataArray = []
                res.data.forEach((element, index) => {
                    dataArray.push({ index, data: element, isSelected: false })
                });
                dispatch(setTableData(dataArray.slice(0, 9)));
                setDisplayedContent(dataArray.slice(0, 5))
            })
            .catch((err) => err)

        fetchData();
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

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const changeItemsOnPage = (value) => {
        setItemsOnPage(value)
        setCurrentTablePage(value)
        setDisplayedContent(tableData.slice(0, value))
    }

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
                            Name
                        </h2>
                    </div>
                    <div className='warehouse__id-block'
                        aria-hidden="true"
                        onClick={() => { navigator.clipboard.writeText('id') }}
                    >
                        <h3 className='warehouse__id'>
                            ID: {params.warehouseId}
                        </h3>
                    </div>
                    <div className='warehouse__items-counter-block'>
                        <h3 className='warehouse__items-counter'>
                            Selected positions: {selectedOptionsValue}/{tableData.length}
                        </h3>
                    </div>
                </div>
                <div className="warehouse__center-elements">
                    <div className='warehouse__options-buttons-block'>
                        <div className='warehouse__delete-buttons'>
                            <Button click={() => routeChange('/create-warehouse')}
                                className="warehouse__delete-selected-button"
                                type="primary"
                                text="Delete selected"
                                size="md"
                            />
                            <Button click={() => dispatch(
                                setModalContent(<img
                                    src="https://media.discordapp.net/attachments/609515090609438755/1022218378317930587/unknown.png"
                                    alt="img"
                                />))
                            }
                                className="warehouse__delete-warehouse-button"
                                type="primary"
                                text="Delete warehouse"
                                size="md"
                            />
                        </div>
                        <div className='warehouse__edit-buttons'>
                            <Button click={() => routeChange('/create-warehouse')}
                                className="warehouse__add-cargo-button"
                                type="secondary"
                                text="Add cargo"
                                size="md"
                            />
                            <Button click={() => routeChange('/create-warehouse')}
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
                                />
                                <Button
                                    className='warehouse__size-button'
                                    type={itemsOnPage === 15 ? 'primary' : 'secondary'}
                                    size='smd'
                                    text='15'
                                    click={() => changeItemsOnPage(15)}
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
                        <TableBasic
                            action={(element) => routeChange(`${location.pathname}/item/${element.data.id}`)}
                            className="warehouse__table"
                            data={tableDisplayedContent}
                            column={columnSettings}
                            cellHeight='46px'
                            cellWidth='146px'
                            minRowsOnPage={itemsOnPage}
                        />
                    </div>
                    {/* <button type='button' onClick={() => console.log(qwe)}>sd</button> */}
                </div>
            </div>
        </div >
    );
}

export default WarehousePage;
