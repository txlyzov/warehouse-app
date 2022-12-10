import './ConfirmRemoving.scss'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import TableBasic from '../../components/table-basic/TableBasic';
import { selectCheckboxesSelected, selectTableData, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import Icon from '../../components/icon/Icon';
import { deleteCargoGroup } from '../../../services/CargoService';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ErrorModal, NoteModal } from '../../components/modal/modal-templates/modal-templates';
import CONFIRM_REMOVING from './ConfirmRemoving.dictionary';
import { PATH_VARIBLES } from '../../../utils/Constants';

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
        { heading: CONFIRM_REMOVING.TABLE[0].CELL_HEADER, value: CONFIRM_REMOVING.TABLE[0].VALUE_KEY },
        { heading: CONFIRM_REMOVING.TABLE[1].CELL_HEADER, value: CONFIRM_REMOVING.TABLE[1].VALUE_KEY },
        { heading: CONFIRM_REMOVING.TABLE[2].CELL_HEADER, value: CONFIRM_REMOVING.TABLE[2].VALUE_KEY },
    ]

    const errorCase = (title = CONFIRM_REMOVING.MODAL.TITLE_ERROR, errorText = CONFIRM_REMOVING.MODAL.TEXT_ERROR) => {
        dispatch(
            setModalContent(
                <ErrorModal
                    title={title}
                    errorText={errorText}
                />
            )
        )
        routeChange(PATH_VARIBLES.HOME);
    }

    const deleteFunction = async () => {
        const cargoRequestResult = await deleteCargoGroup(
            params[PATH_VARIBLES.WAREHOUSE_ID],
            tableData.filter((element) => element.isSelected === true).map((element) => element.data.id),
        );

        if (cargoRequestResult.status !== StatusCodes.OK) {
            errorCase();

            return
        }

        dispatch(
            setModalContent(
                <NoteModal
                    title={CONFIRM_REMOVING.MODAL.TITLE_NOTE}
                    noteText={CONFIRM_REMOVING.MODAL.TEXT_NOTE} />
            )
        )

        routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)
    }

    useEffect(() => {
        if (!state) {
            routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`);

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
                    <div className='confirm-removing__name-block'>
                        <h2 className='confirm-removing__name'>
                            {CONFIRM_REMOVING.TEXTS.WAREHOUSE_TITLE}
                        </h2>
                        <h2 className='confirm-removing__name'>
                            {state.warehouseData.name || 'Loading..'}
                        </h2>
                    </div>
                    <Button click={() => routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)}
                        data-testid={CONFIRM_REMOVING.BUTTON.CANCEL.TEST_ID}
                        text={CONFIRM_REMOVING.BUTTON.CANCEL.TEXT}
                        className="confirm-removing__cancel-button"
                        type="secondary"
                        size="md"
                    />
                    <div className='confirm-removing__info-block'>
                        <h3 className='confirm-removing__info-text'>
                            {CONFIRM_REMOVING.TEXTS.INFO_TEXT}
                        </h3>
                    </div>
                    <div className='confirm-removing__delete-buttons-block'>
                        <Button click={() => setIsDeleteConfirmUnlocked(true)}
                            data-testid={CONFIRM_REMOVING.BUTTON.DELETE.TEST_ID}
                            text={`Delete ${selectedOptionsValue < 999 ? selectedOptionsValue : '999+'} item${selectedOptionsValue === 1 ? '' : 's'}`}
                            className="confirm-removing__delete-button"
                            type="primary"
                            size="md"
                            disabled={selectedOptionsValue < 1}
                        />
                        <Button click={() => deleteFunction()}
                            data-testid={CONFIRM_REMOVING.BUTTON.DELETE.TEST_ID}
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
                        data-testid={CONFIRM_REMOVING.INPUT.SEARCH.TEST_ID}
                        placeholder={CONFIRM_REMOVING.INPUT.SEARCH.PLACEHOLDER}
                        closable
                        className="confirm-removing__table-search"
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
