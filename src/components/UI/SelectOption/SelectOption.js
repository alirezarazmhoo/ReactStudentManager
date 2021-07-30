import React, {Component} from 'react'

class SelectOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: [{id:1 , name : 'کارشناسی'},{id:2 , name : 'دکتری'}]
    }
  }
  render() {
 let optionTemplate = this.state.item.map(v => (
      <option value={v.id}>{v.name}</option>
    ));
 return (
<select name="major" value={this.state.item[]} >
      {optionTemplate}
</select>
    );
  }
}

export default SelectOption;