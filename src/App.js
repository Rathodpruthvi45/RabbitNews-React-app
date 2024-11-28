import "./App.css";
import NavBar from "./components/NavBar";
import React, { Component } from "react";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 10,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          {/* Wrap all <Route> components inside <Routes> */}
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <News
                  apiKey={this.apiKey}
                  key="general"
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="general"
                />
              }
            />
            <Route
              path="/business"
              exact
              element={
                <News
                  apiKey={this.apiKey}
                  key="business"
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="business"
                />
              }
            />
            <Route
              path="/entertainment"
              exact
              element={
                <News
                  apiKey={this.apiKey}
                  key="entertainment"
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="entertainment"
                />
              }
            />
            <Route
              path="/health"
              exact
              element={
                <News
                  apiKey={this.apiKey}
                  key="health"
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              exact
              element={
                <News
                  key="science"
                  apiKey={this.apiKey}
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="science"
                />
              }
            />
            <Route
              path="/sports"
              exact
              element={
                <News
                  apiKey={this.apiKey}
                  key="sports"
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  apiKey={this.apiKey}
                  key="technology"
                  setProgress={this.setProgress}
                  pageSize={5}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
