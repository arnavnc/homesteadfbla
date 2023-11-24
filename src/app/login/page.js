'use client'

import React, {useContext, useEffect, useState} from 'react';
import firebase from 'src/app/firebase.js';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Arnav from '../../../public/static/officers.jpg'
import {UserAuth} from "src/app/context/AuthContext.js"
// import { makeStyles } from "@material-ui/core/styles";

import Nav from "@/components/nav";
import Footer from "@/components/footer.js";
import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants';
import { setUserId } from 'firebase/analytics';


function LoginPageComponent({ login, router }) {
  const [cardAnimaton, setCardAnimation] = useState('cardHidden');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCardAnimation('');
    }, 700);

    return () => clearTimeout(timeoutId);
  }, []);
  return (
      <div>
      <Image src={Arnav} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
      <Nav />
      <div className='flex justify-center mt-10'>
          <div className="border-2 rounded-md border-red-600 bg-red-600 bg-opacity-10 px-4 py-3
          flex flex-col w-fit">
          <h1 className="text-lg font-bold text-red-600 flex justify-center">Login</h1>
          { <p className='flex justify-center'>Please click the button below to sign in with Google:</p> }

          <div className='flex flex-row justify-between mx-4 gap-x-5'>

              <div className='bg-red-900 h-fit mt-4 rounded-2xl'>
              <div className=' backdrop-blur-xl rounded-2xl'>
                  <button 
                  onClick={() => login("member")}
                  className='bg-red-900 p-4 rounded-2xl 
                  lg:hover:translate-x-[-10px] lg:hover:translate-y-4 ease-linear duration-200'
                  >
                  Member Login
                  </button>
              </div>
              </div>

              {/* <div className='bg-watermelon-red h-fit mt-4 rounded-2xl'>
              <div className=' backdrop-blur-md rounded-2xl'>
                  <button 
                  onClick={handleSignIn}
                  className='bg-watermelon-red py-4 px-5 rounded-2xl 
                  lg:hover:translate-x-[10px] lg:hover:translate-y-4 ease-linear duration-200'
                  >
                  Admin Login
                  </button>
              </div>
              </div> */}
                
          </div>

          </div>
      </div>
      <Footer />
      </div>
  );
}

export default class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      redirect: null,
    };
    this.goTo = this.goTo.bind(this);
  }

  goTo(location) {
    this.setState({ redirect: location });
  }

  async checkIfUser(user, db) {
    let data = null;
    console.log('the user', user);
    try {
      const querySnapshot = await getDocs(
        collection(db, 'users').where('email', '==', user.email)
      );
      querySnapshot.forEach((doc) => {
        data = doc.data();
      });
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
    return data;
  }

  login(typeOfLogin) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const ref = this;

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = result.credential.accessToken;
        const user = result.user;
        const db = getFirestore();

        try {
          const data = await this.checkIfUser(user, db);

          if (data) {
            if (data.authLevel === typeOfLogin) {
              if (data.authLevel === 'member') {
                ref.goTo('/member-portal');
              } else {
                ref.goTo('/admin-portal');
              }
            } else {
              await user.delete();
              ref.goTo('/wrong-login');
            }
          } else {
            console.log('NOT A USER', data);
            await user.delete();
            ref.goTo('/not-a-user');
          }
        } catch (error) {
          console.error('Error during login:', error);
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return <LoginPageComponent login={this.login} router={this.props.router} />;
  }
}