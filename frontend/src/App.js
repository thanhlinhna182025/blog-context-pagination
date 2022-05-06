import "./app.css";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import UpdatePost from "./pages/updatepost/UpdatePost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import "./app.css";
import Category from "./pages/category/Category";

function App() {
  const { user, darkmode } = useContext(Context);

  return (
    <div
      className="app"
      style={{
        backgroundColor: darkmode ? "black" : "white",
        color: darkmode ? "white" : "var(--black)",
      }}
    >
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">{user ? <Home /> : <Register />}</Route>
          <Route path="/login">{user ? <Home /> : <Login />}</Route>
          <Route path="/write">{user ? <Write /> : <Register />}</Route>
          <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
          <Route path="/post/update/:postId">
            {user ? <UpdatePost /> : <Login />}
          </Route>
          <Route path="/post/:postId">
            <Single />
          </Route>
          <Route path="/posts/:category">
            <Category />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
