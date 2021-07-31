import axios from '../axios';
import * as actionTypes from './types';
import TutorialDataService from './Service' 

export const GetDataFromServer = ( studentlist , majorList ) => {


return {
      type: actionTypes.Get_Data,
      realstudents : studentlist , 
      majorList : majorList
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

// export const initGetData = (isSearch , txt) => {

// let url = '';
//  const arrayMajorData = []  ;

// if(isSearch == true) {

// url = 'Students?txtSearch='+ txt;
// }
// else{
//   url = 'Students?pageNumber=1' ; 
// }

// return dispatch => {
//     const arraystudent4 = []  ;
//   axios.get(url ).then(response => {
//   const myites4 = response.data.students == null ? 0 : response.data.students; 
//  for (var i = 0; i < myites4.length; i++) {
//    arraystudent4.push(myites4[i]);
//  }

//  dispatch(GetDataFromServer(arraystudent4 ,GetMajorFromServer() ));
 

//  }); 
// }
// }


export const initGetData = (isSearch , txt) => async (dispatch) => {
  let url = '';
 const arrayMajorData = []  ;


if(isSearch == true) {

url = 'Students?txtSearch='+ txt;
}
else{
  url = 'Students?pageNumber=1' ; 
}

 const arraystudent4 = []  ;

try {
 await axios.get(url ).then(response => {
  const myites4 = response.data.students == null ? 0 : response.data.students; 
 for (var i = 0; i < myites4.length; i++) {
   arraystudent4.push(myites4[i]);
 }
 }); 
await axios.get('Major' ).then(response => {
  const majorides = response.data.majors ; 
 for (var i = 0; i < majorides.length; i++) {
   arrayMajorData.push(majorides[i]);
 }
 }); 
 
dispatch({
type: actionTypes.Get_Data,
realstudents : arraystudent4,
majorList : arrayMajorData
});
      
  } catch (err) {
    console.log(err);
  }
};

export const Remove_Data =  (studentid) => {
return dispatch => {
const arraystudent5 = []  ;
 const arrayMajorData = []  ;
 axios.post('Students/DeleteStudent/'+ studentid +'').then(response => {
 axios.get('Students?pageNumber=1' ).then(response => {
  const myites5 = response.data.students == null ? 0 : response.data.students; 
 for (var i = 0; i < myites5.length; i++) {
   arraystudent5.push(myites5[i]);
 }
 axios.get('Major' ).then(response => {
  const majorides = response.data.majors ; 
 for (var i = 0; i < majorides.length; i++) {
   arrayMajorData.push(majorides[i]);
 }
 dispatch(GetDataFromServer(arraystudent5,arrayMajorData));
 }); 
 }); 
 });
 }; 
}







export const PostDataHandler = (inputs,id , mode , file , majorId)=> {
const fd  = new FormData();

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
const arrayMajorData = [] ; 
const post = {
name :inputs.name.value ,
lastname : inputs.lastname.value , 
nationalcode : inputs.nationalcode.value, 
address :inputs.adddress.value,
id :id
}
fd.append("name" , inputs.name.value);
fd.append("lastname" , inputs.lastname.value);
fd.append("nationalcode" , inputs.nationalcode.value);
fd.append("address" , inputs.adddress.value);
fd.append("id" , id);
fd.append("file" , file);
fd.append("majorId" , majorId);


 axios.post(url, fd ).then(response => {
   console.log(response.message);
 axios.get('Students?pageNumber=1' ).then(response => {
  const myites5 = response.data.students ; 
 for (var i = 0; i < myites5.length; i++) {
   arraystudent5.push(myites5[i]);
 }
  axios.get('Major' ).then(response => {
  const majorides = response.data.majors ; 
 for (var i = 0; i < majorides.length; i++) {
   arrayMajorData.push(majorides[i]);
 }

 dispatch(GetDataFromServer(arraystudent5 ,arrayMajorData ));
 });
 }); 
  });
}
}



 export const  GetMajorFromServer = ( )=>{
const arrayMajorData = [];

axios.get('Major' ).then(response => {
  const majorides = response.data.majors ; 
 for (var i = 0; i < majorides.length; i++) {
   arrayMajorData.push(majorides[i]);
 }
 }); 
 return arrayMajorData ; 

}




export const EditData = (name )=>{

return {
      type: actionTypes.EditData,
      name : name,
     
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


export const SelectFileHandler = (file) =>{

return {type : actionTypes.SelectFileHandler , 
selectedFile  : file

}
}


export const MajorInputHandler = (id) => {
return {
   type : actionTypes.MajorInputHandler , 
majaorid  : id

}
}

