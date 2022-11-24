import React, { useContext, useEffect } from "react";
import { db } from "../../utils/firebase";
import { doc, getDoc, collection, getDocs, query, where, limit } from "firebase/firestore";
import { async } from "@firebase/util";

export const Contact = () => {
    useEffect(() => {
        const getData = async () => {
    
            const queryRef = query(collection(db,'items'), where('category','==', '70'),limit(1))
    
            const response = await getDocs(queryRef)
            
            const productos = response.docs.map(doc => {
                 const newProduct = {
             ...doc.data(),
            id: doc.id,
         };    
         return newProduct  
            })
            console.log(productos)
;
        };
        getData();

        //Toda la coleccion
    // useEffect(() => {
    // const getData = async () => {

    //     const query = collection(db,'items' )

    //     const response = await getDocs(query)
        
    //     const productos = response.docs.map(doc => {
    //          const newProduct = {
    //      ...doc.data(),
    //     id: doc.id,
    //  };    
    //  return newProduct  
    //     })
    //     console.log(productos)
    //     //Obtener un solo registro
    // //   const query = doc(db, "items", "WaRDO8ZSGcRX9jEZj4zy");

    // //   const response = await getDoc(query);
    // //   console.log("response", response);
    // //   console.log("data", response.data());
    // //   const newProduct = {
    // //     ...response.data(),
    // //     id: response.id,
    // //   };
    // //   console.log(newProduct);
    // };
    // getData();
  }, []);
  return <div>Contact</div>;
};

export default Contact;
