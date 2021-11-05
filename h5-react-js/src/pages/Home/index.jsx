import React, { Component } from "react";
import { Route } from "react-router-dom";

import { TabBar } from "antd-mobile";

import Index from "../Index";
import Book from "../Book";
import My from "../My";

import classicIcon from "@/images/tab/classic.png";
import classicSelectedIcon from "@/images/tab/classic@highlight.png";
import bookIcon from "@/images/tab/book.png";
import bookSelectedIcon from "@/images/tab/book@highlight.png";
import myIcon from "@/images/tab/my.png";
import mySelectedIcon from "@/images/tab/my@highlight.png";

import "./index.css";

// TabBar 数据
const tabItems = [
  {
    title: "流行",
    icon: classicIcon,
    selectedIcon: classicSelectedIcon,
    path: "/home",
  },
  {
    title: "书籍",
    icon: bookIcon,
    selectedIcon: bookSelectedIcon,
    path: "/home/book",
  },
  {
    title: "喜欢",
    icon: myIcon,
    selectedIcon: mySelectedIcon,
    path: "/home/my",
  },
];

class App extends Component {
  state = {
    selectedTab: this.props.location.pathname,
  };

  // 渲染 TabBar.Item
  renderTabBarItem() {
    return tabItems.map((item) => (
      <TabBar.Item
        icon={<img className="icon" src={item.icon} />}
        selectedIcon={<img className="icon" src={item.selectedIcon} />}
        title={item.title}
        key={item.title}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.setState({
            selectedTab: item.path,
          });
          // 路由切换
          this.props.history.push(item.path);
        }}
      ></TabBar.Item>
    ));
  }

  render() {
    return (
      <div className="home">
        {/* 渲染子路由 */}
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/book" component={Book}></Route>
        <Route path="/home/my" component={My}></Route>

        {/* TabBar */}
        <TabBar tintColor="#333" noRenderContent={true} barTintColor="white">
          {this.renderTabBarItem()}
        </TabBar>
      </div>
    );
  }
}

export default App;
