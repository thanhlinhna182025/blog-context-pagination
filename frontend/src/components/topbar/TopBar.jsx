import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { BASEURL } from "../../context/Contains";

const TopBar = () => {
  const { user, dispatch, darkmode } = useContext(Context);
  const PF = `${BASEURL}/images/`;
  const [mobileBar, setMobileBar] = useState(false);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const handleToggle = () => {
    dispatch({ type: "SET_DARMODE" });
  };

  return (
    <div>
      <div>
        <div
          className="top"
          style={{ backgroundColor: darkmode ? "var(--orange)" : "" }}
        >
          <div className="topLeft">
            <div className="toggle">
              <i className="fa-solid fa-sun"></i>
              <i className="fa-solid fa-moon"></i>
              <div
                className="toggleButton"
                onClick={handleToggle}
                style={{ left: darkmode ? "24px" : "2px" }}
              ></div>
            </div>
          </div>
          {mobileBar ? (
            <i
              className="mobileBarIcon fa-solid fa-xmark"
              onClick={() => {
                setMobileBar(false);
              }}
            ></i>
          ) : (
            <i
              className="mobileBarIcon fa-solid fa-bars"
              onClick={() => {
                setMobileBar(true);
              }}
            ></i>
          )}

          {mobileBar ? (
            <div className="mobileBar">
              <div className="mobileItem">
                <ul className="topList">
                  <li className="topListItem">
                    <Link to="/" className="link">
                      Trang chủ
                    </Link>
                  </li>
                  <li className="topListItem">
                    <Link to="/about" className="link">
                      Thông tin
                    </Link>
                  </li>
                  <li className="topListItem">
                    <Link to="/contact" className="link">
                      Liên hệ
                    </Link>
                  </li>
                  <li className="topListItem">
                    <Link to="/write" className="link">
                      Đăng bài
                    </Link>
                  </li>
                  <li className="topListItem" onClick={handleLogout}>
                    {user && "Đăng Xuất"}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="topCenter">
            <ul className="topList">
              <li className="topListItem">
                <Link to="/" className="link">
                  Trang chủ
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/about" className="link">
                  Thông tin
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/contact" className="link">
                  Liên hệ
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/write" className="link">
                  Đăng bài
                </Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>
                {user && "Đăng Xuất"}
              </li>
            </ul>
          </div>
          <div className="topRight">
            {user ? (
              <div className="userContainer">
                <span
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Hello : {user.username}
                </span>
                <Link to="/settings">
                  <img
                    src={PF + user.profilePic}
                    alt="myphoto"
                    className="topImg"
                  />
                </Link>
              </div>
            ) : (
              <ul className="topList">
                <li className="topListItem">
                  <Link to="/login" className="link">
                    Đăng nhập
                  </Link>
                </li>
                <li className="topListItem">
                  <Link to="/register" className="link">
                    Đăng kí
                  </Link>
                </li>
              </ul>
            )}

            <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
