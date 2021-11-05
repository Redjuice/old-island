import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Home from "@/pages/Home";

function App() {
  return (
    <Router>
      <div className="app">
        {/* 路由重定向 */}
        <Route path="/" exact render={() => <Redirect to="/home" />}></Route>

        {/* 配置路由 */}
        <Route path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
