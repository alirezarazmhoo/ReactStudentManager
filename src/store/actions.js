import axios from '../axios';
import * as actionTypes from './types';

export const GetDataFromServer = ( studentlist ) => {

return {
      type: actionTypes.Get_Data,
      realstudents : studentlist
    };

};


export const FillData = () =>{
   const arraystudent4 = []  ;
  axios.get('Students?pageNumber=1' ).then(response => {
  const myites4 = response.data.students ; 
 for (var i = 0; i < myites4.length; i++) {
   arraystudent4.push(myites4[i]);
 }
 }); 
return {
      type: actionTypes.Get_Data,
      realstudents : arraystudent4
    };
}

export const initGetData = (isSearch , txt) => {

let url = '';

if(isSearch == true) {

url = 'Students?txtSearch='+ txt;
}
else{
  url = 'Students?pageNumber=1' ; 
}

return dispatch => {
    const arraystudent4 = []  ;
  axios.get(url ).then(response => {
  const myites4 = response.data.students == null ? 0 : response.data.students; 
 for (var i = 0; i < myites4.length; i++) {
   arraystudent4.push(myites4[i]);
 }
 console.log(arraystudent4);
 dispatch(GetDataFromServer(arraystudent4));
 }); 
}
}

export const Remove_Data = (studentid) => {

const arraystudent5 = []  ;
return dispatch => {
 axios.post('Students/DeleteStudent/'+ studentid +'').then(response => {
 axios.get('Students?pageNumber=1' ).then(response => {
  const myites5 = response.data.students == null ? 0 : response.data.students; 
 for (var i = 0; i < myites5.length; i++) {
   arraystudent5.push(myites5[i]);
 }
 dispatch(GetDataFromServer(arraystudent5));
 }); 
 });
 }; 
}

export const PostDataHandler = (inputs,id , mode)=> {

let url = "Students/EditStudent";
if(mode == true){
url =  "Students/EditStudent";
}
else{
url =  "Students";
id = 0
}

return dispatch => {
const arraystudent5 = []  ;
const post = {
name :inputs.name.value ,
lastname : inputs.lastname.value , 
nationalcode : inputs.nationalcode.value, 
address :inputs.adddress.value,
id :id
}
 axios.post(url, post).then(response => {
 axios.get('Students?pageNumber=1' ).then(response => {
  const myites5 = response.data.students ; 
 for (var i = 0; i < myites5.length; i++) {
   arraystudent5.push(myites5[i]);
 }
 dispatch(GetDataFromServer(arraystudent5));
 }); 
  });
}
}


export const EditData = (name)=>{
return {
      type: actionTypes.EditData,
      name : name
    };
}


export const ModalHandler = (studentid) => {

  return {
      type: actionTypes.ModalHandler,
      studentselectedid : studentid
    };
}

export const CloseModalHandler = () => {
  return {
      type: actionTypes.CloseModalHandler,

    };
}



export  const SearchInputHandler = (txt) => {
return {

type : actionTypes.SearchInputHandler , 
txtSearchValue  : txt

}


}
