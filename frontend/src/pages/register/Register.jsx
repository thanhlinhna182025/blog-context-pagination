import "./register.css";
import { Link } from "react-router-dom";
import { BASEURL } from "../../context/Contains";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ElertMessage from "../../components/popupmodal/ElertMessage";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Register = () => {
  const { dispatch, error } = useContext(Context);
  const [postUpModal, setPostUpModal] = useState({
    type: "normal",
    message: "No problem",
  });
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username at least 3 character ")
        .max(30, "Username maximum 30 character")
        .required("Username is required"),
      email: Yup.string().email().required("Invalid email format"),
      password: Yup.string()
        .min(4, "Password at least 4 character ")
        .max(8, "Password maximum 8 character")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      dispatch({ type: "REGISTER_START" });
      try {
        const res = await axios.post(`${BASEURL}/api/auth/register`, values);
        if (res.data.success) {
          dispatch({ type: "REGISTER_SUCCESS" });
          history.push("/login");
        }
      } catch (err) {
        dispatch({ type: "REGISTER_FAILURE" });
        setPostUpModal({ type: "danger", message: err.response.data.message });
      }
    },
  });

  return (
    <div className="register">
      <span className="registerTitle">Đăng kí</span>
      <form className="registerForm" onSubmit={formik.handleSubmit}>
        <label>Tên đăng nhập</label>
        <input
          type="text"
          placeholder="Nhập tên đăng nhập"
          className="registerInput"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {formik.errors.username}
          </p>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="registerInput"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <p
            style={{
              color: "red",
              fontSize: "14px",
            }}
          >
            {formik.errors.email}
          </p>
        )}

        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          className="registerInput"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.password}
          </p>
        )}

        <button className="registerButton" type="submit">
          Đăng kí
        </button>
        <button className="registerLoginButton">
          <Link to="/login" className="link" type="submit">
            Đăng nhập
          </Link>
        </button>
      </form>
      {error ? (
        <ElertMessage info={postUpModal} style={{ display: "block" }} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Register;
