// import { useEffect, useState } from "react"

// export const useLocalStorage = (key,initialvalue) => {
//     const [stored,setStored] = useState(()=>{
//         try{
//             const item = window.localStorage.getItem(key);
//             return item? JSON.parse(item):initialvalue;
//         }catch{
//             return initialvalue;
//         }
//     })

//     useEffect(()=>{
//         try {
//             localStorage.setItem(key,JSON.stringify(stored));
//         } catch (error) {
//             console.error("Failed to save to localstorage",error);
//         }
//     },[key,stored])
//   return [stored,setStored];
// }


import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) return JSON.parse(item);

      // If key doesn't exist, save initialValue
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    } catch (error) {
      console.error("Error accessing localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [key, stored]);

  return [stored, setStored];
};
