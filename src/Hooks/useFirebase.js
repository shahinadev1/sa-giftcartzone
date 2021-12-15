import { useEffect, useState } from "react";
import FirebaseAPP from "../firebase/firebase.init";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
FirebaseAPP();
function useFirebase() {
  //redux
  const navigate = useNavigate();
  //states
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isError, setIsError] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  //auth
  const auth = getAuth();
  //providers
  const googleProvider = new GoogleAuthProvider();
  //create user with email and password
  const createAccount = ({ fullName, email, password, route }) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        setIsError(false);
        console.log("account created: ", UserCredential);
        updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL: "/mediaimgs/profile.png",
        })
          .then(() => {
            saveUser({ name: fullName, email });
            setIsError(false);
            sendEmailVerification(auth.currentUser)
              .then(() => {
                setIsError(false);
                setMessage(
                  "Account created successfully.. please verify your account. check your email."
                );
                Swal.fire({
                  icon: "success",
                  title:
                    "Account created successfully.. please verify your account. check your email.",
                  showConfirmButton: true,
                  timer: 1500,
                });
                navigate(route);
              })
              .catch((err) => {
                setIsError(true);
                setMessage("");
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              });
          })
          .catch((err) => {
            setIsError(true);
            setMessage("");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      })
      .catch((err) => {
        setIsError(true);
        setMessage("");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => setIsLoading(false));
  };
  //sign in with email and password
  const loginWithEmailAndPassword = ({ email, password, route }) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsError(false);
        setMessage("login successfully..");
        navigate(route);
      })
      .catch((err) => {
        setIsError(true);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setMessage("");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //reset password
  const resetPassword = (email) => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        setMessage("password reset link was send to your email..");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      })
      .finally(() => setIsLoading(false));
  };
  //google sign in
  const googleSignIn = ({ route }) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        saveUser({ name: user.displayName, email: user.email });
        setIsError(false);
        setMessage("Account created successfully..");
        Swal.fire({
          icon: "success",
          title: "Account created successfully..",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(route || "/");
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
        setMessage("");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //save user to db
  const saveUser = async ({ name, email }) => {
    const added_date = new Date().toLocaleDateString();
    const data = {
      name: name,
      email: email,
      added_date,
    };
    try {
      const res = await axios.post(
        "https://intense-basin-48901.herokuapp.com/add-user",
        data
      );
    } catch (error) {
      // set
    }
  };

  //signOut
  const LogOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then((res) => {
        setIsError(false);
        setMessage("Logout successfully.");
      })
      .catch((err) => {
        setIsError(true);
        setMessage("");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //load admin
  useEffect(() => {
    setIsAdminLoading(true);
    axios
      .get(`https://intense-basin-48901.herokuapp.com/users/${user.email}`)
      .then((res) => {
        if (res.data.result[0]?.isAdmin) {
          setIsAdmin(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsAdmin(false);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const { displayName, email } = user;
        setMessage("");
      } else {
        setUser({});
      }
      setIsLoading(false);
      setMessage("");
    });
    return () => unsubscribe;
  }, []);

  return {
    createAccount,
    parentCategories,
    isAdminLoading,
    isAdmin,
    googleSignIn,
    subCategories,
    user,
    isLoading,
    LogOut,
    loginWithEmailAndPassword,
    fetchLoading,
    isError,
    message,
    resetPassword,
  };
}

export default useFirebase;