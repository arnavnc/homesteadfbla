'use client'

import React from 'react';
import firebase from 'src/app/firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
    return Promise.all([
      db
        .collection("users")
        .where("email", "==", user["email"])
        .get()
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
  }

  login(typeOfLogin) {
    var ref = this;
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;
        var db = firebase.firestore();

        this.checkIfUser(user, db).then((data) => {
          if (data) {
            if (data["authLevel"] === typeOfLogin) {
              if (data["authLevel"] === "member") {
                ref.goTo("/member-portal");
              } else {
                ref.goTo("/admin-portal");
              }
            } else {
              user
                .delete()
                .then(function () {
                  ref.goTo("/wrong-login");
                })
                .catch(function (error) {});
            }
          } else {
            console.log("NOT A USER", data);
            user
              .delete()
              .then(function () {
                ref.goTo("/not-a-user");
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
      <Nav />
      <div className="border-2  rounded-md border-purple-600 bg-purple-600 bg-opacity-10 px-4 py-3">
        <h1 className="text-lg font-bold text-purple-600">Login</h1>
        <p>Please click the button below to sign in with Google:</p>
        <Button
          target="_blank"
          color="transparent"
          onClick={() => login("member")}
        >
          Member Login
        </Button>
        <Button
          target="_blank"
          color="transparent"
          onClick={() => login("admin")}
        >
          Admin Login
        </Button>
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