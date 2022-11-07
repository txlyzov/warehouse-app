import './EntityPage.scss'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import { selectItem, selectType } from '../../../redux-store/data-transfer/DataTransferSlice';
import { setModalContent } from '../../../redux-store/modal/ModalSlice';
import { InputModal, NoteModal } from '../../components/modal/modal-templates/modal-templates';


function EntityPage() {
    // const { state: { qwerty } } = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const type = useSelector(selectType);
    // const item = useSelector(selectItem);
    const [entity, setEntity] = useState(useSelector(selectItem));
    const [entityName, setEntityName] = useState('Loading..');
    const [entityLocation, setEntityLocation] = useState('Loading..');
    const [entityAmount, setEntityAmount] = useState('Loading..');
    const [entityNote, setEntityNote] = useState('Loading..');
    const [entityImage, setEntityImage] = useState('Loading..');
    const [isUpdateAvaliable, setIsUpdateAvaliable] = useState(false);

    const navigate = useNavigate();
    const routeChange = (route) => {
        navigate(route);
    };

    useEffect(() => {
        const incommingEntity = {
            name: 'Tree',
            location: 'Alpi,Prague',
            amount: 43,
            note: 'qweqweqwe qweqweqwe qweqweqwe'
                + 'qweqweqwe qweqweqwe qweqweqwe qweqweqwe qweqweqwe qweqweqwe'
                + 'qweqweqwe qweqweqwe qweqweqwe qweqweqwe qweqweqwe qweqweqwe',
            image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/1121098-pink-nature-wallpaper-1920x1080-lockscreen.jpg',
        } // { warehouse: 'Alpi', city: 'Prague' },
        setEntity(incommingEntity)
        setEntityName(incommingEntity.name)
        setEntityLocation(incommingEntity.location)
        setEntityAmount(incommingEntity.amount)
        setEntityNote(incommingEntity.note)
        setEntityImage(incommingEntity.image)
        // if (type !== 'entity') {
        //     routeChange(`/warehouse/${params.warehouseId}`);
        // }
    }, []);

    useEffect(() => {
        if (entity) {
            if (
                entityName !== entity.name
                || entityAmount !== entity.amount
                || entityNote !== entity.note
                || entityImage !== entity.image) {
                setIsUpdateAvaliable(true)
            }
            else {
                setIsUpdateAvaliable(false)
            }
        }
    }, [entityName, entityAmount, entityNote, entityImage]);

    return (
        <div className='entity wrapper'>
            <div className="entity__elements-block">
                <div className="entity__top-elements">
                    <div className='entity__name-block'
                        aria-hidden="true"
                        onClick={() => { navigator.clipboard.writeText('name') }}
                    >
                        {/* <h2 className='entity__name'>
                            {entity ? entity.name : 'Loading..'}
                        </h2> */}
                        <h2
                            className='entity__name'
                            onDoubleClick={() => {
                                dispatch(
                                    setModalContent(
                                        <InputModal
                                            title="Edit name"
                                            noteText="You can update the name of cargo. Not empty string."
                                            setInputValue={setEntityName}
                                            inputValue={entityName}
                                            notNull
                                        />
                                    )
                                )
                            }
                            }
                        >
                            {entityName}
                        </h2>
                    </div>

                    {entity ?
                        <div className='entity__location-block'
                            aria-hidden="true"
                        // onClick={() => { navigator.clipboard.writeText('id') }}
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
                        </div>}


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
                                                    setInputValue={setEntityNote}
                                                    inputValue={entityNote}
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
                        <div className='entity__amount-block'>
                            <div className='entity__amount'>
                                <h3 className='entity__text'>
                                    Items left:
                                </h3>
                                {/* <h3 className='entity__text'>
                                    {entity ? entity.amount : 'Loading..'}
                                </h3> */}
                                <h3 className='entity__text'>
                                    {entityAmount}
                                </h3>
                            </div>
                        </div>
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
                                                setInputValue={setEntityImage}
                                                inputValue={entityImage}
                                            />
                                        )
                                    )
                                }
                                }
                            >
                                {entityImage ?
                                    <img className='entity__image' alt={entityName} src={entityImage} />
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
                            click={() => {
                                dispatch(
                                    setModalContent(
                                        <NoteModal
                                            title='Update cargo data'
                                            noteText='Data updated' />
                                    )
                                )
                            }
                            }
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
