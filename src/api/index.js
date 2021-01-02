import axios from "axios";
import { usePalette } from 'react-palette'

const url = "https://restcountries.eu/rest/v2/all";


export const fetchData = async() => {

    try {
        const data = await axios.get(url)
        const modifiedData = data.data.map((data) => ({
                name: data.name, 
                flag: data.flag,
            }))
        return modifiedData;
 
    } catch (err){
        console.log (err)
    }
}



// export const fetchFlagData = async() => {

//     try {
//         const data = await axios.get(url)
//         data.data.forEach((data) => {
//             const newData = {
//                 flag:data.flag,
//             }
//             flagArray.push(newData)
//         })
//         return flagArray;
//     } catch (err){
//         console.log (err)
//     }
// }

// export const getFlagColor = () => {

//     try {
//         flagArray.forEach((flag) => {
     
//         console.log(usePalette(flag.flag)) 
//         })
//     } catch (err) {
//         console.log(err)
//     }
    
// }