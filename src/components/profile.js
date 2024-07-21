import React from 'react';
import {auth} from "@/app/firebase";
import Image from "next/image";
const profileCard = () => {

    return (
        <>
        <div>
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        </div>
        </>
    );

};
export default profileCard;