import './EntityPage.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import { selectItem, selectType } from '../../../redux-store/data-transfer/DataTransferSlice';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ErrorModal, InputModal, NoteModal } from '../../components/modal/modal-templates/modal-templates';
import Counter from '../../components/counter/Counter';
import { getWarehouseById } from '../../../services/WarehouseService';
import { getCargosById, updateCargoById } from '../../../services/CargoService';


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

    const updateFunction = async () => {
        const cargoRequestResult = await updateCargoById(
            entityName,
            entityQuantity,
            entityImageUrl,
            entityNotes,
            params.warehouseId,
            params.entityId
        );

        if (cargoRequestResult.status !== 200) {
            errorCase();
            return
        }

        dispatch(
            setModalContent(
                <NoteModal
                    title='Update cargo data'
                    noteText='Data updated' />
            )
        )

        routeChange(`/warehouse/${params.warehouseId}`)
    }

    useEffect(() => {
        const asyncActions = async () => {
            const warehouseRequestResult = await getWarehouseById(params.warehouseId);

            if (warehouseRequestResult.status !== 200) {
                errorCase()
                return
            }

            if (!warehouseRequestResult.data) {
                errorCase("Error", "Unexist warehouse")
                return
            }
            setEntityLocation(warehouseRequestResult.data.location);

            const cargosRequestResult = await getCargosById(params.warehouseId, params.entityId);

            if (cargosRequestResult.status !== 200) {
                errorCase()
                return
            }

            if (!cargosRequestResult.data) {
                errorCase("Error", "Unexist cargo entity")
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
                                        title="Edit name"
                                        noteText="You can update the name of cargo. Not empty string."
                                        setInputValue={setEntityName}
                                        inputValue={entityName}
                                        placeholder="Item name"
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
                            {entityName || "Loading.."}
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
                                Loading..
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
                                                    title="Edit note"
                                                    noteText="You can update cargo note."
                                                    setInputValue={setEntityNotes}
                                                    inputValue={entityNotes}
                                                    placeholder="Note text"
                                                />
                                            )
                                        )
                                    }
                                    }
                                >
                                    <h3 className='entity__note'>
                                        {entity.note ? entity.note : 'No notes privided.'}
                                    </h3>
                                </div>
                                :
                                <h3 className='entity__note'>
                                    Loading..
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
                                        Loading..
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
                                                title="Edit image"
                                                noteText="You can update cargo image."
                                                setInputValue={setEntityImageUrl}
                                                inputValue={entityImageUrl}
                                                placeholder="Image link"
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
                                            No image for this item
                                        </h2>
                                    </div>}
                            </div>
                            :
                            <div className='entity__image-background'>
                                <div className='entity__no-image-background'>
                                    <h2 className='entity__text'>
                                        Loading..
                                    </h2>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className="entity__bottom-elements">
                    <div className='entity__buttons-block'>
                        <Button click={() => routeChange(`/warehouse/${params.warehouseId}`)}
                            className="entity__return-button"
                            type="secondary"
                            text="Return"
                            size="md"
                        />
                        <Button
                            click={() => updateFunction()}
                            className="entity__update-button"
                            type="secondary"
                            text="Update"
                            size="md"
                            disabled={!isUpdateAvaliable}
                        />
                        <Button click={() => routeChange('/create-warehouse')}
                            className="entity__delete-button"
                            type="primary"
                            text="Delete"
                            size="md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EntityPage;
