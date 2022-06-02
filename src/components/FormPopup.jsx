import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addNewUser } from "../store/reducers/users";

import { Button, Form } from "react-bootstrap";
import CloseSvg from "./common/CloseSvg";

const FormPopup = (props) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      maidenName: "",
      birthDate: ""
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Введите имя кандидата"),
      lastName: Yup.string().required("Введите фамилию"),
      maidenName: Yup.string().required("Введите отчество"),
      birthDate: Yup.string().required("Введите дату рождения")
    }),
    onSubmit: (values) => {
      props.addNewUser({ ...values, id: Date.now() });
    }
  });

  const closePopup = () => {
    props.closePopup();
  };

  return (
    <div className="position-fixed fixed-top d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-50">
      <Form
        onSubmit={formik.handleSubmit}
        className="w-25 bg-light p-3 border p-3 position-relative"
      >
        <div className="close-icon-wrapper" onClick={closePopup}>
          <CloseSvg className="close-icon" />
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            id="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Имя кандидата"
          />
          <div className="error-style">{formik.touched.firstName && formik.errors.firstName}</div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            id="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Фамилия кандидата"
          />
          <div className="error-style">{formik.touched.lastName && formik.errors.lastName}</div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Отчество</Form.Label>
          <Form.Control
            id="maidenName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.maidenName}
            type="text"
            placeholder="Отчество кандидата"
          />
          <div className="error-style">{formik.touched.maidenName && formik.errors.maidenName}</div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control
            id="birthDate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthDate}
            type="text"
            placeholder="Дата рождения кандидата"
          />
          <div className="error-style">{formik.touched.birthDate && formik.errors.birthDate}</div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewUser: (user) => dispatch(addNewUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPopup);
