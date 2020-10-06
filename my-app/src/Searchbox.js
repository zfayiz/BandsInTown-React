import React, { Component } from "react";
import "./Searchbox.css";

class Searchbox extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  onKeyPress(event) {
    if (event.key === "Enter") {
      this.props.onKeyDown();
    }
  }

  render() {
    return (
      <div className="Searchbox">
        <input
          type="text"
          placeholder="Search artist"
          onChange={this.onChange}
          onKeyDown={this.onKeyPress}
        />
      </div>
    );
  }
}

export default Searchbox;
