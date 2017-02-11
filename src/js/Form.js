import React from 'react';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button/Button';
// import { AppBar } from 'react-toolbox/lib/app_bar/AppBar';

class Form extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  handleChange = (field, value) => {
    this.props.onChange(field, value);
  };

  handleClick = (action, key, index) => {
    // console.log([action, key, index]);
    this.props.onClick(action, key, index);
  }
  render() {
    const form = Object.keys(this.props.fields).map((field) => {
      if (typeof this.props.fields[field] === 'object') {
        const list = this.props.data[field].map((value, index) => {
          // console.log(this.props.data[field][index]);
          const item = Object.keys(this.props.fields[field]).map((subField) => {
            switch (this.props.fields[field][subField]) {
              case 'input':
              case 'file':
                return (<Input
                  key={`${field}-${subField + index}`}
                  type="text"
                  label={subField}
                  name={`${field}- ${subField + index}`}
                  value={this.props.data[field][index][subField]}
                  onChange={this.handleChange.bind(
                    this,
                    { field, index, subField },
                  )}
                  maxLength={100}
                />);
              case 'text':
                return (<Input
                  key={`${field}-${subField + index}`}
                  type="text"
                  label={subField}
                  name={`${field}-${subField + index}`}
                  value={this.props.data[field][index][subField]}
                  onChange={this.handleChange.bind(
                    this,
                    { field, index, subField },
                  )}
                  multiline
                  rows={10}
                />);
              default:
                return 0;
            }
          });
          return [<h4>{field.slice(0, field.length - 1)} {index + 1} <Button
            name={`-${field}`}
            onClick={this.handleClick.bind(this, '-', field, index)}
            label="-"
            flat primary
          /></h4>, ...item]; // icon='add'
        });
        return [<h3>{field}: <Button
          name={`+${field}`}
          onClick={this.handleClick.bind(this, '+', field)}
          label="+" flat primary
        /></h3>, ...list, <Button
          name={`+${field}`}
          onClick={this.handleClick.bind(this, '+', field)}
          label={`Add ${field.slice(0, field.length - 1)}`} flat primary
        />];
      }
      switch (this.props.fields[field]) {
        case 'input':
        case 'file':
          return (<Input
            key={field} type="text"
            label={field}
            name={field}
            value={this.props.data[field]}
            onChange={this.handleChange.bind(this, field)}
            maxLength={100}
          />);
        case 'text':
          return (<Input
            key={field}
            type="text" label={field} name={field} value={this.props.data[field]}
            onChange={this.handleChange.bind(this, field)}
            multiline
            rows={10}
          />);
        default:
          return 0;
      }
    });
    return (
      <section>
        { form }
      </section>
    );
  }
}

export default Form;
