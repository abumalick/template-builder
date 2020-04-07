import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

class Templates extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    templates: PropTypes.array.isRequired,
    template: PropTypes.string.isRequired,
  };

  handleChange = (template) => {
    this.props.onChange(template);
  };

  render() {
    const { templates, template } = this.props;
    return (
      <Select
        value={template}
        style={{ width: "100%", marginTop: 15 }}
        onChange={this.handleChange}
      >
        {templates.map((template) => {
          return (
            <Option value={template} key={template}>
              {template}
            </Option>
          );
        })}
      </Select>
    );
  }
}

export default Templates;
