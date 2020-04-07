import React from "react";
import { Tabs } from "antd";

import PropTypes from "prop-types";

const { TabPane } = Tabs;
const compileHandlebars = require("handlebars").compile;
const marked = require("marked");

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}">${text}</a>`;

class Result extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    template: PropTypes.object.isRequired,
  };

  filter = (oData) => {
    const data = {};
    Object.entries(oData).forEach(([field, fieldValue]) => {
      if (this.props.template.fields[field] === "text") {
        data[field] = marked(oData[field], { renderer });
      } else if (typeof fieldValue === "object") {
        data[field] = [];
        fieldValue.forEach((item, index) => {
          data[field][index] = {};
          Object.keys(fieldValue[index]).forEach((subField) => {
            data[field][index][subField] = fieldValue[index][subField].replace(
              "~",
              index + 1
            );
          });
        });
      } else {
        data[field] = oData[field];
      }
    });
    return data;
  };

  render() {
    const template = compileHandlebars(this.props.template.template);
    const html = template(this.filter(this.props.data));
    return (
      <section>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Code" key="1">
            <pre>{html}</pre>
          </TabPane>
          <TabPane tab="Preview" key="2">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </TabPane>
        </Tabs>
      </section>
    );
  }
}

export default Result;
