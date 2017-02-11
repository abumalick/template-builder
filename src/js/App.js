import React, { Component } from 'react';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import '../css/App.css';
import theme from '../../vendor/react-toolbox/theme';
import Templates from './Templates';
import Form from './Form';
import Result from './Result';

import templates from '../templates';

class App extends Component {
  constructor(props) {
    super(props);
    // We select default template:
    const curTemplate = Object.keys(templates)[0];

    // console.log(data);
    const createData = (template) => {
      // We create data
      const data = {};

      Object.entries(templates[template].fields).forEach(([field, fieldValue]) => {
        // if the field is an object, we have a list
        if (typeof fieldValue === 'object') {
          data[field] = [{}];
          Object.keys(fieldValue).forEach((subField) => {
            data[field][0][subField] = templates[template].defaults[field][subField] ? templates[template].defaults[field][subField] : '';
          });
          // fields:
        } else if (templates[template].defaults && templates[template].defaults[field]) {
          data[field] = templates[template].defaults[field];
        } else {
          data[field] = '';
        }
      });
      return data;
    };
    this.createData = template => (createData(template));
    // console.log(createData(curTemplate));
    this.state = { data: createData(curTemplate), template: curTemplate };
  }

  handleFieldChange = (field, value) => {
    if (typeof field === 'object') { // field : { field: field, index: index, subField: subField }
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [field.field]: [...this.state.data[field.field].slice(0, field.index), {
            ...this.state.data[field.field][field.index],
            [field.subField]: value,
          }, ...this.state.data[field.field].slice(field.index + 1)],
        },
      });
    } else {
      this.setState({ ...this.state, data: { ...this.state.data, [field]: value } });
    }
  }

  handleClick = (action, field, index) => {
    switch (action) {
      case '+': {
        const added = {};
        Object.keys(templates[this.state.template].fields[field]).forEach((subField) => {
          const lastIndex = this.state.data[field].length - 1;
          if (this.state.data[field][lastIndex]) {
            added[subField] = this.state.data[field][lastIndex][subField];
          } else if (templates[this.state.template].defaults[field][subField]) {
            added[subField] = templates[this.state.template].defaults[field][subField];
          }
        });
        // console.log(added);
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            [field]: [...this.state.data[field], added],
          },
        });
        break;
      }
      case '-': {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            [field]: [
              ...this.state.data[field].slice(0, index),
              ...this.state.data[field].slice(index + 1)],
          },
        });
        break;
      }
      default:
        // console.error('unknown action');
    }
  };
  handleTemplateChange = (template) => {
    this.setState({ template, data: this.createData(template) });
    // console.log(this.state.template);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header row around-xs around-sm">
          <div className="col-xs-12 col-sm-4">
            <h1>Template Builder</h1>
          </div>
          <div className="col-xs-12 col-sm-4">
            <Templates
              templates={Object.keys(templates).map(template => ({
                value: template,
                label: template,
              }))}
              template={this.state.template}
              onChange={this.handleTemplateChange}
            />
          </div>
        </div>
        <div className="row around-xs around-sm">
          <div className="col-xs-12 col-sm-4">
            <Form
              fields={templates[this.state.template].fields}
              data={this.state.data}
              onChange={this.handleFieldChange}
              onClick={this.handleClick}
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <Result data={this.state.data} template={templates[this.state.template]} />
          </div>
        </div>
      </div>
    );
  }
}

const AppThemed = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default AppThemed;
