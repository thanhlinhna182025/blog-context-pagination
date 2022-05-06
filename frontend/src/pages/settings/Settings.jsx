import "./settings.css";
import Sidebar from "../../components/sidebar/SizeBar";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { BASEURL } from "../../context/Contains";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [alertMessage, setElertMessage] = useState({
    success: false,
    message: "",
  });
  const history = useHistory();
  const PF = `${BASEURL}/images/`;
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
      dispatch({ type: "UPDATE_START" });
      const { username, email, password } = formik.values;
      const userUpdate = { userId: user._id, username, email, password };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        userUpdate.profilePic = filename;
        try {
          await axios.post(`${BASEURL}/api/upload`, data);
        } catch (error) {
          console.log(error);
          setElertMessage({
            success: false,
            message: "Please try again later",
          });
        }
      }

      try {
        const res = await axios.put(
          `${BASEURL}/api/users/` + user._id,
          userUpdate
        );
        if (res.data.success) {
          dispatch({ type: "UPDATE_SUCCESS", payload: res.data.user });
          setElertMessage({
            success: true,
            message: res.data.message,
          });
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      } catch (error) {
        dispatch({ type: "UPDATE_FAILURE" });
        setElertMessage({
          success: true,
          message: error.response.data.message,
        });
      }
    },
  });
  const handleDeleteAcount = async () => {
    window.confirm("Do you want delete account and all post by this account");
    try {
      const res = await axios.delete(`${BASEURL}/api/users/${user._id}`, {
        data: { userId: user._id },
      });
      if (res.data.success) {
        dispatch({ type: "DELETE_USER" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Cập nhật tài khoản</span>
          <span className="settingsDeleteTitle" onClick={handleDeleteAcount}>
            Xóa tài khoản
          </span>
        </div>
        <form className="settingsForm" onSubmit={formik.handleSubmit}>
          <label>Hình đại diện</label>
          <div className="settingsPP">
            <img className="postImage"
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt="avata"
            />
            <label htmlFor="fileInputPP">
              <i className="settingsPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInputPP"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <label>Tên tài khoản</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.username}
            </p>
          )}
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.email}
            </p>
          )}

          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {formik.errors.password}
            </p>
          )}
          {alertMessage.success ? (
            <span
              style={{ color: "blue", fontSize: "18px", fontWeight: "bold" }}
            >
              {alertMessage.message}
            </span>
          ) : (
            ""
          )}

          <button className="settingsButton" type="submit">
            Cập nhật
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
