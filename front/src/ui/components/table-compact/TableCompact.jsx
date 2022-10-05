import './TableCompact.scss'

function TableCompact({ content, tableSettings, cellWidth, cellHeight, action }) {
    const style = {
        width: cellWidth ? cellWidth : '100px',
        height: cellHeight ? cellHeight : '100px',
    }

    const generateTbodyContent = () => {
        let tr = [];
        for (let row = 0; row < tableSettings.rows; row++) {
            tr.push(< tr key={row} className='table-compact__row' >
                {generateRowContent(row)}
            </tr >);
        }
        return tr;
    }

    const generateRowContent = (row) => {
        let td = [];
        for (let column = 0; column < tableSettings.columns; column++) {
            if (content[tableSettings.columns * row + column]) {
                td.push(<td onClick={() => action(content[tableSettings.columns * row + column])} style={style} className={`table-compact__cell row-${row % 2} col-${column % 2} ${action ? 'selectable' : ''}`} key={column}>
                    {generateCellContent(row, column)}
                </td>);
            } else {
                td.push(<td style={style} className={`table-compact__cell row-${row % 2} col-${column % 2} ${action ? 'selectable' : ''}`} key={column}></td>);
            }
        }
        return td;
    }

    const generateCellContent = (row, column) => {
        let p = [];
        for (let field = 0; field < tableSettings.value.length; field++) {
            p.push(<p key={field} className={`cell-content-${field}`}>{content[tableSettings.columns * row + column][`${tableSettings.value[field]}`]}</p>);
        }
        return p;
    }

    return (
        <table className='table-compact wrapper'>
            <thead className='table-compact__thead'>
                <tr>
                    <th style={{ height: cellHeight }} className='table-compact__column-name' colSpan={tableSettings.columns}>{tableSettings.header}</th>
                </tr>
            </thead>
            <tbody className='table-compact__tbody'>
                {generateTbodyContent()}
            </tbody>
        </table>
    );
}

export default TableCompact;