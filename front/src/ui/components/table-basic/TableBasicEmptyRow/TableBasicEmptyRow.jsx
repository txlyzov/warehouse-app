import './TableBasicEmptyRow.scss';
import React from 'react';

function TableBasicEmptyRow({ columnInRow, rowIndex, style }) {

    const emptyCells = () => {
        const td = [];

        for (let colIndex = 0; colIndex < columnInRow.length; colIndex += 1) {
            td.push(<td
                aria-hidden="true"
                key={`TableBasicEmptyRow${colIndex}`}
                style={style}
                className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}
            />);
        }
        td.push(<td key={`TableBasicEmptyRow${rowIndex}${columnInRow.length}`} className={`table-basic__cell row-${rowIndex % 2} col-${columnInRow.length % 2}`} />
        )

        return td;
    };

    return (
        <tr className="table-basic__row">
            {emptyCells()}
        </tr>
    );
}

export default TableBasicEmptyRow;
