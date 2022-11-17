import './UpdateWarehouse.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { WAREHOUSE } from '../../../utils/Constants';
import { getWarehouseById, updateWarehouseById } from '../../../services/WarehouseService';

function UpdateWarehouse() {
    const errorTexts = {
        0: <h3 className="update-warehouse__issue">Empty fields!</h3>,
        2: <h3 className="update-warehouse__issue">Auth error.</h3>,
        3: <h3 className="update-warehouse__issue">Unknown error(request failed).</h3>,
    };

    const [issueText, setIssueText] = useState(-1);
    const [inputName, setInputName] = useState('');
    const [inputNameIssue, setInputNameIssue] = useState(false);
    const [inputLocation, setInputLocation] = useState('');
    const [inputLocationIssue, setInputLocationIssue] = useState(false);
    const [inputCollaborators, setInputCollaborators] = useState('');
    const [inputCollaboratorsIssue, setInputCollaboratorsIssue] = useState(false);

    const params = useParams();
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

        const requestCreateResult = await updateWarehouseById(params.warehouseId, inputName, inputLocation);
        if (requestCreateResult.status === 403) {
            setIssueText(WAREHOUSE.ERROR_AUTH);
            return;
        }
        if (requestCreateResult.status !== 200) {
            setIssueText(WAREHOUSE.ERROR_REQUEST);
            return;
        }

        routeChange(`/warehouse/${params.warehouseId}`);
    };

    useEffect(() => {
        const asyncActions = async () => {
            const requestResult = await getWarehouseById(params.warehouseId);

            if (requestResult.status !== 200) {
                routeChange('/home');
            }

            setInputName(requestResult.data.name);
            setInputLocation(requestResult.data.location);
            return requestResult;
        }

        asyncActions()
    }, []);

    return (
        <div className="update-warehouse wrapper">
            <div className="update-warehouse__form">
                <h2 className="update-warehouse__header">Create warehouse</h2>
                <hr className="update-warehouse__separator" />
                <h3 className="update-warehouse__prompt">Type your warehouse name here:</h3>
                <Input
                    type="email"
                    issue={inputNameIssue}
                    closable
                    className="update-warehouse__input-email"
                    placeholder="Enter warehouse name"
                    width="390px"
                    inputValue={inputName}
                    setInputValue={setInputName}
                />
                <h3 className="update-warehouse__prompt">Type warehouse location:</h3>
                <Input
                    type="email"
                    issue={inputLocationIssue}
                    closable
                    className="update-warehouse__input-email"
                    placeholder="Enter warehouse location city"
                    width="390px"
                    inputValue={inputLocation}
                    setInputValue={setInputLocation}
                />
                <h3 className="update-warehouse__prompt">Type collaborators email:</h3>
                <Input
                    type="email"
                    issue={inputCollaboratorsIssue}
                    closable
                    disabled
                    className="update-warehouse__input-email"
                    placeholder="Disabled functionality"
                    width="390px"
                    inputValue={inputCollaborators}
                    setInputValue={setInputCollaborators}
                />
                {issueText !== -1
                    ? errorTexts[issueText]
                    : ''}
                <div className='update-warehouse__buttons-block'>
                    <Button
                        click={() => submitFunction()}
                        className={`update-warehouse__submit-button ${issueText !== -1 ? '' : 'update-warehouse__correct'}`}
                        text="Update"
                        type="primary"
                        size="md"
                    />
                    <Button
                        click={() => routeChange('/home')}
                        className={`update-warehouse__submit-button ${issueText !== -1 ? '' : 'update-warehouse__correct'}`}
                        text="Return"
                        type="secondary"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
}

export default UpdateWarehouse;
