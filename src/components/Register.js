"use client";

import {useState} from 'react';

export default function Register() {

    const [state, setState] = useState({
      firstName: "",
      lastName: "",
      email: "",
      id: "",
      buttonText: "Get Started",
      key: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSearchTerm({
        ...searchTerm,
        [name]: value,
      });
    };
  
    return (
      <div>
        <div className = "w-full flex flex-col space-y-10 justify-center">
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="year"
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 "
            type="text"
            name="conference"
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="event"
            placeholder="FUHSD Email"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="name"
            placeholder="6 Digit Student ID"
            onChange={handleInputChange}
          />
          <input
            className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
            outline-none"
            type="text"
            name="place"
            placeholder="Regisration Key"
            onChange={handleInputChange}
          />
        </div>
      </div>
    );
  }
  
  
  