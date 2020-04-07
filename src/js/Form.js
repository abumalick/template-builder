import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { Button } from "antd";

class Form extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };

  handleChange = (field, event) => {
    const value = event.target.value;

    this.props.onChange(field, value);
  };

  handleClick = (action, key, index) => {
    // console.log([action, key, index]);
    this.props.onClick(action, key, index);
  };
  render() {
    const form = Object.keys(this.props.fields).map((field) => {
      if (typeof this.props.fields[field] === "object") {
        return [
          <h3>
            {field}:{" "}
            <Button
              name={`+${field}`}
              onClick={this.handleClick.bind(this, "+", field)}
            >
              +
            </Button>
          </h3>,
          this.props.data[field].map((value, index) => {
            return [
              <h4 style={{ marginTop: 15 }}>
                {field.slice(0, field.length - 1)} {index + 1}{" "}
                <Button
                  name={`-${field}`}
                  onClick={this.handleClick.bind(this, "-", field, index)}
                >
                  -
                </Button>
              </h4>,
              Object.keys(this.props.fields[field]).map((subField) => {
                switch (this.props.fields[field][subField]) {
                  case "input":
                  case "file":
                    return (
                      <Input
                        key={`${field}-${subField + index}`}
                        type="text"
                        addonBefore={subField}
                        name={`${field}- ${subField + index}`}
                        value={this.props.data[field][index][subField]}
                        onChange={this.handleChange.bind(this, {
                          field,
                          index,
                          subField,
                        })}
                        maxLength={100}
                      />
                    );
                  case "text":
                    return (
                      <Input
                        key={`${field}-${subField + index}`}
                        type="text"
                        addonBefore={subField}
                        name={`${field}-${subField + index}`}
                        value={this.props.data[field][index][subField]}
                        onChange={this.handleChange.bind(this, {
                          field,
                          index,
                          subField,
                        })}
                        multiline
                        rows={10}
                        style={{ marginTop: 15 }}
                      />
                    );
                  default:
                    return 0;
                }
              }),
            ];
          }),
          <Button
            name={`+${field}`}
            onClick={this.handleClick.bind(this, "+", field)}
          >
            {`Add ${field.slice(0, field.length - 1)}`}
          </Button>,
        ];
      }
      switch (this.props.fields[field]) {
        case "input":
        case "file":
          return (
            <Input
              key={field}
              type="text"
              addonBefore={field}
              name={field}
              value={this.props.data[field]}
              onChange={this.handleChange.bind(this, field)}
              maxLength={100}
              style={{ marginTop: 15 }}
            />
          );
        case "text":
          return (
            <Input
              key={field}
              type="text"
              addonBefore={field}
              name={field}
              value={this.props.data[field]}
              onChange={this.handleChange.bind(this, field)}
              multiline
              rows={10}
              style={{ marginTop: 15 }}
            />
          );
        default:
          return 0;
      }
    });
    return <section>{form}</section>;
  }
}

export default Form;
