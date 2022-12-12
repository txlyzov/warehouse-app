import './TableCompact.scss';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

function TableCompact({
  content, tableSettings, cellWidth, cellHeight, action, className
}) {
  const style = {
    width: cellWidth || '100px',
    height: cellHeight || '100px',
  };

  const generateCellContent = (row, column) => {
    const p = [];
    for (let field = 0; field < tableSettings.value.length; field += 1) {
      p.push(<p key={`generateCellContent${row}${column}${field}`} className={`cell-content-${field}`}>{content[tableSettings.columns * row + column][`${tableSettings.value[field]}`]}</p>);
    }
    return p;
  };

  const generateRowContent = (row) => {
    const td = [];
    for (let column = 0; column < tableSettings.columns; column += 1) {
      if (content[tableSettings.columns * row + column]) {
        td.push(<td
          aria-hidden="true"
          onClick={() => action(content[tableSettings.columns * row + column])}
          style={style}
          className={`table-compact__cell row-${row % 2} col-${column % 2} ${action ? 'selectable' : ''}`}
          key={`generateRowContent${row}${column}`}>
          {generateCellContent(row, column)}
        </td>);
      } else {
        td.push(<td style={style} className={`table-compact__cell row-${row % 2} col-${column % 2} ${action ? 'selectable' : ''}`} key={`generateRowContent${row}${column}`} />);
      }
    }
    return td;
  };



  const generateTbodyContent = () => {
    const tr = [];
    for (let row = 0; row < tableSettings.rows; row += 1) {
      tr.push(<tr key={`generateTbodyContent${row}`} className="table-compact__row">
        {generateRowContent(row)}
      </tr>);
    }
    return tr;
  };

  return (
    <table className={`${className || ''} table-compact wrapper`}>
      <thead className="table-compact__thead">
        <tr>
          <th
            style={{ height: cellHeight }}
            className="table-compact__column-name"
            colSpan={tableSettings.columns}>
            {tableSettings.header}
          </th>
        </tr>
      </thead>
      <tbody className="table-compact__tbody">
        {generateTbodyContent()}
      </tbody>
    </table>
  );
}

export default TableCompact;
