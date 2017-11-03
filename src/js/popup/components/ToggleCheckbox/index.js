import React, { Component } from 'react';
import './stylesheet.css';

export default class ToggleCheckbox extends Component {
  handleChange = (e) => {
    this.props.onChange(e.target.checked);
  }

  render() {
    const {
      checked,
      enableText,
      disableText
    } = this.props;

    return (
      <label className="toggle-checkbox">
        <input type="checkbox" checked={checked} onChange={this.handleChange} />
        <div className="toggle-bg"><div className="toggle-btn"></div></div>
      </label>
    );
  }
}
