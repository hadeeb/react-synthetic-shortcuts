import React, { Component } from "react";
import { Shortcuts } from "../src";

import TestComp from "./gchild";
import ArrowNav from "./arrownav";

class ChildComponent extends Component {
  constructor() {
    super();
    this.state = {
      letter: "QWERTYUIOP",
      count: 0
    };
    this.handle_keys = this.handle_keys.bind(this);
  }
  handle_keys(action) {
    this.setState(function(prev) {
      return { letter: action, count: prev.count + 1 };
    });
  }
  render() {
    const { text } = this.props;
    return (
      <Shortcuts name="TEST" handler={this.handle_keys}>
        <div>{text}</div>
        <div>{this.state.count}</div>
        <div>{this.state.letter}</div>
        <input />
        <TestComp />
        <ArrowList />
      </Shortcuts>
    );
  }
}

export default ChildComponent;

const list = ["Apple", "HP", "Dell", "Lenovo", "Epson"];

const ArrowList = () => (
  <ArrowNav>
    {list.map(item => (
      <Item key={item} onClick={() => console.log(item)}>
        {item}
      </Item>
    ))}
  </ArrowNav>
);

const Item = ({ tabIndex, children, onClick }) => (
  <Shortcuts
    name="GLO"
    handler={(action, event) => event.stopPropagation()}
    tabIndex={tabIndex}
    onClick={onClick}
  >
    {children}
  </Shortcuts>
);
