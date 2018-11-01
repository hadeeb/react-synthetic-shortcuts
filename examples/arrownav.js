import React, { Component, createRef, Children, cloneElement } from "react";
import { Shortcuts } from "../src";

class ArrowNav extends Component {
  constructor() {
    super();
    this.childRef = createRef();
    this.handleKeys = this.handleKeys.bind(this);
    this.state = { active: 0, children: null };
  }
  handleKeys(action, event) {
    event.stopPropagation();
    const { children } = this.props;
    const count = Children.count(children);
    switch (action) {
      case "UP":
        this.setState(({ active }) => {
          const newActive = (active - 1 + count) % count;
          return {
            active: newActive,
            children: this.renderChildren(newActive)
          };
        });
        break;
      case "DOWN":
        this.setState(({ active }) => {
          const newActive = (active + 1) % count;
          return {
            active: newActive,
            children: this.renderChildren(newActive)
          };
        });
        break;
    }
  }

  renderChildren(active) {
    const { children } = this.props;
    return Children.map(children, (child, index) =>
      cloneElement(child, {
        tabIndex:
          active === index ? Math.max(0, child.props.tabIndex || 0) : -1,
        onClick: e => {
          this.setState(() => ({ active: index }));
          if (child.props.onClick) child.props.onClick(e);
        }
      })
    );
  }

  componentDidUpdate(prevProps, { active: prevActive }) {
    const { active } = this.state;
    if (prevActive !== active) {
      if (this.childRef.current.children.length > active) {
        this.childRef.current.children[active].focus();
      }
    }
  }

  componentDidMount() {
    this.setState({ children: this.renderChildren(0) });
  }
  render() {
    return (
      <Shortcuts ref={this.childRef} name="NAV" handler={this.handleKeys}>
        {this.state.children}
      </Shortcuts>
    );
  }
}

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

const list = ["Apple", "HP", "Dell", "Lenovo", "Epson"];

const Container = () => (
  <ArrowNav>
    {list.map(item => (
      <Item key={item} onClick={() => console.log(item)}>
        {item}
      </Item>
    ))}
  </ArrowNav>
);
export default Container;
