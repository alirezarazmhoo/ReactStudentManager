
import React, { Component } from 'react';
import {connect} from 'react-redux';

import MModal from '../components/UI/Modal/Modal';
import Input from '../components/UI/Input/Input';
import *  as TeacherActions from '../store/Index';
import Table from '../components/UI/Table/Table';


class Teachers extends Component {




componentDidMount(){  
 this.props.Get_Data(false , "");
 }


nextPage = ()=> {

}
previousPage = () => {

}
//  question = (e) => {
//  this.props.Remove_Data(e.target.parentNode.parentNode.id);


// };
 question = (e) => {

   this.props.ModalHandler(e.target.parentNode.parentNode.id);
  };

remove = (e) => {

 this.props.Remove_Data(this.props.studentselectedid);
}
closeModal = () => {
this.props.CloseModalHandler();
}

edit = (e) =>{

 this.props.EditData( e.target.parentNode.parentNode.parentNode.rows[e.target.parentNode.parentNode.rowIndex].cells);

}
postData = () => {
this.props.PostDataHandler(this.props.inputs,this.props.studentselectedid,this.props.isEditMode);

}


search = () =>{
// axios.get('Students?txtSearch='+this.state.txtSearchValue).then(response => {
//   this.setState({realstudents :[]})
//   this.setState({realstudents :response.data.students})
//   this.setState({txtSearchValue : ''});

//   }); 

 this.props.Get_Data(true , this.props.txtSearchValue);

}
filltxtSearch = (e)=>{
  //this.setState({txtSearchValue : e.target.value});

  this.props.SearchInputHandler(e.target.value);

}

 render () {
  const tableHeaders = ['عملیات','آدرس' , 'کدملی', 'نام خانوادگی' , 'نام', 'ردیف'];
  const formElementsArray = [];
  for (let key in this.props.inputs) {
            formElementsArray.push({
                id: key,
                config: this.props.inputs[key]
            });
        }
let main = (<div><div className="container">
        {formElementsArray.map(formElement => (
                    <Input 
                       key={formElement.id}
                       label ={formElement.config.label}
                       inputtype = {formElement.config.elementType}
                       elementConfig = {formElement.config.elementConfig}
                       value = {formElement.config.value}
                        changed = {(event) => this.props.onIncrementCounter(event , formElement.id)}
                    />
                ))}
<div>
<button className="submit" onClick={()=> this.postData()} >{this.props.isEditMode == true ? "ویرایش" : "ثبت"}</button>
<div>
<input className="inputsearch" placeholder="متن جستجو را وارد کنید" value={this.props.txtSearchValue} onChange = {(event) => this.filltxtSearch(event)}/>
<button onClick={this.search} className="search"  >جستجو</button>

</div>



</div>
<Table personsArray={this.props.mystudents} headers={tableHeaders} question={this.question.bind(this)} edit={this.edit.bind(this)}  
nextPage ={ this.nextPage.bind(this)}
previousPage = {this.previousPage.bind(this)}
/>  


</div>
<MModal modalShow={this.props.modalShow} closeModal={this.closeModal.bind(this)}  question={this.question.bind(this)}
remove={this.remove.bind(this)}
/>
</div>
);

return (
main
);
 }
}


const mapStateToProps = state => {
    return {
        inputs: state.orderForm,
        // reset : state.shouldReset,
        mystudents : state.realstudents,
        counterstudent : state.counter,
        studentselectedid : state.studentselectedid,
        isEditMode : state.isEditMode , 
        modalShow :state.modalShow,
        txtSearchValue : state.txtSearchValue
    }
};

const mapDispatchToProps = dispatch => {
    return {
         onIncrementCounter: (element , id) => dispatch({type: 'InputUserHandler' , el : element , id : id}),
         PostDataHandler : (el,id,mode) => dispatch(TeacherActions.PostDataHandler(el,id,mode)),
         Get_Data : (isSearch,txt) => dispatch(TeacherActions.initGetData(isSearch, txt)),
         Remove_Data : (id) => dispatch(TeacherActions.Remove_Data(id)),
         EditData : (name) => dispatch(TeacherActions.EditData(name)),
         ModalHandler : (id) => dispatch(TeacherActions.ModalHandler(id)),
         CloseModalHandler : (id) => dispatch(TeacherActions.CloseModalHandler()),
         SearchInputHandler : (txt)=> dispatch(TeacherActions.SearchInputHandler(txt)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Teachers);