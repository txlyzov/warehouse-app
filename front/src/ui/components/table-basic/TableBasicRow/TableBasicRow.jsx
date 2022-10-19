import './TableBasicRow.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '../../checkbox/Checkbox';
import { selectCheckboxState, selectTableData, setTableData } from '../../../../redux-store/basic-table/BasicTableSlise';

function TableBasicRow({ action, item, columnInRow, rowIndex, style }) {

    const dispatch = useDispatch();
    const tableData = useSelector(selectTableData);
    const [active, setActive] = useState(tableData[item.index].isSelected);

    const tableCheckboxState = useSelector(selectCheckboxState);

    // useEffect(() => {
    //     if (tableData) {
    //         const temp = tableData.map(rowElement =>
    //             rowElement.index === item.index ?
    //                 { ...item, isSelected: active } : rowElement);
    //         dispatch(setTableData(temp))
    //         // dispatch(setTableFieldRedux({ index: 90, data: item.data, isSelected: true }))
    //     }
    // }, [active]);

    useEffect(() => {
        if (tableData) {
            const temp = tableData.map(rowElement =>
                rowElement.index === item.index ?
                    { ...item, isSelected: active } : rowElement);
            dispatch(setTableData(temp))
            // dispatch(setTableFieldRedux({ index: 90, data: item.data, isSelected: true }))
        }
    }, [active]);

    useEffect(() => {
        console.log(active);
        console.log(tableData[item.index]);
        setActive(tableData[item.index].isSelected);
    }, [tableData[item.index].isSelected]);

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


    const filledCells = () => {
        // columnInRow.map((columnItem, colIndex) => <td
        //     aria-hidden="true"
        //     key={columnItem + colIndex}
        //     style={style}
        //     className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
        //     onClick={() => console.log(active)}
        // >
        //     {item.data[`${columnItem.value}`]}
        // </td>)
        const td = [];
        for (let colIndex = 0; colIndex < columnInRow.length; colIndex += 1) {
            td.push(<td
                aria-hidden="true"
                key={colIndex}
                style={style}
                className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
                onClick={() => console.log(active)}
            >
                {item.data[`${columnInRow[colIndex].value}`]}
            </td>);
        }
        td.push(<td key={-1} className={`table-basic__cell row-${rowIndex % 2} col-${columnInRow.length % 2}`}>
            <Checkbox checked={active} onChange={(e) => setActive(e)} />
        </td>)
        return td;
    };

    const emptyCells = () => {
        columnInRow.map((columnItem, colIndex) => <td
            aria-hidden="true"
            key={columnItem + colIndex}
            style={style}
            className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
        />)
        return columnInRow;
    };

    return (
        <tr className={`table-basic__row ${action ? 'selectable' : ''}`}>
            {/* {action ?
                filledCells()
                :
                emptyCells()
                // ''
            } */}
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
