
import axios from '../axios';

class TutorialDataService {
  getAllMajors() {
const arrayMajorData = [];
axios.get('Major' ).then(response => {
  const majorides = response.data.majors ; 
 for (var i = 0; i < majorides.length; i++) {
   arrayMajorData.push(majorides[i]);
 }
 }); 
 return arrayMajorData ; 
  }

}

export default new TutorialDataService();