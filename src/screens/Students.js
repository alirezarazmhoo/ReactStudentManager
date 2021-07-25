
import React, { Component } from 'react';
import './studentstyle.css';
import Input from '../components/UI/Input/Input';
import Table from '../components/UI/Table/Table';
import Modal from '../components/UI/Modal/Modal';

import axios from '../axios';
import MModal from '../components/UI/Modal/Modal';

class Students extends Component {



  state= {
orderForm :{
         name: {
                elementType: 'input',
                label : 'نام:',
                 elementConfig: {
                    type: 'text',
                placeholder: 'نام خود را وارد کنید '
                },
                value: '',
                validation :{
                  required :true , 
                  minLenght :5,
                  maxLenght :15
                },
                 valid : false , 
                 touched :false
            },
       
             lastname: {
                elementType: 'input',
                label : 'نام خانوادگی:',
                 elementConfig: {
                    type: 'text',
                placeholder: 'نام خانوادگی خود را وارد کنید '
                },

                value: '',
                validation :{
                  required :true,
                    minLenght :5,
                  maxLenght :15
                },
                 valid : false,
                    touched :false

            },
             nationalcode: {
                elementType: 'input',
                label : 'کدملی:',
                 elementConfig: {
                    type: 'text',
                placeholder: 'کدملی  خود را وارد کنید '
                },
                value: '',
                validation :{
                  required :true,
                    minLenght :10,
                  maxLenght :10
                },
                 valid : false,
                    touched :false

            },
                 adddress: {
                elementType: 'textarea',
                label : 'آدرس:',
                 elementConfig: {
                    type: 'text',
                placeholder: 'آدرس  خود را وارد کنید '
                },
                value: '',
                validation :{
                  required :true,
                    minLenght :20,
                  maxLenght :20
                },
                 valid : false,
               touched :false, 
            },
                  search: {
                elementType: 'input',             
                value: '',
                validation :{
                  required :true,
                    minLenght :20,
                  maxLenght :20
                },
                 valid : false,
               touched :false, 
            }
      
} , 
realstudents :[], 
modalShow :false ,
editMode : false,
studentselectedid : 0,
txtSearchValue : '' , 
pageNumber : 1,
hasNext :true
  };

componentDidMount(){

 axios.get('Students?pageNumber='+this.state.pageNumber ).then(response => {
   this.setState({realstudents :response.data.students})
     this.setState({hasNext :response.data.hasNext})
   }); 
 }

remove = (e) => {

   axios.post('Students/DeleteStudent/'+this.state.studentselectedid+'').then(response => {
   this.componentDidMount();
   this.closeModal();
   this.resetForm();
  }); 
}
inputUserHandler(event , inputIdentifier){
const updatedOrderForm  = {...this.state.orderForm};
const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
};
updatedFormElement.value = event.target.value;
updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
updatedFormElement.touched = true ; 
updatedOrderForm[inputIdentifier] = updatedFormElement;
this.setState({orderForm: updatedOrderForm});
console.log(updatedFormElement);
}

checkValidity(value , rules){
  let isValid= false ; 
if(rules.required){

isValid = value.trim() !== '';
if(rules.minLenght){
  
  isValid = value.length >= rules.minLenght && isValid;

}
if(rules.maxLenght){
  isValid = value.length <= rules.maxLenght && isValid;
}

return isValid;
}
else{
  return true ; 
}
}

edit = (e) =>{
 const updatedOrderForm  ={...this.state.orderForm};
 let i = 5;
 for (const key in updatedOrderForm) {
   i-- ; 
const updatedFormElement = { 
            ...updatedOrderForm[key]
};
updatedFormElement.value = e.target.parentNode.parentNode.parentNode.rows[e.target.parentNode.parentNode.rowIndex].cells[i].innerHTML;
 updatedOrderForm[key] = updatedFormElement;
this.setState({orderForm: updatedOrderForm});
    
   }

this.setState({editMode: true});
this.setState({studentselectedid: e.target.parentNode.parentNode.id});
}
resetForm = () => {

 const updatedOrderForm  ={...this.state.orderForm};
 for (const key in updatedOrderForm) {
const updatedFormElement = { 
            ...updatedOrderForm[key]
};
updatedFormElement.value = '';
 updatedOrderForm[key] = updatedFormElement;
this.setState({orderForm: updatedOrderForm});

   }
this.setState({editMode: false});
this.setState({studentselectedid: 0});
}


postDataHandler = ()=> {
  
const post = {
name :this.state.orderForm.name.value ,
lastname : this.state.orderForm.lastname.value , 
nationalcode : this.state.orderForm.nationalcode.value , 
address : this.state.orderForm.adddress.value,
id :this.state.studentselectedid
}

  axios.post(this.state.editMode? "Students/EditStudent" : "Students", post).then(response => {
    this.resetForm();
   this.componentDidMount();
   console.log(response)
  }); 

}

filltxtSearch = (e)=>{
  this.setState({txtSearchValue : e.target.value});

}



search = () =>{
axios.get('Students?txtSearch='+this.state.txtSearchValue).then(response => {
  this.setState({realstudents :[]})
  this.setState({realstudents :response.data.students})
  this.setState({txtSearchValue : ''});

  }); 
}
 question = (e) => {
   this.setState({showModal: true});
   this.setStudentId(e.target.parentNode.parentNode.id)
  };
closeModal = ()=>{
   this.setState({showModal: false})
}
setStudentId = (id) => {
this.setState({studentselectedid : id})
}

 nextPage = ()=> {

var oldstate = this.state.pageNumber;

oldstate += 1 ; 
this.setState({pageNumber : oldstate});

 if(this.state.hasNext == true){
 let newpagenumber = this.state.pageNumber +1 ; 
  this.setState({pageNumber : newpagenumber })
 this.componentDidMount()
 }

}
previousPage = () => {
  let newpagenumber = this.state.pageNumber -1 ; 
if(newpagenumber >1){
this.setState({pageNumber : newpagenumber })
this.componentDidMount()
}
}

// componentDidUpdate =()=> {

// this.componentDidMount();
  
// }

  render () {
  const formElementsArray = [];
  //  const  students = this.state.realstudents.stu ; 
   const  students =this.state.realstudents; 

  const tableHeaders = ['عملیات','آدرس' , 'کدملی', 'نام خانوادگی' , 'نام', 'ردیف'];

  for (let key in this.state.orderForm) {
    if(key!="search"){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
    }
        }
let main =(<div><div className="container">
     

        {formElementsArray.map(formElement => (
          
                    <Input 
                       key={formElement.id}
                       label ={formElement.config.label}
                       inputtype = {formElement.config.elementType}
                       elementConfig = {formElement.config.elementConfig}
                       value = {formElement.config.value}
                       changed = {(event) => this.inputUserHandler(event , formElement.id)}
                       invalid = {formElement.config.valid}
                       shouldValid = {formElement.config.validation.required}
                       touched ={formElement.config.touched}
                    />
                ))}
<div>
<button className="submit" onClick={this.postDataHandler}>{this.state.editMode ? "ویرایش" : "ثبت"} </button>
{this.state.editMode ? <button className="warning" onClick={this.resetForm} >ریست</button>
 : null  }

</div>

</div>
<div className="containertable">
<div>
<div>
<label className="label">: جستجو</label>
<input className="inputsearch" placeholder="متن جستجو را وارد کنید" value={this.state.txtSearchValue} onChange = {(event) => this.filltxtSearch(event)}/>
<button onClick={this.search} className="search"  >جستجو</button>

</div>
</div>

<Table personsArray={students} headers={tableHeaders} question={this.question.bind(this)} edit={this.edit.bind(this)}  
nextPage ={ this.nextPage.bind(this)}
previousPage = {this.previousPage.bind(this)}
/>
<MModal modalShow={this.state.showModal} closeModal={this.closeModal.bind(this)}  question={this.question.bind(this)}
remove={this.remove.bind(this)}
/>

</div>
</div>
);

    return (
      
main


);
  }
}
export default Students;