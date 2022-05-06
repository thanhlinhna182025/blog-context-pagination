import "./write.css";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useHistory } from "react-router-dom";
import { BASEURL } from "../../context/Contains";
import { useFormik } from "formik";
import * as Yup from "yup";
import ElertMessage from "../../components/popupmodal/ElertMessage";

const Write = () => {
  const [file, setFile] = useState(null);
  const { user, categories } = useContext(Context);
  const [popUpModal, setPopUpModal] = useState({
    type: "normal",
    message: "No problem",
  });
  const [elert, setElert] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      desc: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Title is required")
        .max(250, "Title maximum 250 character"),
      category: Yup.string().required("Category is required"),
      desc: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      const { title, category, desc } = values;
      const newPost = {
        title,
        category,
        desc,
        username: user.username,
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = filename;
        try {
          await axios.post(`${BASEURL}/api/upload`, data);
        } catch (error) {
          console.log("error", error);
        }
      }
      try {
        const res = await axios.post(`${BASEURL}/api/posts`, newPost);
        console.log(res.data);
        if (res.data.success) {
          setElert(true);
          setPopUpModal({
            type: "normal",
            message: res.data.message,
          });
          setTimeout(() => {
            setElert(false);
            history.push("/");
          }, 3000);
        }
      } catch (error) {
        setElert(true);
        setPopUpModal({
          type: "danger",
          message: error.response.data.message,
        });
        setTimeout(() => {
          setElert(false);
        }, 3000);
      }
    },
  });

  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="writeImg"
          className="writeImg"
        />
      )}

      <form className="writeForm" onSubmit={formik.handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <input
            type="text"
            placeholder="Tiêu đề bài viết"
            className="writeInput"
            autoFocus={true}
            name="title"
            value={formik.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && formik.touched.title && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                position: "absolute",
                bottom: "-10px",
                left: "50px",
              }}
            >
              {formik.errors.title}
            </p>
          )}
        </div>
        <div className="writeFormGroup" style={{ padding: "20px" }}>
          <label>Chủ đề :</label>
          <select
            className="catSelect"
            name="category"
            value={formik.category}
            onChange={formik.handleChange}
          >
            {categories?.map((cat) => (
              <option className="catOption" value={cat.name} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {formik.errors.category && formik.touched.category && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                position: "absolute",
                bottom: "-15px",
                left: "50px",
              }}
            >
              {formik.errors.category}
            </p>
          )}
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Nội dung ..."
            type="text"
            className="writeInput writeText"
            name="desc"
            value={formik.desc}
            onChange={formik.handleChange}
          ></textarea>
          {formik.errors.desc && formik.touched.desc && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                position: "absolute",
                bottom: "5px",
                left: "50px",
              }}
            >
              {formik.errors.desc}
            </p>
          )}
        </div>
        <button className="writeSubmit" type="submit">
          Đăng Bài
        </button>
      </form>
      {elert ? <ElertMessage info={popUpModal} /> : ""}
    </div>
  );
};

export default Write;
