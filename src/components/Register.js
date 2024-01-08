"use client";

import {useState} from 'react';
import firebase from "src/app/firebase.js";
import {
    getFirestore,
    collection,
    query,
    getDocs,
    path,
    doc,
} from "firebase/firestore";


let db = firebase;
export default function Register() {

    const [state, setState] = useState({
      firstName: "",
      lastName: "",
      email: "",
      id: "",
      key: "",
      buttonText: "Get Started"
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setState({
        ...state,
        [name]: value,
      });

      console.log(state);
    };
  
    const handleClick = () => {
        setState({
            ...state,
            buttonText: "Registering...",
        });
        registerDatabase(
            state.firstName,
            state.lastName,
            state.email,
            state.id,
            state.key
        ).then((res) => {
            setState({
                ...state,
                buttonText: res,
            });
        });
    };

    const registerDatabase = (firstName, lastName, email, id, key) => {

        const usersCollection = collection(db, "users");


        // return db.collection("users").doc(firstName + " " + lastName).set({
        //     email: email,
        //     id: id,
        //     authLevel: "member",
        // }).then(function () {
        //     return Promise.resolve(
        //         <h8>
        //             {" "}
        //             Account Created!
        //             <br /> You can now sign in with
        //             <br /> Google via the login
        //             <br /> page.
        //         </h8>
        //     );
        // }).catch(function (error) {
        //     return Promise.reject("An error occurred. Try again?");
        // });

    };

    return (
      <div>
        <div className = "flex flex-col space-y-10 justify-center">
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 "
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="email"
            placeholder="FUHSD Email"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="id"
            placeholder="6 Digit Student ID"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="key"
            placeholder="Registration Key"
            onChange={handleInputChange}
          />
          <button className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
            rounded-xl" onClick ={handleClick}>
                {state.buttonText}
          </button>
        </div>
      </div>
    );
  }
  
  
  