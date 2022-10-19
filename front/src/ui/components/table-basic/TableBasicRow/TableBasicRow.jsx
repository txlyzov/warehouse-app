import './TableBasicRow.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../checkbox/Checkbox';
import { selectCheckboxState, selectTableContent, setTableContentRedux, setTableFieldRedux } from '../../../../redux-store/basic-table/BasicTableSlise';

function TableBasicRow({ action, item, columnInRow, rowIndex, style }) {
    const [active, setActive] = useState(false);

    const dispatch = useDispatch();
    const reduxTableContent = useSelector(selectTableContent);

    const tableCheckboxState = useSelector(selectCheckboxState);

    useEffect(() => {
        if (reduxTableContent) {
            const temp = reduxTableContent.map(rowElement =>
                rowElement.index === item.index ?
                    { ...item, isSelected: active } : rowElement);
            dispatch(setTableContentRedux(temp))
            // dispatch(setTableFieldRedux({ index: 90, data: item.data, isSelected: true }))
        }
    }, [active]);

    useEffect(() => {
        setActive(reduxTableContent[item.index].isSelected);
    }, [reduxTableContent[item.index].isSelected]);

    // useEffect(() => {
    //     setActive(tableCheckboxState);
    //     // console.log(tableCheckboxState);
    //     // if (reduxTableContent) {
    //     //     const temp = reduxTableContent.map(rowElement =>
    //     //         rowElement.index === item.index ?
    //     //             { ...item, isSelected: tableCheckboxState } : rowElement);
    //     //     dispatch(setTableContentRedux(temp))
    //     // }
    // }, [tableCheckboxState]);

    return (
        <tr className={`table-basic__row ${action ? 'selectable' : ''}`}>
            {columnInRow.map((columnItem, colIndex) => <td
                aria-hidden="true"
                key={columnItem + colIndex}
                style={style}
                className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
                onClick={() => console.log(active)}
            >
                {item.data[`${columnItem.value}`]}
            </td>)}
            <td className={`table-basic__cell row-${rowIndex % 2} col-${columnInRow.length % 2}`}>
                <Checkbox checked={active} onChange={(e) => setActive(e)} />
            </td>
        </tr>
    );
}

export default TableBasicRow;
