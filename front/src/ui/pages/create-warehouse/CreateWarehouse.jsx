import './CreateWarehouse.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { createWarehouse, getWarehousesByUserId } from '../../../services/WarehouseService';
import CREATE_WAREHOUSE from './CreateWarehouse.dictionary';

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
        if (requestCountResult.status === 403) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR);
            return;
        }
        if (requestCountResult.status !== 200) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN);
            return;
        }
        if (requestCountResult.data.count >= 20) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.LIMIT_REACHED);
            return;
        }

        const requestCreateResult = await createWarehouse(inputName, inputLocation);
        if (requestCreateResult.status === 403) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR);
            return;
        }
        if (requestCreateResult.status !== 200) {
            setIssueCode(CREATE_WAREHOUSE.ERROR.CODE.UNKNOWN);
            return;
        }
        routeChange('/home');
    };

    return (
        <div className="create-warehouse wrapper">
            <div className="create-warehouse__form">
                <h2 className="create-warehouse__header">{CREATE_WAREHOUSE.TEXTS.MAIN_TITLE}</h2>
                <hr className="create-warehouse__separator" />
                <h3 className="create-warehouse__prompt">{CREATE_WAREHOUSE.TEXTS.PROMT_1}</h3>
                <Input
                    data-testid={CREATE_WAREHOUSE.INPUT.TEST_ID[0]}
                    placeholder={CREATE_WAREHOUSE.INPUT.PLACEHOLDER[0]}
                    type="email"
                    issue={inputNameIssue}
                    closable
                    className="create-warehouse__input-email"
                    width="390px"
                    inputValue={inputName}
                    setInputValue={setInputName}
                />
                <h3 className="create-warehouse__prompt">{CREATE_WAREHOUSE.TEXTS.PROMT_2}</h3>
                <Input
                    data-testid={CREATE_WAREHOUSE.INPUT.TEST_ID[1]}
                    placeholder={CREATE_WAREHOUSE.INPUT.PLACEHOLDER[1]}
                    type="email"
                    issue={inputLocationIssue}
                    closable
                    className="create-warehouse__input-email"
                    width="390px"
                    inputValue={inputLocation}
                    setInputValue={setInputLocation}
                />
                <h3 className="create-warehouse__prompt">{CREATE_WAREHOUSE.TEXTS.PROMT_3}</h3>
                <Input
                    data-testid={CREATE_WAREHOUSE.INPUT.TEST_ID[2]}
                    placeholder={CREATE_WAREHOUSE.INPUT.PLACEHOLDER[2]}
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
                        data-testid={CREATE_WAREHOUSE.BUTTON.TEST_ID[0]}
                        text={CREATE_WAREHOUSE.BUTTON.TEXT[0]}
                        click={() => routeChange('/home')}
                        className={`create-warehouse__submit-button ${issueCode !== CREATE_WAREHOUSE.ERROR.CODE.OK ? '' : 'create-warehouse__correct'}`}
                        type="secondary"
                        size="md"
                    />
                    <Button
                        data-testid={CREATE_WAREHOUSE.BUTTON.TEST_ID[1]}
                        text={CREATE_WAREHOUSE.BUTTON.TEXT[1]}
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
