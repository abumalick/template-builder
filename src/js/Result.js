import React from 'react';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

const compileHandlebars = require('handlebars').compile;
const marked = require('marked');

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => `<a target="_blank" href="${href}">${text}</a>`;

class Result extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    template: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      fixedIndex: 0,
    };
  }

  filter = (oData) => {
    const data = {};
    Object.entries(oData).forEach(([field, fieldValue]) => {
      if (this.props.template.fields[field] === 'text') {
        data[field] = marked(oData[field], { renderer });
      } else if (typeof fieldValue === 'object') {
        data[field] = [];
        fieldValue.forEach((item, index) => {
          data[field][index] = {};
          Object.keys(fieldValue[index]).forEach((subField) => {
            data[field][index][subField] = fieldValue[index][subField].replace('~', index + 1);
          });
        });
      } else {
        data[field] = oData[field];
      }
    });
    return data;
  }

  handleFixedTabChange = (index) => {
    this.setState({ fixedIndex: index });
  };

  render() {
    const template = compileHandlebars(this.props.template.template);
    const html = template(this.filter(this.props.data));
    return (
      <section>
        <Tabs index={this.state.fixedIndex} onChange={this.handleFixedTabChange} fixed>
          <Tab label="Code"><pre>{html}</pre></Tab>
          <Tab label="Preview"><div dangerouslySetInnerHTML={{ __html: html }} /></Tab>
        </Tabs>
      </section>
    );
  }
}

export default Result;
