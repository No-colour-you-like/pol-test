import { connect } from "react-redux";
import { useState, useEffect } from "react";

import { Table, InputGroup, FormControl, Pagination, Button } from "react-bootstrap";

import { fetchUsers, searchUsers, sortUsers } from "../store/reducers/users";

import TableItem from "../components/TableItem";
import FormPopup from "../components/FormPopup";

const AllCandidates = (props) => {
  const pages = Array.from({ length: 5 }, (_, i) => i + 1);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isShowedPopup, setIsShowedPopup] = useState(false);

  useEffect(() => {
    let skip = 0;

    switch (page) {
      case 1:
        skip = 10;
        break;
      case 2:
        skip = 20;
        break;
      case 3:
        skip = 30;
        break;
      case 4:
        skip = 40;
        break;
      case 5:
        skip = 50;
        break;
      default:
        skip = 0;
        break;
    }

    props.fetchUsers({ limit: 30, skip: skip });
  }, [page]);

  const handleSort = (e) => {
    setPage(1);
    props.sortUsers(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    props.searchUsers(searchValue);
  };

  const showFormPopup = (value) => {
    setIsShowedPopup(value);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="d-flex mb-3 w-50">
          <InputGroup className=" mr-5">
            <InputGroup.Text id="inputGroup-sizing-default">Поиск</InputGroup.Text>
            <FormControl
              value={searchValue}
              onChange={handleSearch}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              placeholder="Введите имя или фамилию..."
            />
          </InputGroup>
          <Button onClick={() => showFormPopup(true)} className="mx-3 text-nowrap">
            Добавить кандидата
          </Button>
        </div>

        <div className="sort-by-block">
          <span className="sort-by-title">Сортировать по:</span>
          <select onChange={handleSort} className="sort-by-select">
            <option value="firstName">По имени</option>
            <option value="lastName">По фамилии</option>
            <option value="maidenName">По отчеству</option>
            <option value="birthDateMin">По дате рождения (min)</option>
            <option value="birthDateMax">По дате рождения (max)</option>
          </select>
        </div>
      </div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Дата Рождения</th>
          </tr>
        </thead>
        <tbody className="main-table">
          {props.users?.map((user) => (
            <TableItem key={user.id} data={user} />
          ))}
        </tbody>
      </Table>
      {searchValue.length === 0 && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First onClick={() => setPage(1)} />
            {pages.map((number) => (
              <Pagination.Item
                key={number}
                onClick={() => setPage(number)}
                active={number === page}
              >
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Last onClick={() => setPage(5)} />
          </Pagination>
        </div>
      )}

      {isShowedPopup && <FormPopup closePopup={() => showFormPopup()} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (limit) => dispatch(fetchUsers(limit)),
    searchUsers: (text) => dispatch(searchUsers(text)),
    sortUsers: (sortBy) => dispatch(sortUsers(sortBy))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCandidates);
