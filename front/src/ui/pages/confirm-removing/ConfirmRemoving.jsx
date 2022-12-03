import './ConfirmRemoving.scss'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import TableBasic from '../../components/table-basic/TableBasic';
import { selectCheckboxesSelected, selectTableData, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import Icon from '../../components/icon/Icon';
import { deleteCargoGroup } from '../../../services/CargoService';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ErrorModal, NoteModal } from '../../components/modal/modal-templates/modal-templates';

function ConfirmRemoving() {
    const dispatch = useDispatch();
    const params = useParams();
    const { state } = useLocation();
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
        { heading: 'Value', value: 'quantity' },
    ]

    const errorCase = (title = "Request error", errorText = "Something happend with request. Please,relogin.") => {
        dispatch(
            setModalContent(
                <ErrorModal
                    title={title}
                    errorText={errorText}
                />
            )
        )
        routeChange('/home');
    }

    const deleteFunction = async () => {
        const cargoRequestResult = await deleteCargoGroup(
            params.warehouseId,
            tableData.filter((element) => element.isSelected === true).map((element) => element.data.id),
        );

        if (cargoRequestResult.status !== 200) {
            errorCase();
            return
        }

        dispatch(
            setModalContent(
                <NoteModal
                    title='Delete cargo data'
                    noteText='Data deleted' />
            )
        )

        routeChange(`/warehouse/${params.warehouseId}`)
    }

    useEffect(() => {
        if (!state) {
            routeChange(`/warehouse/${params.warehouseId}`);
            return
        }
        dispatch(setTableData(state.selectedOptionsValue));
    }, []);

    useEffect(() => {
        if (state && inputSearch.length === 0) {
            setDisplayedContent(state.selectedOptionsValue);
            return;
        }
        const regex = new RegExp(inputSearch, 'g');
        const searchResults = tableData.filter((element) => element.data.name.match(regex));
        setDisplayedContent(searchResults)
    }, [inputSearch]);

    useEffect(() => {
        setIsDeleteConfirmUnlocked(false);
    }, [selectedOptionsValue]);

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
                            disabled={selectedOptionsValue < 1}
                        />
                        <Button click={() => deleteFunction()}
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
                    {state ?
                        <TableBasic
                            className="confirm-removing__table"
                            column={columnSettings}
                            data={tableDisplayedContent}
                            cellHeight='46px'
                            cellWidth='146px'
                            starterSelectOption
                        />
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ConfirmRemoving;
