import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "./Form";
import About from "./About";
function App() {
  return (
    <>
      <Router>
        <nav>
          <ul className="navigation">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/form">App</Link>
            </li>
          </ul>

          <hr />

          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <h1>Do you have Diabetes?</h1>
              <p>Welcome to the app, please visit it here: </p>
              <Link to="/form">App</Link>
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/form">
              <Form />
            </Route>
          </Switch>
        </nav>
      </Router>
      <div></div>
    </>
  );
}
export default App;
