import { useState } from "react";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";

import { deleteUser } from "../store/reducers/users";

const TableItem = (props) => {
  const [editUserId, setEditUserId] = useState(null);
  const [userFirstName, setUserFirstName] = useState(props.data.firstName);
  const [userLastName, setUserLastName] = useState(props.data.lastName);
  const [userMaidenName, setUserMaidenName] = useState(props.data.maidenName);
  const [userBirthDate, setUserBirthDate] = useState(props.data.birthDate);

  const deleteUser = (id) => {
    props.deleteUser(id);
  };

  const editUser = (id) => {
    !editUserId ? setEditUserId(id) : setEditUserId(null);
  };

  const changeFirstName = (e) => {
    setUserFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setUserLastName(e.target.value);
  };

  const changeMaidenName = (e) => {
    setUserMaidenName(e.target.value);
  };

  const changeBirthDate = (e) => {
    setUserBirthDate(e.target.value);
  };

  return (
    <tr key={props.data.id} className={`${editUserId !== props.data.id ? "item-not-edit" : ""}`}>
      <td>
        <input
          type="text"
          onChange={changeFirstName}
          value={userFirstName}
          disabled={editUserId !== props.data.id}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={changeLastName}
          value={userLastName}
          disabled={editUserId !== props.data.id}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={changeMaidenName}
          value={userMaidenName}
          disabled={editUserId !== props.data.id}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={changeBirthDate}
          value={userBirthDate}
          disabled={editUserId !== props.data.id}
        />
      </td>
      <td className="edit-column">
        <Button size="sm" onClick={() => deleteUser(props.data.id)}>
          Удалить
        </Button>
        <Button size="sm" onClick={() => editUser(props.data.id)}>
          {editUserId ? "Сохранить" : "Редактировать"}
        </Button>
      </td>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableItem);
