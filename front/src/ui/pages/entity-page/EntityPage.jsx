import './EntityPage.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ErrorModal, InputModal, NoteModal } from '../../components/modal/modal-templates/modal-templates';
import Counter from '../../components/counter/Counter';
import { getWarehouseById } from '../../../services/WarehouseService';
import { deleteCargoById, getCargosById, updateCargoById } from '../../../services/CargoService';
import { PATH_VARIBLES } from '../../../utils/Constants';
import ENTITY_PAGE from './EntityPage.dictionary';


function EntityPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const [entity, setEntity] = useState(null);
    const [entityName, setEntityName] = useState(null);
    const [entityLocation, setEntityLocation] = useState(null);
    const [entityQuantity, setEntityQuantity] = useState(null);
    const [entityNotes, setEntityNotes] = useState(null);
    const [entityImageUrl, setEntityImageUrl] = useState(null);
    const [isUpdateAvaliable, setIsUpdateAvaliable] = useState(false);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    const errorCase = (title = ENTITY_PAGE.MODAL.TITLE_ERROR, errorText = ENTITY_PAGE.MODAL.TEXT_ERROR) => {
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

    const updateFunction = async () => {
        const cargoRequestResult = await updateCargoById(
            entityName,
            entityQuantity,
            entityImageUrl,
            entityNotes,
            params[PATH_VARIBLES.WAREHOUSE_ID],
            params[PATH_VARIBLES.ENTITY_ID]
        );

        if (cargoRequestResult.status !== StatusCodes.OK) {
            errorCase();

            return
        }

        dispatch(
            setModalContent(
                <NoteModal
                    title={ENTITY_PAGE.MODAL.TITLE_UPDATE_NOTE}
                    noteText={ENTITY_PAGE.MODAL.TEXT_UPDATE_NOTE} />
            )
        )

        routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)
    }

    const deleteFunction = async () => {
        const cargoRequestResult = await deleteCargoById(
            params[PATH_VARIBLES.WAREHOUSE_ID],
            params[PATH_VARIBLES.ENTITY_ID]
        );

        if (cargoRequestResult.status !== StatusCodes.OK) {
            errorCase();
            return
        }

        dispatch(
            setModalContent(
                <NoteModal
                    title={ENTITY_PAGE.MODAL.TITLE_DELETE_NOTE}
                    noteText={ENTITY_PAGE.MODAL.TEXT_DELETE_NOTE} />
            )
        )

        routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)
    }

    useEffect(() => {
        const asyncActions = async () => {
            const warehouseRequestResult = await getWarehouseById(params[PATH_VARIBLES.WAREHOUSE_ID]);

            if (warehouseRequestResult.status !== StatusCodes.OK) {
                errorCase()
                return
            }

            if (!warehouseRequestResult.data) {
                errorCase(ENTITY_PAGE.MODAL.TITLE_ERROR, ENTITY_PAGE.MODAL.UNEXIST_WAREHOUSE_ERROR)
                return
            }

            setEntityLocation(warehouseRequestResult.data.location);
            const cargosRequestResult = await getCargosById(
                params[PATH_VARIBLES.WAREHOUSE_ID],
                params[PATH_VARIBLES.ENTITY_ID]
            );

            if (cargosRequestResult.status !== StatusCodes.OK) {
                errorCase()
                return
            }

            if (!cargosRequestResult.data) {
                errorCase(ENTITY_PAGE.MODAL.TITLE_ERROR, ENTITY_PAGE.MODAL.UNEXIST_CARGO_ENTITY_ERROR)
                return
            }

            setEntity(cargosRequestResult.data);
            setEntityName(cargosRequestResult.data.name);
            setEntityQuantity(cargosRequestResult.data.quantity);
            setEntityNotes(cargosRequestResult.data.notes);
            setEntityImageUrl(cargosRequestResult.data.imageUrl);
        }

        asyncActions();
    }, []);

    useEffect(() => {
        if (entity) {
            if (
                entityName !== entity.name
                || entityQuantity !== entity.quantity
                || entityNotes !== entity.notes
                || entityImageUrl !== entity.imageUrl) {
                setIsUpdateAvaliable(true)
            }
            else {
                setIsUpdateAvaliable(false)
            }
        }
    }, [entityName, entityQuantity, entityNotes, entityImageUrl]);

    return (
        <div className='entity wrapper'>
            <div className="entity__elements-block">
                <div className="entity__top-elements">
                    <div className='entity__name-block'
                        aria-hidden="true"
                        onDoubleClick={() => {
                            dispatch(
                                setModalContent(
                                    <InputModal
                                        title={ENTITY_PAGE.MODAL.TITLE_INPUT_NAME}
                                        noteText={ENTITY_PAGE.MODAL.TEXT_INPUT_NAME}
                                        setInputValue={setEntityName}
                                        inputValue={entityName}
                                        placeholder={ENTITY_PAGE.INPUT.MODAL_INPUT_NAME.PLACEHOLDER}
                                        notNull
                                    />
                                )
                            )
                        }
                        }
                    >
                        <h2
                            className='entity__name'
                        >
                            {entityName || ENTITY_PAGE.TEXTS.LOADING}
                        </h2>
                    </div>

                    {entityLocation ?
                        <div className='entity__location-block'
                            aria-hidden="true"
                        >
                            <h3 className='entity__text'>
                                {entityLocation.split(',')[0]}

                            </h3>
                            <h3 className='entity__text'>
                                {entityLocation.split(',')[1]}
                            </h3>
                        </div>
                        :
                        <div className='entity__location-block'>
                            <h3 className='entity__text'>
                                {ENTITY_PAGE.TEXTS.LOADING}
                            </h3>
                        </div>
                    }

                </div>

                <div className='entity__centeral-elements'>
                    <div className='entity__central-rigth-elements'>
                        <div className='entity__note-block'>
                            {entity ?
                                <div
                                    className='entity__scroll-area'
                                    onDoubleClick={() => {
                                        dispatch(
                                            setModalContent(
                                                <InputModal
                                                    title={ENTITY_PAGE.MODAL.TITLE_INPUT_NOTE}
                                                    noteText={ENTITY_PAGE.MODAL.TEXT_INPUT_NOTE}
                                                    setInputValue={setEntityNotes}
                                                    inputValue={entityNotes}
                                                    placeholder={ENTITY_PAGE.INPUT.MODAL_INPUT_NOTE.PLACEHOLDER}
                                                />
                                            )
                                        )
                                    }
                                    }
                                >
                                    <h3 className='entity__note'>
                                        {entity.note ? entity.note : ENTITY_PAGE.TEXTS.EMPTY_NOTE}
                                    </h3>
                                </div>
                                :
                                <h3 className='entity__note'>
                                    {ENTITY_PAGE.TEXTS.LOADING}
                                </h3>
                            }
                        </div>
                        {entity ?
                            <Counter
                                className="warehouse__pagination"
                                size="lg"
                                inputCurrentValue={entityQuantity}
                                outputCurrentPage={(amount) => {
                                    setEntityQuantity(amount)
                                }}
                            /> :
                            <div className='entity__amount-block'>
                                <div className='entity__amount'>
                                    <h3 className='entity__text'>
                                        Items left:
                                    </h3>
                                    <h3 className='entity__text'>
                                        {ENTITY_PAGE.TEXTS.LOADING}
                                    </h3>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='entity__central-left-elements'>
                        {entity ?
                            <div
                                className='entity__image-background'
                                onDoubleClick={() => {
                                    dispatch(
                                        setModalContent(
                                            <InputModal
                                                title={ENTITY_PAGE.MODAL.TITLE_INPUT_IMAGE}
                                                noteText={ENTITY_PAGE.MODAL.TEXT_INPUT_IMAGE}
                                                setInputValue={setEntityImageUrl}
                                                inputValue={entityImageUrl}
                                                placeholder={ENTITY_PAGE.INPUT.MODAL_INPUT_IMAGE.PLACEHOLDER}
                                            />
                                        )
                                    )
                                }
                                }
                            >
                                {entityImageUrl ?
                                    <img className='entity__image' alt={entityName} src={entityImageUrl} />
                                    :
                                    <div className='entity__no-image-background'>
                                        <h2 className='entity__text'>
                                            {ENTITY_PAGE.TEXTS.EMPTY_IMAGE}
                                        </h2>
                                    </div>}
                            </div>
                            :
                            <div className='entity__image-background'>
                                <div className='entity__no-image-background'>
                                    <h2 className='entity__text'>
                                        {ENTITY_PAGE.TEXTS.LOADING}
                                    </h2>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="entity__bottom-elements">
                    <div className='entity__buttons-block'>
                        <Button
                            data-testid={ENTITY_PAGE.BUTTON.RETURN.TEST_ID}
                            text={ENTITY_PAGE.BUTTON.RETURN.TEXT}
                            click={() => routeChange(`${PATH_VARIBLES.WAREHOUSE}${params[PATH_VARIBLES.WAREHOUSE_ID]}`)}
                            className="entity__return-button"
                            type="secondary"
                            size="md"
                        />
                        <Button
                            data-testid={ENTITY_PAGE.BUTTON.UPDATE.TEST_ID}
                            text={ENTITY_PAGE.BUTTON.UPDATE.TEXT}
                            click={() => updateFunction()}
                            className="entity__update-button"
                            type="secondary"
                            size="md"
                            disabled={!isUpdateAvaliable}
                        />
                        <Button click={() => deleteFunction()}
                            data-testid={ENTITY_PAGE.BUTTON.DELETE.TEST_ID}
                            text={ENTITY_PAGE.BUTTON.DELETE.TEXT}
                            className="entity__delete-button"
                            type="primary"
                            size="md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EntityPage;
