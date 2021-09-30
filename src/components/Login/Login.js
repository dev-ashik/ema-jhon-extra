import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailPassword,
  handleGoogleSignIn,
  handleSignOut,
  signInWithEmailPassword,
} from "./LoginManager";
// import {handleGoogleSignIn, handleSignOut} from "./LoginManager";

function Login() {
  const [newUser, setNewuser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    isSuccess: false,
  });

  // initializeLoginFramework();
  // const firebaseApp = initializeApp(firebaseConfig);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const GoogleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false);
    });
  };

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    // console.log(e.terget.name, e.terget.value);
    let isFildValid = true;
    if (e.target.name === "email") {
      isFildValid = /\S+@\S+\.\S+/.test(e.target.value);
      // console.log(e.target.value);
      // console.log(isFildValid);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFildValid = isPasswordValid && passwordHasNumber;
    }
    if (isFildValid) {
      // [...cart, newItem]
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div className="">
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={GoogleSignIn}>Sign in with google</button>
      )}
      {user.isSignedIn && (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Your email: {user.email}</p>
          {/* <img src={user.photo} alt="user photo" height="300" width="300" /> */}
        </div>
      )}
      <div>
        <h1>Fire auth test</h1>
        <input
          type="checkbox"
          onChange={() => setNewuser(!newUser)}
          name="newUser"
          id=""
        />
        <label htmlFor="newUser">New User sign up</label>
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}

        <form action="">
          {newUser && (
            <input
              type="text"
              onBlur={handleBlur}
              name="name"
              id=""
              placeholder="Your name"
              required
            />
          )}
          <br />
          <input
            type="text"
            onBlur={handleBlur}
            name="email"
            id=""
            placeholder="Your Email address"
            required
          />
          <br />
          <input
            type="password"
            onBlur={handleBlur}
            name="password"
            id=""
            placeholder="Your Password"
            required
          />
          <br />
          <input
            type="submit"
            value={newUser ? "sign up" : "sign In"}
            onClick={handleSubmit}
          />
        </form>

        <h3 style={{ color: "red" }}>{user.error}</h3>
        {user.isSuccess && (
          <h3 style={{ color: "green" }}>
            {newUser ? "signUp" : "signIn"} successful
          </h3>
        )}
      </div>
    </div>
  );
}

export default Login;
