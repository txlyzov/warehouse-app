/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import './TableBasic.scss';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import TableBasicRow from './TableBasicRow/TableBasicRow';
import { selectCheckboxesSelected, selectGlobalCheckboxState, selectTableData, setGlobalCheckboxState, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import TableBasicEmptyRow from './TableBasicEmptyRow/TableBasicEmptyRow';

function TableBasic({
  data = [], column, cellWidth, cellHeight, action, className, minRowsOnPage = 0, starterSelectOption = false
}) {

  const dispatch = useDispatch();
  const tableData = useSelector(selectTableData);
  const tableCheckboxState = useSelector(selectGlobalCheckboxState);
  const selectedOptionsValue = useSelector(selectCheckboxesSelected);

  useEffect(() => {
    dispatch(setGlobalCheckboxState(starterSelectOption));
  }, []);

  useEffect(() => {
    if (selectedOptionsValue === tableData.length) {
      dispatch(setGlobalCheckboxState(true))
    }

    if (selectedOptionsValue === 0) {
      dispatch(setGlobalCheckboxState(false))
    }
  }, [selectedOptionsValue]);

  const style = {
    width: cellWidth || '100px',
    height: cellHeight || '100px',
  };

  function TableHeadItem({ item }) {
    return <th
      key={`TableHeadItem-1${item.value}${uuidv4()}`}
      style={style}
      className="table-basic__column-name">
      {item.heading}
    </th>;
  }

  const generateEmptyRows = () => {
    const tableBasicEmptyRow = [];
    for (let row = 0; row < (minRowsOnPage - data.length); row += 1) {
      tableBasicEmptyRow.push(
        <TableBasicEmptyRow
          style={style}
          key={data.length + row}
          columnInRow={column}
          rowIndex={data.length + row}
        />
      )
    }

    return tableBasicEmptyRow;
  };

  function updateCheckboxes() {
    const updatedTableContent = tableData.map((element) => ({ ...element, isSelected: !tableCheckboxState }))
    dispatch(setGlobalCheckboxState(!tableCheckboxState))
    dispatch(setTableData(updatedTableContent))
  }

  return (
    <table className={`${className || ''} table-basic wrapper`}>
      <thead className="table-basic__thead">
        <tr>
          {column.map((item) => <TableHeadItem key={`TableHeadItem-2${item.value}${uuidv4()}`} item={item} />)}
          <td style={style}
            aria-hidden="true"
            className={`table-basic__column-name selectable ${tableCheckboxState ? 'selected' : ''}`}
            onClick={() => {
              updateCheckboxes()
            }}
          >
            {tableCheckboxState ? '>Selected<' : '> Select <'}
          </td>
        </tr>
      </thead>
      <tbody className="table-basic__tbody">
        {data.map((item, rowIndex) =>
          <TableBasicRow
            action={action}
            style={style}
            // eslint-disable-next-line react/no-array-index-key
            key={`TableBasicRow${rowIndex}`}
            item={item}
            columnInRow={column}
            rowIndex={rowIndex}
          />)}
        {minRowsOnPage - data.length > 0 ?
          generateEmptyRows()
          :
          ''
        }
      </tbody>
    </table >
  );
}

export default TableBasic;
