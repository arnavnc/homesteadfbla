"use client";

import { useState } from 'react';
import { db } from "src/app/firebase.js"; // Make sure the path is correct
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";

export default function Register() {
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        id: "",
        key: "",
        buttonText: "Get Started"
    });

    const validKeys = ["7799774850", "9078422944", "3407372254", "2909954248"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const isFormValid = () => {
        return (
            state.firstName &&
            state.lastName &&
            state.email &&
            state.id &&
            state.key &&
            validKeys.includes(state.key) &&
            state.email.includes('.fuhsd.org')
        );
    };

    const handleClick = async () => {
        if (!isFormValid()) {
            setState({
                ...state,
                buttonText: "Invalid or missing fields",
            });
            return;
        }

        setState({
            ...state,
            buttonText: "Registering...",
        });

        try {
            const res = await registerDatabase(
                state.firstName,
                state.lastName,
                state.email,
                state.id,
                state.key
            );
            setState({
                ...state,
                buttonText: res,
            });
        } catch (error) {
            console.error("Registration error:", error);
            setState({
                ...state,
                buttonText: "An error occurred. Try again?",
            });
        }
    };

    const registerDatabase = async (firstName, lastName, email, id, key) => {
        const usersCollection = collection(db, "users");

        // Check if email or student ID already exists
        const emailQuery = query(usersCollection, where("email", "==", email));
        const idQuery = query(usersCollection, where("id", "==", id));

        const emailSnapshot = await getDocs(emailQuery);
        const idSnapshot = await getDocs(idQuery);

        if (!emailSnapshot.empty || !idSnapshot.empty) {
            return "Email or student ID already in use.";
        }

        try {
            const userDoc = doc(usersCollection, `${firstName} ${lastName}`);
            await setDoc(userDoc, {
                // firstName,
                // lastName,
                email,
                id,
                authLevel: "member"
            });
            return "Account Created! You can now sign in with Google via the login page.";
        } catch (error) {
            console.error("Error adding document: ", error);
            throw error;
        }
    };

    return (
        <div>
            <div className="flex flex-col space-y-10 justify-center">
                <input
                    className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleInputChange}
                />
                <input
                    className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                />
                <input
                    className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
                    type="text"
                    name="email"
                    placeholder="FUHSD Email"
                    onChange={handleInputChange}
                />
                <input
                    className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
                    type="text"
                    name="id"
                    placeholder="6 Digit Student ID"
                    onChange={handleInputChange}
                />
                <input
                    className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
                    type="text"
                    name="key"
                    placeholder="Registration Key"
                    onChange={handleInputChange}
                />
                <button
                    className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 rounded-xl"
                    onClick={handleClick}
                >
                    {state.buttonText}
                </button>
            </div>
        </div>
    );
}
