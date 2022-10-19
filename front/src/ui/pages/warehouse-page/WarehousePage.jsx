import './WarehousePage.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import TableBasic from '../../components/table-basic/TableBasic';
import Input from '../../components/input/Input';
import Checkbox from '../../components/checkbox/Checkbox';
import { selectTableContent, setTableContentRedux } from '../../../redux-store/basic-table/BasicTableSlise';

function WarehousePage() {
    const [inputSearch, setInputSearch] = useState('');
    // const [tableContent, setTableContent] = useState([]);
    // const [warehouseData, setWarehouseData] = useState([]);
    const [tableContent, setTableContent] = useState([{ index: 0, data: {}, isSelected: false }]);
    const [warehouseData, setWarehouseData] = useState([{ index: 0, data: {}, isSelected: false }]);
    // const [tableContent, setTableContent] = useState({ data: [], selected: [] });
    // const [warehouseData, setWarehouseData] = useState({ data: [], selected: [] });

    const dispatch = useDispatch();
    const reduxTableContent = useSelector(selectTableContent);

    const columnSettings = [
        { heading: 'Item Id', value: 'id' },
        { heading: 'Name', value: 'id' },
        { heading: 'Value', value: 'id' },
    ]

    async function request() {
        axios('https://jsonplaceholder.typicode.com/users')
            .then((res) => res)
            .catch((err) => err);
    }

    useEffect(() => {
        const fetchData = async () => axios('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                const dataArray = []
                res.data.slice(0, 5).forEach((element, index) => {
                    dataArray.push({ index, data: element, isSelected: false })
                });
                console.log(dataArray);
                dispatch(setTableContentRedux(dataArray));
                console.log(333);
                setWarehouseData(dataArray);
                setTableContent(dataArray);
            })
            .catch((err) => err)

        fetchData();


        // axios('https://jsonplaceholder.typicode.com/users')
        //     .then((res) => {
        //         // setWarehouseData(res.data.slice(0, 5));
        //         // setTableContent(res.data.slice(0, 5));
        //         const dataArray = []
        //         res.data.slice(0, 5).forEach((element, index) => {
        //             dataArray.push({ index, data: element, isSelected: false })
        //         });
        //         console.log(dataArray);
        //         setWarehouseData(dataArray);
        //         setTableContent(dataArray);

        //         // setWarehouseData({ data: res.data.slice(0, 5), selected: [] });
        //         // setTableContent({ data: res.data.slice(0, 5), selected: [] });
        //     })
        //     .catch((err) => console.log(err));
    }, []);

    // useEffect(() => {
    //     if (inputSearch.length === 0) {
    //         setTableContent(warehouseData);
    //         return;
    //     }
    //     const regex = new RegExp(inputSearch, 'g');
    //     const searchResults = warehouseData.filter((element) => element.data.name.match(regex));
    //     setTableContent(searchResults);
    // }, [inputSearch]);

    // useEffect(() => {
    //     if (inputSearch.length === 0) {
    //         setTableContent(reduxTableContent);
    //         return;
    //     }
    //     const regex = new RegExp(inputSearch, 'g');
    //     const searchResults = reduxTableContent.filter((element) => element.data.name.match(regex));
    //     setTableContent(searchResults);
    // }, [inputSearch, reduxTableContent]);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    return (
        <div className="warehouse wrapper">
            <div className="warehouse__elements-block">
                <div className="warehouse__top-elements">
                    <div className='warehouse__name-block'>
                        <h2 className='warehouse__name'>
                            Warehouse
                        </h2>
                        <h2 className='warehouse__name'>
                            Name
                        </h2>
                    </div>
                    <div className='warehouse__id-block'>
                        <h3 className='warehouse__id'>
                            ID: [value]
                        </h3>
                    </div>
                    <div className='warehouse__items-counter-block'>
                        <h3 className='warehouse__items-counter'>
                            Total cargo: [value]
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
                            <Button click={() => routeChange('/create-warehouse')}
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
                    </div>
                    <div className='warehouse__table-block'>
                        <Input
                            closable
                            className="warehouse__input-search"
                            placeholder="Search by name"
                            width="390px"
                            inputValue={inputSearch}
                            setInputValue={setInputSearch}
                        />
                        <TableBasic
                            action={(element) => routeChange(`/warehouse/${element.id}`)}
                            className="warehouse__table"
                            data={tableContent}
                            column={columnSettings}
                            cellHeight='50px'
                            cellWidth='150px'
                        />
                    </div>
                </div>
                <div className="warehouse__bottom-elements">
                    <div className="warehouse__pagination-element">
                        <h3 className="warehouse__pagination">
                            Active slots:
                            {' '}
                            {warehouseData.length}
                            {' '}
                            / 20
                        </h3>
                    </div>
                    <div>
                        <button type="button" onClick={() => console.log(reduxTableContent)}>sdfdf</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WarehousePage;
