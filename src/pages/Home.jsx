import { Link } from "react-router-dom";

import { Table, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { useEffect } from "react";

import { fetchUsers } from "../store/reducers/users";

const Home = (props) => {
  useEffect(() => {
    props.fetchUsers({ limit: 10 });
  }, []);

  return (
    <>
      <h1 className="main-title">Привет User!</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Дата Рождения</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.maidenName}</td>
                <td>{user.birthDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="btn-wrapper">
        <Link to="/all-candidates">
          <Button className="show-all-btn" variant="success">
            Посмотреть всех кандидатов
          </Button>
        </Link>
      </div>
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
    fetchUsers: (limit) => dispatch(fetchUsers(limit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
