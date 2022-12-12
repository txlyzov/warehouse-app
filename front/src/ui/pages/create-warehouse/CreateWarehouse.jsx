import './CreateWarehouse.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { createWarehouse, getWarehousesByUserId } from '../../../services/WarehouseService';
import CREATE_WAREHOUSE from './CreateWarehouse.dictionary';
import { PATH_VARIBLES } from '../../../utils/Constants';

function CreateWarehouse() {
    const [issueCode, setIssueCode] = useState(CREATE_WAREHOUSE.ERROR.CODE.OK);
    const [inputName, setInputName] = useState('');
    const [inputNameIssue, setInputNameIssue] = useState(false);
    const [inputLocation, setInputLocation] = useState('');
    const [inputLocationIssue, setInputLocationIssue] = useState(false);
    const [inputCollaborators, setInputCollaborators] = useState('');
    const [inputCollaboratorsIssue, setInputCollaboratorsIssue] = useState(false);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const resetInputsErrors = () => {
        setInputNameIssue(false);
        setInputLocationIssue(false);
        setInputCollaboratorsIssue(false);
    };

    const submitFunction = async () => {
        let issue = CREATE_WAREHOUSE.ERROR.CODE.OK;
        resetInputsErrors();

        if (!inputName) {
            setInputNameIssue(true);
            issue = CREATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS;
        }

        if (!inputLocation) {
            setInputLocationIssue(true);
            issue = CREATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS;
        }

        setIssueCode(issue);

        if (issue !== CREATE_WAREHOUSE.ERROR.CODE.OK) {
            return;
        }

        const requestCountResult = await getWarehousesByUserId();
        if (requestCountResult.status === StatusCodes.FORBIDDEN) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR);
            return;
        }

        if (requestCountResult.status !== StatusCodes.OK) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN);

            return;
        }

        if (requestCountResult.data.count >= 20) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.LIMIT_REACHED);
            return;
        }

        const requestCreateResult = await createWarehouse(inputName, inputLocation);

        if (requestCreateResult.status === StatusCodes.FORBIDDEN) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR);
            return;
        }

        if (requestCreateResult.status !== StatusCodes.OK) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN);
            return;
        }

        routeChange(PATH_VARIBLES.HOME);
    };

    return (
        <div className="create-warehouse wrapper">
            <div className="create-warehouse__form">
                <h2 className="create-warehouse__header">{CREATE_WAREHOUSE.TEXTS.MAIN_TITLE}</h2>
                <hr className="create-warehouse__separator" />
                <h3 className="create-warehouse__prompt">{CREATE_WAREHOUSE.TEXTS.PROMT_1}</h3>
                <Input
                    data-testid={CREATE_WAREHOUSE.INPUT.NAME.TEST_ID}
                    placeholder={CREATE_WAREHOUSE.INPUT.NAME.PLACEHOLDER}
                    issue={inputNameIssue}
                    closable
                    className="create-warehouse__input-name"
                    width="390px"
                    inputValue={inputName}
                    setInputValue={setInputName}
                />
                <h3 className="create-warehouse__prompt">{CREATE_WAREHOUSE.TEXTS.PROMT_2}</h3>
                <Input
                    data-testid={CREATE_WAREHOUSE.INPUT.LOCATION.TEST_ID}
                    placeholder={CREATE_WAREHOUSE.INPUT.LOCATION.PLACEHOLDER}
                    issue={inputLocationIssue}
                    closable
                    className="create-warehouse__input-location"
                    width="390px"
                    inputValue={inputLocation}
                    setInputValue={setInputLocation}
                />
                <h3 className="create-warehouse__prompt">{CREATE_WAREHOUSE.TEXTS.PROMT_3}</h3>
                <Input
                    data-testid={CREATE_WAREHOUSE.INPUT.DISABLED.TEST_ID}
                    placeholder={CREATE_WAREHOUSE.INPUT.DISABLED.PLACEHOLDER}
                    type="email"
                    issue={inputCollaboratorsIssue}
                    closable
                    disabled
                    className="create-warehouse__input-email"
                    width="390px"
                    inputValue={inputCollaborators}
                    setInputValue={setInputCollaborators}
                />
                {issueCode !== CREATE_WAREHOUSE.ERROR.CODE.OK
                    ? CREATE_WAREHOUSE.ERROR.CONTENT[issueCode]
                    : ''}
                <div className='create-warehouse__buttons-block'>
                    <Button
                        data-testid={CREATE_WAREHOUSE.BUTTON.RETURN.TEST_ID}
                        text={CREATE_WAREHOUSE.BUTTON.RETURN.TEXT}
                        click={() => routeChange(PATH_VARIBLES.HOME)}
                        className={`create-warehouse__return-button ${issueCode !== CREATE_WAREHOUSE.ERROR.CODE.OK ? '' : 'create-warehouse__correct'}`}
                        type="secondary"
                        size="md"
                    />
                    <Button
                        data-testid={CREATE_WAREHOUSE.BUTTON.CREATE.TEST_ID}
                        text={CREATE_WAREHOUSE.BUTTON.CREATE.TEXT}
                        click={() => submitFunction()}
                        className={`create-warehouse__submit-button ${issueCode !== CREATE_WAREHOUSE.ERROR.CODE.OK ? '' : 'create-warehouse__correct'}`}
                        type="primary"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateWarehouse;
