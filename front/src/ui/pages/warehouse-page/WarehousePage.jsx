import './WarehousePage.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';
import TableBasic from '../../components/table-basic/TableBasic';
import Input from '../../components/input/Input';
import Checkbox from '../../components/checkbox/Checkbox';

function WarehousePage() {
    const [inputSearch, setInputSearch] = useState('');
    const [tableContent, setTableContent] = useState([]);
    const [warehouseData, setWarehouseData] = useState([]);

    useEffect(() => {
        axios('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                setWarehouseData(res.data.slice(0, 5));
                setTableContent(res.data.slice(0, 5));
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (inputSearch.length === 0) {
            setTableContent(warehouseData);
            return;
        }
        const regex = new RegExp(inputSearch, 'g');
        const searchResults = warehouseData.filter((element) => element.name.match(regex));
        setTableContent(searchResults);
    }, [inputSearch]);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const columnSettings = [
        { heading: 'Item Id', value: 'id' },
        { heading: 'Name', value: 'id' },
        { heading: 'Value', value: 'id' },
    ]
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
                    {/* <div>
                        <Checkbox />
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default WarehousePage;
