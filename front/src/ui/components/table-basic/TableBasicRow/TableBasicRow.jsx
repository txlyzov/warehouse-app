import './TableBasicRow.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../checkbox/Checkbox';
import { selectTableData, setCheckboxesSelected, setTableData } from '../../../../redux-store/basic-table/BasicTableSlise';

function TableBasicRow({ action, item, columnInRow, rowIndex, style }) {

    const dispatch = useDispatch();
    const tableData = useSelector(selectTableData);
    const [active, setActive] = useState(tableData[item.index].isSelected);

    useEffect(() => {
        if (tableData) {
            const temp = tableData.map(rowElement =>
                rowElement.index === item.index ?
                    { ...item, isSelected: active } : rowElement);
            dispatch(setTableData(temp))
        }
    }, [active]);

    useEffect(() => {
        setActive(tableData[item.index].isSelected);
        dispatch(setCheckboxesSelected(tableData[item.index].isSelected))
    }, [tableData[item.index].isSelected]);

    return (
        <tr className={`table-basic__row ${action ? 'selectable' : ''}`}>
            {columnInRow.map((columnItem, colIndex) => <td
                aria-hidden="true"
                key={columnItem + colIndex}
                style={style}
                className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
                onClick={() => {
                    if (action) {
                        action(item)
                    }
                }}
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
