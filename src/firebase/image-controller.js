import firebaseStorage from './index';
import {ref} from 'firebase/storage';

function writeImageData(itemsInfo) {
    for (let i = 0; i < itemsInfo.length; i++){
        for (let f = 0; f < itemsInfo[i]["imageLinks"].length; f++){
            let imageRef = ref(firebaseStorage, itemsInfo[i]['fullTitle'] 
            + "_"  + itemsInfo[i]['color'] + "/" + f + ".jpg");

            


            let file = 
            uploadBytes()
        }
    }
}
