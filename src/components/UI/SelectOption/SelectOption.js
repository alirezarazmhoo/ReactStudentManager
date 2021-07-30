import React, {Component} from 'react'

class SelectOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: this.props.list
    }
  }

  render() {
 let optionTemplate = this.props.list.map(v => (
      <option value={v.id}>{v.name}</option>
    ));



 return (
<select  onChange={this.props.handleChange}>
      {optionTemplate}
</select>
    );
  }
}

export default SelectOption;