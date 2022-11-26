import './CreateEntity.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '../../components/button/Button';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { ErrorModal, InputModal } from '../../components/modal/modal-templates/modal-templates';
import Counter from '../../components/counter/Counter';
import { getWarehouseById } from '../../../services/WarehouseService';
import { createCargo } from '../../../services/CargoService';


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
            params.warehouseId
        );

        if (cargoRequestResult.status !== 200) {
            dispatch(
                setModalContent(
                    <ErrorModal
                        title="Request error"
                        errorText="Something happend with request. Please,relogin."
                    />
                )
            )
            routeChange('/home');
            return
        }

        routeChange(`/warehouse/${params.warehouseId}`)
    }

    useEffect(() => {
        const asyncActions = async () => {
            const warehouseRequestResult = await getWarehouseById(params.warehouseId);

            if (warehouseRequestResult.status !== 200) {
                dispatch(
                    setModalContent(
                        <ErrorModal
                            title="Request error"
                            errorText="Something happend with request. Please,relogin."
                        />
                    )
                )
                routeChange('/home');
                return
            }

            if (!warehouseRequestResult.data) {
                dispatch(
                    setModalContent(
                        <ErrorModal
                            title="Error"
                            errorText="Unexist warehouse"
                        />
                    )
                )
                routeChange('/home');
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
                            className='create-entity__name'
                        >
                            {entityName || 'Set entity name'}
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
                                Loading..
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
                                <h3 className='create-entity__note'>
                                    {entityNotes || 'You can write notes here or left field empty.'}
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
                                <img className='create-entity__image' alt={entityName} src={entityImageUrl} />
                                :
                                <div className='create-entity__no-image-background'>
                                    <h2 className='create-entity__text'>
                                        You can link image or left field empty
                                    </h2>
                                </div>}
                        </div>

                    </div>
                </div>

                <div className="create-entity__bottom-elements">
                    <div className='create-entity__buttons-block'>
                        <Button click={() => routeChange(`/warehouse/${params.warehouseId}`)}
                            className="create-entity__return-button"
                            type="secondary"
                            text="Return"
                            size="md"
                        />
                        <Button click={() => createFunction()}
                            className="create-entity__delete-button"
                            type="primary"
                            text="Create"
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
