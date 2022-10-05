import './HomePage.scss'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Button from "../../components/button/Button";
import TableCompact from '../../components/table-compact/TableCompact';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';

function HomePage() {
    const [inputSearch, setInputSearch] = useState('');
    const [tableContent, setTableContent] = useState([]);
    const [warehouseData, setWarehouseData] = useState([]);

    useEffect(() => {
        axios('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setWarehouseData(res.data);
                setTableContent(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (inputSearch.length === 0) {
            setTableContent(warehouseData)
            return
        }
        const regex = new RegExp(inputSearch, 'g');
        let searchResults = warehouseData.filter((element) => element.name.match(regex));
        setTableContent(searchResults)
    }, [inputSearch]);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    }

    const tableSettings = { header: 'Warehouses', value: ['name', 'id'], columns: 4, rows: 5 }

    return (
        <div className='home wrapper'>
            <div className='home__elements-block'>
                <div className='home__top-elements'>
                    <Button click={() => routeChange('/create-warehouse')} className={'home__add-warehouse-button'} type={'secondary'} text={'Add warehouse'} size={'md'} />
                    <Input
                        closable={true}
                        className="home__input-search"
                        placeholder="Search by name"
                        width="390px"
                        inputValue={inputSearch}
                        setInputValue={setInputSearch}
                    />
                </div>
                <div className='home__center-elements'>
                    <TableCompact content={tableContent} tableSettings={tableSettings} cellHeight='71px' cellWidth='200px' action={(element) => routeChange(`/warehouse/${element.id}`)} />
                </div>
                <div className='home__bottom-elements'>
                    <div className='home__counter'>
                        <h3 className='home__counter-text'>Active slots: {warehouseData.length} / 20</h3>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default HomePage;
