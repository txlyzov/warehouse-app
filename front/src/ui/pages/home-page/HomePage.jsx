import './HomePage.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import Button from '../../components/button/Button';
import TableCompact from '../../components/table-compact/TableCompact';
import Input from '../../components/input/Input';
import { getWarehousesByUserId } from '../../../services/WarehouseService';
import HOME_PAGE from './HomePage.dictionary';
import { PATH_VARIBLES } from '../../../utils/Constants';

function HomePage() {
  const [inputSearch, setInputSearch] = useState('');
  const [tableContent, setTableContent] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);

  const navigate = useNavigate();
  const routeChange = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const asyncActions = async () => {
      const requestResult = await getWarehousesByUserId();

      if (requestResult.status !== StatusCodes.OK) {
        routeChange(PATH_VARIBLES.MAIN);

        return
      }

      setWarehouseData(requestResult.data.rows);
      setTableContent(requestResult.data.rows);
    }

    asyncActions();
  }, []);

  useEffect(() => {
    if (inputSearch.length === 0) {
      setTableContent(warehouseData);

      return;
    }

    const regex = new RegExp(inputSearch, 'g');
    const searchResults = warehouseData.filter((element) => element.name.match(regex));
    setTableContent(searchResults);
  }, [inputSearch]);

  return (
    <div className="home wrapper">
      <div className="home__elements-block">
        <div className="home__top-elements">
          <Button
            data-testid={HOME_PAGE.BUTTON.ADD_WAREHOUSE.TEST_ID}
            text={HOME_PAGE.BUTTON.ADD_WAREHOUSE.TEXT}
            click={() => routeChange(PATH_VARIBLES.CREATE_WAREHOUSE)}
            className="home__add-warehouse-button"
            type="secondary"
            size="md" />
          <Input
            data-testid={HOME_PAGE.INPUT.SEARCH.TEST_ID}
            placeholder={HOME_PAGE.INPUT.SEARCH.PLACEHOLDER}
            closable
            className="home__input-search"
            width="390px"
            inputValue={inputSearch}
            setInputValue={setInputSearch}
          />
        </div>
        <div className="home__center-elements">
          <TableCompact
            tableSettings={HOME_PAGE.TABLE.COLUMN_SETTINGS}
            content={tableContent}
            cellHeight="71px"
            cellWidth="200px"
            action={(element) => routeChange(`${PATH_VARIBLES.WAREHOUSE}${element.id}`)} />
        </div>
        <div className="home__bottom-elements">
          <div className="home__counter">
            <h3 className="home__counter-text">
              Active slots:
              {' '}
              {warehouseData.length}
              {' '}
              / {HOME_PAGE.TABLE.MAX_RECORDS}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
