import './CreateWarehouse.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { WAREHOUSE } from '../../../utils/Constants';
import { createWarehouse, getWarehousesByUserId } from '../../../services/WarehouseService';

function CreateWarehouse() {
    const errorTexts = {
        0: <h3 className="create-warehouse__issue">Empty fields!</h3>,
        1: <h3 className="create-warehouse__issue">Warehouse limit reached! (20/20)</h3>,
        2: <h3 className="create-warehouse__issue">Auth error.</h3>,
        3: <h3 className="create-warehouse__issue">Unknown error(request failed).</h3>,
    };

    const [issueText, setIssueText] = useState(-1);
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
        let issue = WAREHOUSE.NO_ERROR;
        resetInputsErrors();

        if (!inputName) {
            setInputNameIssue(true);
            issue = WAREHOUSE.ERROR_EMPTY_FIELS;
        }

        if (!inputLocation) {
            setInputLocationIssue(true);
            issue = WAREHOUSE.ERROR_EMPTY_FIELS;
        }

        setIssueText(issue);
        if (issue !== WAREHOUSE.NO_ERROR) {
            return;
        }

        const requestCountResult = await getWarehousesByUserId();
        if (requestCountResult.status === 403) {
            setIssueText(WAREHOUSE.ERROR_AUTH);
            return;
        }
        if (requestCountResult.status !== 200) {
            setIssueText(WAREHOUSE.ERROR_REQUEST);
            return;
        }
        if (requestCountResult.data.count >= 20) {
            setIssueText(WAREHOUSE.ERROR_LIMIT_REACHED);
            return;
        }

        const requestCreateResult = await createWarehouse(inputName, inputLocation);
        if (requestCreateResult.status === 403) {
            setIssueText(WAREHOUSE.ERROR_AUTH);
            return;
        }
        if (requestCreateResult.status !== 200) {
            setIssueText(WAREHOUSE.ERROR_REQUEST);
            return;
        }
        routeChange('/home');
    };

    return (
        <div className="create-warehouse wrapper">
            <div className="create-warehouse__form">
                <h2 className="create-warehouse__header">Create warehouse</h2>
                <hr className="create-warehouse__separator" />
                <h3 className="create-warehouse__prompt">Type your warehouse name here:</h3>
                <Input
                    type="email"
                    issue={inputNameIssue}
                    closable
                    className="create-warehouse__input-email"
                    placeholder="Enter warehouse name"
                    width="390px"
                    inputValue={inputName}
                    setInputValue={setInputName}
                />
                <h3 className="create-warehouse__prompt">Type warehouse location:</h3>
                <Input
                    type="email"
                    issue={inputLocationIssue}
                    closable
                    className="create-warehouse__input-email"
                    placeholder="Enter warehouse location city"
                    width="390px"
                    inputValue={inputLocation}
                    setInputValue={setInputLocation}
                />
                <h3 className="create-warehouse__prompt">Type collaborators email:</h3>
                <Input
                    type="email"
                    issue={inputCollaboratorsIssue}
                    closable
                    disabled
                    className="create-warehouse__input-email"
                    placeholder="Disabled functionality"
                    width="390px"
                    inputValue={inputCollaborators}
                    setInputValue={setInputCollaborators}
                />
                {issueText !== -1
                    ? errorTexts[issueText]
                    : ''}
                <div className='create-warehouse__buttons-block'>
                    <Button
                        click={() => routeChange('/home')}
                        className={`create-warehouse__submit-button ${issueText !== -1 ? '' : 'create-warehouse__correct'}`}
                        text="Return"
                        type="secondary"
                        size="md"
                    />
                    <Button
                        click={() => submitFunction()}
                        className={`create-warehouse__submit-button ${issueText !== -1 ? '' : 'create-warehouse__correct'}`}
                        text="Create"
                        type="primary"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
}

export default CreateWarehouse;
