import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, Form } from "react-bootstrap";
import CloseSvg from "./common/CloseSvg";

const FormPopup = (props) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: ""
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Введите имя"),
      lastName: Yup.string().required("Введите фамилию"),
      maidenName: Yup.string().required("Введите отчество"),
      birthDate: Yup.string().required("Введите дату рождения")
    }),
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    }
  });

  const closePopup = () => {
    console.log("yooo");
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Имя</Form.Label>
          <Form.Control type="text" placeholder="Имя кандидата" />
          <Form.Text className="error-color">{formik.errors.firstName}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control type="text" placeholder="Фамилия кандидата" />
          <Form.Text className="error-color">{formik.errors.lastName}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Отчество</Form.Label>
          <Form.Control type="text" placeholder="Отчество кандидата" />
          <Form.Text className="error-color">{formik.errors.firstName}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Дата рождения</Form.Label>
          <Form.Control type="text" placeholder="Дата рождения кандидата" />
          <Form.Text className="error-color">{formik.errors.firstName}</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default FormPopup;
