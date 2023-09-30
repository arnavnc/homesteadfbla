'use client'

import React, {useEffect} from 'react';
import firebase from 'src/app/firebase.js';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Arnav from '../../../public/static/officers.jpg'
// import { makeStyles } from "@material-ui/core/styles";

import Nav from "@/components/nav";
import Footer from "@/components/footer.js";
// import Button from "@/components/Button.js";

const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();
// const useStyles = makeStyles(styles);

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

    
    checkIfUser(user, db) {
      let data = null;
      console.log('the user',  user)
      const q = query(collection(db, "users"), where("email", "==", true));
      const querySnapshot = getDocs(q);
      const fetchData = async () => {
        const querySnapshot = await getDocs(collectionRef);
        const docs = [];
        querySnapshot.forEach((doc) => {
          // Extract data from each document
          const data = doc.data();
          docs.push(data);
        });
        setData(docs);
      };

      /*
      return Promise.all([
        q.get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              data = doc.data();
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          }),
      ]).then(() => {
        return Promise.resolve(data);
      });
      */
    }

    login(typeOfLogin) {
      // const router = useRouter();
      
      // Use Firebase to initiate the Google authentication process
      // const provider = new firebase.auth.GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          var token = credential.accessToken;
          const user = result.user;
          const db = getFirestore(firebase);

          this.checkIfUser(user, db).then((data) => {
            if (data) {
              if (data["authLevel"] === typeOfLogin) {
                if (data["authLevel"] === "member") {
                  this.goTo("/member-portal");
                } else {
                  this.goTo("/admin-portal");
                }
              } else {
                user
                  .delete()
                  .then(function () {
                    router.push("/wrong-login");
                  })
                  .catch(function (error) {});
              }
            } else {
              console.log("NOT A USER", data);
              user
                .delete()
                .then(function () {
                  router.push("/not-a-user");
                })
                .catch(function (error) {});
            }
          });
        });
    }


    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />;
      }
      return <LoginPageComponent login={this.login} />;
    }
  }

  function LoginPageComponent(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
      setCardAnimation("");
    }, 700);
    // const classes = useStyles();
    const { ...rest } = props;
    const login = (loginType) => {
      props.login(loginType);
    };

    return (
      <div>
        <Image src={Arnav} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
        <Nav />
        <div className='flex justify-center mt-10'>
          <div className="border-2 rounded-md border-red-600 bg-red-600 bg-opacity-10 px-4 py-3
          flex flex-col w-fit">
            <h1 className="text-lg font-bold text-red-600 flex justify-center">Login</h1>
            {/* <p className='flex justify-center'>Please click the button below to sign in with Google:</p> */}

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
              
              <div className='bg-watermelon-red h-fit mt-4 rounded-2xl'>
                <div className=' backdrop-blur-md rounded-2xl'>
                  <button 
                  onClick={() => login("admin")}
                  className='bg-watermelon-red py-4 px-5 rounded-2xl 
                  lg:hover:translate-x-[10px] lg:hover:translate-y-4 ease-linear duration-200'
                  >
                    Admin Login
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
        <Footer />
      </div>
    );
  }


  /*
  export default function Login() {

    // Define a function to handle signing in with Google
    const handleSignInWithGoogle = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    };

    return (
      <div>
        <Nav />
        <div className="border-2  rounded-md border-purple-600 bg-purple-600 bg-opacity-10 px-4 py-3">
          <h1 className="text-lg font-bold text-purple-600">Login</h1>
          <p>Please click the button below to sign in with Google:</p>
          <button type="button" onClick={handleSignInWithGoogle}>
            Sign in with Google
          </button>
        </div>
        <Footer />
      </div>
    );
    
  }
  */


