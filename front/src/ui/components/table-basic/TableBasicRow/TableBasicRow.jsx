import './TableBasicRow.scss';
import React, { useState } from 'react';
import Checkbox from '../../checkbox/Checkbox';

function TableBasicRow({ action, item, columnInRow, rowIndex, style }) {
    const [active, setActive] = useState(false);

    return (
        <tr className={`table-basic__row ${action ? 'selectable' : ''}`}>
            {columnInRow.map((columnItem, colIndex) => <td
                aria-hidden="true"
                key={columnItem + colIndex}
                style={style}
                className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
                onClick={() => console.log(active)}
            >
                {item[`${columnItem.value}`]}
            </td>)}
            <td className={`table-basic__cell row-${rowIndex % 2} col-${columnInRow.length % 2}`}>
                <Checkbox onChange={(e) => setActive(e)} />
            </td>
        </tr>
    );
}

export default TableBasicRow;
