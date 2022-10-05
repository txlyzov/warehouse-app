import './TableBasic.scss'

function TableBasic({ data, column, cellWidth, cellHeight, action }) {
    const style = {
        width: cellWidth ? cellWidth : '100px',
        height: cellHeight ? cellHeight : '100px',
    }
    const TableHeadItem = ({ item }) => {
        return <th key={item.heading} className='table-basic__column-name'>{item.heading}</th>
    }
    const TableRow = ({ item, column, rowIndex }) => (
        <tr className={`table-basic__row `}>
            {column.map((columnItem, colIndex) => {
                return <td key={colIndex} style={style} className={`table-basic__cell row-${rowIndex % 2} col-${colIndex % 2} ${action ? 'selectable' : ''}`}>{item[`${columnItem.value}`]}</td>
            })}
        </tr>
    )

    return (
        <table className='table-basic wrapper'>
            <thead className='table-basic__thead'>
                <tr>
                    {column.map((item, index) => <TableHeadItem key={index} item={item} />)}
                </tr>
            </thead>
            <tbody className='table-basic__tbody'>
                {data.map((item, rowIndex) => <TableRow key={rowIndex} item={item} column={column} rowIndex={rowIndex} />)}
            </tbody>
        </table>
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
