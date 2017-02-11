import React from 'react';
import Dropdown from 'react-toolbox/lib/dropdown';

class Templates extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    templates: React.PropTypes.array.isRequired,
    template: React.PropTypes.string.isRequired,
  }

  handleChange = (template) => {
    this.props.onChange(template);
  };

  render() {
    return (
      <Dropdown
        auto
        onChange={this.handleChange}
        source={this.props.templates}
        value={this.props.template}
      />
    );
  }
}

export default Templates;
