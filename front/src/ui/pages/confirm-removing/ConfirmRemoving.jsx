import './ConfirmRemoving.scss'
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import TableBasic from '../../components/table-basic/TableBasic';
import { selectCheckboxesSelected, selectTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import Icon from '../../components/icon/Icon';

function ConfirmRemoving() {

    const params = useParams();
    const tableData = useSelector(selectTableData);
    const selectedOptionsValue = useSelector(selectCheckboxesSelected);
    const [inputSearch, setInputSearch] = useState('');
    const [tableDisplayedContent, setDisplayedContent] = useState([]);
    const [isDeleteConfirmUnlocked, setIsDeleteConfirmUnlocked] = useState(false);


    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const columnSettings = [
        { heading: 'Item Id', value: 'id' },
        { heading: 'Name', value: 'name' },
        { heading: 'Value', value: 'username' },
    ]

    useEffect(() => {
        if (tableData.length === 0) {
            routeChange(`/warehouse/${params.warehouseId}`);
        }
    }, []);

    useEffect(() => {
        if (inputSearch.length === 0) {
            setDisplayedContent(tableData);
            return;
        }
        const regex = new RegExp(inputSearch, 'g');
        const searchResults = tableData.filter((element) => element.data.name.match(regex));
        setDisplayedContent(searchResults)
    }, [inputSearch]);

    return (
        <div className='confirm-removing wrapper'>
            <div className="confirm-removing__elements-block">
                <div className='confirm-removing__left-elements'>
                    <div className='confirm-removing__name-block'
                        aria-hidden="true"
                        onClick={() => { navigator.clipboard.writeText('name') }}
                    >
                        <h2 className='confirm-removing__name'>
                            Warehouse
                        </h2>
                        <h2 className='confirm-removing__name'>
                            Name
                        </h2>
                    </div>
                    <Button click={() => routeChange(`/warehouse/${params.warehouseId}`)}
                        className="confirm-removing__cancel-button"
                        type="secondary"
                        text="Cancel"
                        size="md"
                    />
                    <div className='confirm-removing__info-block'>
                        <h3 className='confirm-removing__info-text'>
                            Сheck sheet before deletion.
                            You can unselect some positions here if nessesary.
                            If you agreed with list - confirm by clicking buttons below.
                        </h3>
                    </div>
                    <div className='confirm-removing__delete-buttons-block'>
                        <Button click={() => setIsDeleteConfirmUnlocked(true)}
                            className="confirm-removing__delete-button"
                            type="primary"
                            text={`Delete ${selectedOptionsValue < 999 ? selectedOptionsValue : '999+'} item${selectedOptionsValue === 1 ? '' : 's'}`}
                            size="md"
                        />
                        <Button click={() => console.log('removing items')}
                            className="confirm-removing__confirm-delete-button"
                            type="primary"
                            text={
                                <Icon
                                    name="checkmark"
                                    size="20px"
                                    className="modal__close-icon"
                                />
                            }
                            size="smd"
                            disabled={!isDeleteConfirmUnlocked}
                        />
                    </div>
                </div>

                <div className='confirm-removing__right-elements'>
                    <Input
                        closable
                        className="confirm-removing__table-search"
                        placeholder="Search by name"
                        width="390px"
                        inputValue={inputSearch}
                        setInputValue={setInputSearch}
                    />
                    <TableBasic
                        className="confirm-removing__table"
                        column={columnSettings}
                        data={tableDisplayedContent}
                        cellHeight='46px'
                        cellWidth='146px'
                        starterSelectOption
                    />
                </div>
            </div>
        </div>
    );
}

export default ConfirmRemoving;
