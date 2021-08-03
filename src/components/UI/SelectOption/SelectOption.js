import React, {Component} from 'react'

class SelectOption extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: this.props.list , 
    
    }
  }

  render() {
let choosedItem = this.props.choosedItem;

 let optionTemplate = this.props.list.map(function callbackFn(element, index) { 
   
   if(element.id ==  choosedItem){
 return  <option  selected  value={element.id}>{element.name}</option>
   }
   else{

 return  <option    value={element.id}>{element.name}</option>

   }
})



 return (
<select  onChange={this.props.handleChange}>
      {optionTemplate}
</select>
    );
  }
}

export default SelectOption;