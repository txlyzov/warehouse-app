import './UpdateWarehouse.scss';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import { getWarehouseById, updateWarehouseById } from '../../../services/WarehouseService';
import UPDATE_WAREHOUSE from './UpdateWarehouse.dictionary';

function UpdateWarehouse() {
    const [issueCode, setIssueCode] = useState(UPDATE_WAREHOUSE.ERROR.CODE.OK);
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
        let issue = UPDATE_WAREHOUSE.ERROR.CODE.OK;
        resetInputsErrors();

        if (!inputName) {
            setInputNameIssue(true);
            issue = UPDATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS;
        }

        if (!inputLocation) {
            setInputLocationIssue(true);
            issue = UPDATE_WAREHOUSE.ERROR.CODE.EMPTY_FIELDS;
        }

        setIssueCode(issue);
        if (issue !== UPDATE_WAREHOUSE.ERROR.CODE.OK) {
            return;
        }

        const requestCreateResult = await updateWarehouseById(params.warehouseId, inputName, inputLocation);
        if (requestCreateResult.status === 403) {
            setIssueCode(UPDATE_WAREHOUSE.ERROR.CODE.AUTH_ERROR);
            return;
        }
        if (requestCreateResult.status !== 200) {
            setIssueCode(UPDATE_WAREHOUSE.ERROR.CODE.UNKNOWN);
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
        }

        asyncActions()
    }, []);

    return (
        <div className="update-warehouse wrapper">
            <div className="update-warehouse__form">
                <h2 className="update-warehouse__header">{UPDATE_WAREHOUSE.TEXTS.MAIN_TITLE}</h2>
                <hr className="update-warehouse__separator" />
                <h3 className="update-warehouse__prompt">{UPDATE_WAREHOUSE.TEXTS.PROMT_1}</h3>
                <Input
                    data-testid={UPDATE_WAREHOUSE.INPUT.TEST_ID[0]}
                    placeholder={UPDATE_WAREHOUSE.INPUT.PLACEHOLDER[0]}
                    issue={inputNameIssue}
                    closable
                    className="update-warehouse__input-name"
                    width="390px"
                    inputValue={inputName}
                    setInputValue={setInputName}
                />
                <h3 className="update-warehouse__prompt">{UPDATE_WAREHOUSE.TEXTS.PROMT_2}</h3>
                <Input
                    data-testid={UPDATE_WAREHOUSE.INPUT.TEST_ID[1]}
                    placeholder={UPDATE_WAREHOUSE.INPUT.PLACEHOLDER[1]}
                    issue={inputLocationIssue}
                    closable
                    className="update-warehouse__input-location"
                    width="390px"
                    inputValue={inputLocation}
                    setInputValue={setInputLocation}
                />
                <h3 className="update-warehouse__prompt">{UPDATE_WAREHOUSE.TEXTS.PROMT_3}</h3>
                <Input
                    data-testid={UPDATE_WAREHOUSE.INPUT.TEST_ID[2]}
                    placeholder={UPDATE_WAREHOUSE.INPUT.PLACEHOLDER[2]}
                    type="email"
                    issue={inputCollaboratorsIssue}
                    closable
                    disabled
                    className="update-warehouse__input-email"
                    width="390px"
                    inputValue={inputCollaborators}
                    setInputValue={setInputCollaborators}
                />
                {issueCode !== UPDATE_WAREHOUSE.ERROR.CODE.OK
                    ? UPDATE_WAREHOUSE.ERROR.CONTENT[issueCode]
                    : ''}
                <div className='update-warehouse__buttons-block'>
                    <Button
                        data-testid={UPDATE_WAREHOUSE.BUTTON.TEST_ID[0]}
                        text={UPDATE_WAREHOUSE.BUTTON.TEXT[0]}
                        click={() => routeChange(`/warehouse/${params.warehouseId}`)}
                        className={`update-warehouse__submit-button ${issueCode !== UPDATE_WAREHOUSE.ERROR.CODE.OK ? '' : 'update-warehouse__correct'}`}
                        type="secondary"
                        size="md"
                    />
                    <Button
                        data-testid={UPDATE_WAREHOUSE.BUTTON.TEST_ID[1]}
                        text={UPDATE_WAREHOUSE.BUTTON.TEXT[1]}
                        click={() => submitFunction()}
                        className={`update-warehouse__submit-button ${issueCode !== UPDATE_WAREHOUSE.ERROR.CODE.OK ? '' : 'update-warehouse__correct'}`}
                        type="primary"
                        size="md"
                    />
                </div>
            </div>
        </div>
    );
}

export default UpdateWarehouse;
