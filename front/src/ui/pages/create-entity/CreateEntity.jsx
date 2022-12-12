import './CreateEntity.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ErrorModal, InputModal } from '../../components/modal/modal-templates/modal-templates';
import Counter from '../../components/counter/Counter';
import { getWarehouseById } from '../../../services/WarehouseService';
import { createCargo } from '../../../services/CargoService';
import { PATH_VARIBLES } from '../../../utils/Constants';
import CREATE_ENTITY from './CreateEntity.dictionary';


function CreateEntity() {
    const params = useParams();
    const dispatch = useDispatch();
    const [entityName, setEntityName] = useState(null);
    const [entityLocation, setEntityLocation] = useState(null);
    const [entityQuantity, setEntityQuantity] = useState(0);
    const [entityNotes, setEntityNotes] = useState(null);
    const [entityImageUrl, setEntityImageUrl] = useState(null);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const createFunction = async () => {
        const cargoRequestResult = await createCargo(
            entityName,
            entityQuantity,
            entityImageUrl,
            entityNotes,
            params[PATH_VARIBLES.WAREHOUSE_ID]
        );

        if (cargoRequestResult.status !== StatusCodes.OK) {
            dispatch(
                setModalContent(
                    <ErrorModal
                        title={CREATE_ENTITY.MODAL.TITLE_ERROR}
                        errorText={CREATE_ENTITY.MODAL.TEXT_ERROR}
                    />
                )
            )
            routeChange(PATH_VARIBLES.HOME);

            return
        }

        routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)
    }

    useEffect(() => {
        const asyncActions = async () => {
            const warehouseRequestResult = await getWarehouseById(params[PATH_VARIBLES.WAREHOUSE_ID]);

            if (warehouseRequestResult.status !== StatusCodes.OK) {
                dispatch(
                    setModalContent(
                        <ErrorModal
                            title={CREATE_ENTITY.MODAL.TITLE_ERROR}
                            errorText={CREATE_ENTITY.MODAL.TEXT_ERROR}
                        />
                    )
                )
                routeChange(PATH_VARIBLES.HOME);

                return
            }

            if (!warehouseRequestResult.data) {
                dispatch(
                    setModalContent(
                        <ErrorModal
                            title={CREATE_ENTITY.MODAL.TITLE_ERROR}
                            errorText={CREATE_ENTITY.MODAL.UNEXIST_WAREHOUSE_ERROR}
                        />
                    )
                )
                routeChange(PATH_VARIBLES.HOME);

                return
            }

            setEntityLocation(warehouseRequestResult.data.location);
        }

        asyncActions();
    }, []);

    return (
        <div className='create-entity wrapper'>
            <div className="create-entity__elements-block">
                <div className="create-entity__top-elements">
                    <div className='create-entity__name-block'
                        aria-hidden="true"
                        onDoubleClick={() => {
                            dispatch(
                                setModalContent(
                                    <InputModal
                                        title={CREATE_ENTITY.MODAL.TITLE_INPUT_NAME}
                                        noteText={CREATE_ENTITY.MODAL.TEXT_INPUT_NAME}
                                        setInputValue={setEntityName}
                                        inputValue={entityName}
                                        placeholder={CREATE_ENTITY.INPUT.MODAL_INPUT_NAME.PLACEHOLDER}
                                        notNull
                                    />
                                )
                            )
                        }
                        }
                    >
                        <h2
                            className='create-entity__name'
                        >
                            {entityName || CREATE_ENTITY.TEXTS.EMPTY_NAME}
                        </h2>
                    </div>

                    {entityLocation ?
                        <div className='create-entity__location-block'
                            aria-hidden="true"
                        >
                            <h3 className='create-entity__text'>
                                {entityLocation.split(',')[0]}

                            </h3>
                            <h3 className='create-entity__text'>
                                {entityLocation.split(',')[1]}
                            </h3>
                        </div>
                        :
                        <div className='create-entity__location-block'>
                            <h3 className='create-entity__text'>
                                {CREATE_ENTITY.TEXTS.LOADING}
                            </h3>
                        </div>
                    }
                </div>

                <div className='create-entity__centeral-elements'>
                    <div className='create-entity__central-rigth-elements'>
                        <div className='create-entity__note-block'>

                            <div
                                className='create-entity__scroll-area'
                                onDoubleClick={() => {
                                    dispatch(
                                        setModalContent(
                                            <InputModal
                                                title={CREATE_ENTITY.MODAL.TITLE_INPUT_NOTE}
                                                noteText={CREATE_ENTITY.MODAL.TEXT_INPUT_NOTE}
                                                setInputValue={setEntityNotes}
                                                inputValue={entityNotes}
                                                placeholder={CREATE_ENTITY.INPUT.MODAL_INPUT_NOTE.PLACEHOLDER}
                                            />
                                        )
                                    )
                                }
                                }
                            >
                                <h3 className='create-entity__note'>
                                    {entityNotes || CREATE_ENTITY.TEXTS.EMPTY_NOTE}
                                </h3>
                            </div>

                        </div>
                        <Counter
                            className="warehouse__pagination"
                            size="lg"
                            inputCurrentValue={entityQuantity}
                            outputCurrentPage={(amount) => {
                                setEntityQuantity(amount)
                            }}
                        />
                    </div>
                    <div className='create-entity__central-left-elements'>

                        <div
                            className='create-entity__image-background'
                            onDoubleClick={() => {
                                dispatch(
                                    setModalContent(
                                        <InputModal
                                            title={CREATE_ENTITY.MODAL.TITLE_INPUT_IMAGE}
                                            noteText={CREATE_ENTITY.MODAL.TEXT_INPUT_IMAGE}
                                            setInputValue={setEntityImageUrl}
                                            inputValue={entityImageUrl}
                                            placeholder={CREATE_ENTITY.INPUT.MODAL_INPUT_IMAGE.PLACEHOLDER}
                                        />
                                    )
                                )
                            }
                            }
                        >
                            {entityImageUrl ?
                                <img className='create-entity__image' alt={entityName} src={entityImageUrl} />
                                :
                                <div className='create-entity__no-image-background'>
                                    <h2 className='create-entity__text'>
                                        {CREATE_ENTITY.TEXTS.EMPTY_IMAGE}
                                    </h2>
                                </div>}
                        </div>

                    </div>
                </div>

                <div className="create-entity__bottom-elements">
                    <div className='create-entity__buttons-block'>
                        <Button click={() => routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)}
                            data-testid={CREATE_ENTITY.BUTTON.RETURN.TEST_ID}
                            text={CREATE_ENTITY.BUTTON.RETURN.TEXT}
                            className="create-entity__return-button"
                            type="secondary"
                            size="md"
                        />
                        <Button click={() => createFunction()}
                            data-testid={CREATE_ENTITY.BUTTON.CREATE.TEST_ID}
                            text={CREATE_ENTITY.BUTTON.CREATE.TEXT}
                            className="create-entity__delete-button"
                            type="primary"
                            size="md"
                            disabled={!entityName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEntity;
