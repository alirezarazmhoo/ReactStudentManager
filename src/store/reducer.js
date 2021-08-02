import * as actionTypes from './types';
import axios from '../axios';

const initialState = {
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
            } ,
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
} ,
shouldReset:false,
realstudents :[],
counter : 0,
studentselectedid : 0,
isEditMode :false , 
modalShow :false ,
txtSearchValue : '' , 
selectedFile : null , 
majorId : 0,
majorList : []
};
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.InputUserHandler:
        
const updatedOrderForm  = {...state.orderForm};
const updatedFormElement = { 
            ...updatedOrderForm[action.id]
};
updatedFormElement.value = action.el.target.value ;
updatedOrderForm[action.id] = updatedFormElement;
return{
...state , 
orderForm : updatedOrderForm,

}
// case actionTypes.Remove_Data :
//  const arraystudent2 = []  ;
//  const updatedOrderForm3  = {...state.orderForm};
//  axios.post('Students/DeleteStudent/'+ action.id +'').then(response => {
//  axios.get('Students?pageNumber=1' ).then(response => {
//  updatedOrderForm3.realstudents = response.data.students;
//  const myites = response.data.students ; 
// for (var i = 0; i < myites.length; i++) {
//   arraystudent2.push(myites[i]);
// }
//   }); 

// });
 
// return {
// ...state ,
//  realstudents : arraystudent2
// }





// case actionTypes.PostDataHandler:



// const post = {

// name : state.orderForm.name.value ,
// lastname : state.orderForm.lastname.value , 
// nationalcode : state.orderForm.nationalcode.value , 
// address : state.orderForm.adddress.value,
// }
//  const updatedOrderForm4  = {...state.orderForm};
//   const arraystudent4 = []  ;
//  axios.post("Students", post).then(response => {

//  axios.get('Students?pageNumber=1' ).then(response => {
//  updatedOrderForm4.realstudents = response.data.students;
//  const myites4 = response.data.students ; 
// for (var i = 0; i < myites4.length; i++) {
//   arraystudent4.push(myites4[i]);
// }
// }); 
// }); 


// var resetOrderForm = {...state.orderForm};
// resetOrderForm.name.value = '';
// resetOrderForm.lastname.value = ''; 
// resetOrderForm.nationalcode.value = '';
// resetOrderForm.adddress.value = '';
// return {
// ...state , 
// orderForm : resetOrderForm,
// realstudents : arraystudent4
// }

case actionTypes.EditData :

var resetOrderForm = {...state.orderForm};
var selectedUserId = {...state};
resetOrderForm.name.value = action.name[6].innerHTML;
resetOrderForm.lastname.value =action.name[5].innerHTML; 
resetOrderForm.nationalcode.value = action.name[4].innerHTML;
resetOrderForm.adddress.value = action.name[3].innerHTML;

return {
...state ,

orderForm : resetOrderForm,
studentselectedid : action.name[7].innerHTML,
isEditMode : true,


}





case actionTypes.Get_Data :

var resetOrderForm = {...state.orderForm};
resetOrderForm.name.value = '';
resetOrderForm.lastname.value = ''; 
resetOrderForm.nationalcode.value = '';
resetOrderForm.adddress.value = '';
 return {
 ...state ,
 counter : action.counter,
 realstudents : action.realstudents,
 orderForm : resetOrderForm,
 isEditMode : false,
 modalShow : false , 
 txtSearchValue : '',
 majorList : action.majorList,
 majorId :action.majorList[0].id
 }

case actionTypes.ModalHandler :
 return {
 ...state ,
 modalShow : true , 
 studentselectedid : action.studentselectedid
 }
case actionTypes.CloseModalHandler :
 return {
 ...state ,
 modalShow : false , 
 selectedUserId : 0
 }

case actionTypes.SearchInputHandler :

// var search = {...state};

// search.txtSearchValue += action.txtSearchValue ; 

 return {
 ...state ,
txtSearchValue : action.txtSearchValue
 }


 case actionTypes.SelectFileHandler :

 return {
 ...state ,
 selectedFile : action.selectedFile
 }

 case actionTypes.MajorInputHandler :
 return {
 ...state ,
 majorId : action.majaorid
 }
 case actionTypes.FillMajorHandler :
 return {
 ...state ,
 majorList : action.majorList
 }


 

  }
    return state;
};
export default reducer;