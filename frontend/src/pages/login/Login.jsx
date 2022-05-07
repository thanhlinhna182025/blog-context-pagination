import "./login.css";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import { BASEURL } from "../../context/Contains";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";

const Login = () => {
  const { dispatch, isFetching, error } = useContext(Context);
  const [elertMessage, setElertMessage] = useState("");
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axios.post(`${BASEURL}/api/auth/login`, values);
        if (res.data.success) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        }
        history.push("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
        setElertMessage(err.response.data.message);
      }
    },
  });

  return (
    <div className="login">
      <span className="loginTitle">Đăng Nhập</span>
      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <label>Tên đăng nhập</label>
        <input
          type="text"
          placeholder="Nhập tên đăng nhập"
          className="loginInput"
          name="username"
          onChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.username}
          </p>
        )}
        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          className="loginInput"
          name="password"
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {formik.errors.password}
          </p>
        )}
        {error ? (
          <span style={{ color: "red", marginTop: "5px" }}>{elertMessage}</span>
        ) : (
          ""
        )}
        <button className="loginButton" type="submit" disabled={isFetching}>
          Đăng nhập
        </button>
      </form>

      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Đăng kí
        </Link>
      </button>
    </div>
  );
};

export default Login;
