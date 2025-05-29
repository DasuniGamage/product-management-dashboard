import { useEffect, useState } from "react"

export const useLocalStorage = (key,initialvalue) => {
    const [stored,setStored] = useState(()=>{
        try{
            const item = window.localStorage.getItem(key);
            return item? JSON.parse(item):initialvalue;
        }catch{
            return initialvalue;
        }
    })

    useEffect(()=>{
        try {
            localStorage.setItem(key,JSON.stringify(stored));
        } catch (error) {
            console.error("Failed to save to localstorage",error);
        }
    },[key,stored])
  return [stored,setStored];
}


