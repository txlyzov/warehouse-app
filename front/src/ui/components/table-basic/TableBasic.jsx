/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect } from 'react';
import './TableBasic.scss';
import { useDispatch, useSelector } from 'react-redux';
import TableBasicRow from './TableBasicRow/TableBasicRow';
import { selectCheckboxState, selectTableData, setCheckboxState, setTableData } from '../../../redux-store/basic-table/BasicTableSlise';
import TableBasicEmptyRow from './TableBasicEmptyRow/TableBasicEmptyRow';

function TableBasic({
  data, column, cellWidth, cellHeight, action, className, minRowsOnPage = 0
}) {

  const dispatch = useDispatch();
  const tableData = useSelector(selectTableData);
  const tableCheckboxState = useSelector(selectCheckboxState);

  useEffect(() => {
    dispatch(setCheckboxState(false))
  }, []);

  const style = {
    width: cellWidth || '100px',
    height: cellHeight || '100px',
  };

  function TableHeadItem({ item }) {
    return <th
      key={item.heading}
      style={style}
      className="table-basic__column-name">
      {item.heading}
    </th>;
  }

  // function TableRow({ item, columnInRow, rowIndex }) {
  //   return (
  //     <tr className={`table-basic__row ${action ? 'selectable' : ''}`}>
  //       {columnInRow.map((columnItem, colIndex) => <td
  //         key={columnItem + colIndex}
  //         style={style}
  //         className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2}`}>
  //         {item[`${columnItem.value}`]}
  //       </td>)}
  //     </tr>
  //   );
  // }

  const generateEmptyRows = () => {
    const tableBasicEmptyRow = [];
    for (let row = 0; row < (minRowsOnPage - data.length); row += 1) {
      tableBasicEmptyRow.push(<TableBasicEmptyRow
        style={style}
        key={row}
        columnInRow={column}
        rowIndex={data.length + row} />)
    }
    return tableBasicEmptyRow;
  };

  function updateCheckboxes() {
    const updatedTableContent = tableData.map((element) => ({ ...element, isSelected: !tableCheckboxState }))
    dispatch(setCheckboxState(!tableCheckboxState))
    dispatch(setTableData(updatedTableContent))
    // console.log(updatedTableContent);
  }

  return (
    <table className={`${className || ''} table-basic wrapper`}>
      <thead className="table-basic__thead">
        <tr>
          {column.map((item, index) => <TableHeadItem key={index} item={item} />)}
          <td style={style}
            aria-hidden="true"
            className="table-basic__column-name"
            onClick={() => {
              updateCheckboxes()
            }}
          >
            Select
          </td>
        </tr>
      </thead>
      <tbody className="table-basic__tbody">
        {/* {data.map((item, rowIndex) => <TableRow key={rowIndex} item={item} columnInRow={column} rowIndex={rowIndex} />)} */}
        {data.map((item, rowIndex) =>
          <TableBasicRow
            action={action}
            style={style}
            key={rowIndex}
            item={item}
            // item={item.data}
            columnInRow={column}
            rowIndex={rowIndex}
          />)}
        {minRowsOnPage - data.length > 0 ?
          // <TableBasicEmptyRow
          //   style={style}
          //   key={- 1}
          //   columnInRow={column}
          //   rowIndex={data.length} />
          generateEmptyRows()
          :
          // data.length
          ''
        }
      </tbody>
    </table >
  );
}

export default TableBasic;

// axios('https://jsonplaceholder.typicode.com/users')
//     .then(res => {
//         setWarehouseData(res.data);
//         setTableContent(res.data);
//     })
//     .catch(err => console.log(err))
// const column = [
//     { heading: 'Name', value: 'name' },
//     { heading: 'Email', value: 'email' },
//     { heading: 'Phone', value: 'phone' },
//     { heading: 'City', value: 'id' },
// ]
// <TableBasic action={(element) => routeChange(`/warehouse/${element.id}`)} data={tableContent} column={column} cellHeight='50px' cellWidth='150px' />
