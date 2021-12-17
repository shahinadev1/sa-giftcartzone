import { useEffect, useState } from "react";
import FirebaseAPP from "../firebase/firebase.init";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { updateAdmin, updateUser } from "../redux/reducer/firebaseReducer";
import { toast } from "react-toastify";
FirebaseAPP();
function useFirebase() {
  const showTost = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const errorTost = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const dispatch = useDispatch();
  //redux
  const navigate = useNavigate();
  //states
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
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
        showTost("Account create successfully...");
        updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL: "/mediaimgs/profile.png",
        })
          .then(() => {
            saveUser({ name: fullName, email });
            setIsError(false);
            showTost("Account create successfully...");
            sendEmailVerification(auth.currentUser)
              .then(() => {
                setIsError(false);
                showTost("Please verify your email!");
                navigate(route);
              })
              .catch((err) => {
                setIsError(true);
                errorTost(err.message);
              });
          })
          .catch((err) => {
            setIsError(true);
            errorTost(err.message);
          });
      })
      .catch((err) => {
        setIsError(true);
        errorTost(err.message);
      })
      .finally(() => setIsLoading(false));
  };
  //sign in with email and password
  const loginWithEmailAndPassword = ({ email, password, route }) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsError(false);
        showTost("login successfully..");
        navigate(route);
      })
      .catch((err) => {
        setIsError(true);
        // console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateUser2 = (name) => {
    setIsLoading(true);
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then((res) => {
        showTost("profile updated successfully...");
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        errorTost(err.message);
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
        showTost("password reset link was send to your email..");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        errorTost(errorMessage);
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
        showTost("Login successfully. with google.");
        navigate(route || "/");
      })
      .catch((err) => {
        setIsError(true);
        errorTost(err.message);
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
      // console.log(error);
    }
  };

  //signOut
  const LogOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then((res) => {
        setIsError(false);
        showTost("Logout successfully.");
        setUser({});
        dispatch(updateUser(user));
      })
      .catch((err) => {
        setIsError(true);
        errorTost("something is wrong..");
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
        if (res.status === 200) {
          // dispatch(updateAdmin(res.data.result));
          setIsAdmin(res.data.result.isAdmin);
        }
      })
      .catch((err) => {
        // dispatch(updateAdmin({}));
        // console.log(err);
      })
      .finally(() => {
        setIsAdminLoading(false);
      });
  }, [user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const { displayName, emailVerified, email, photoURL } = user;
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, []);

  return {
    createAccount,
    isAdminLoading,
    isAdmin,
    googleSignIn,
    user,
    isLoading,
    LogOut,
    loginWithEmailAndPassword,
    updateUser2,
    isError,
    message,
    resetPassword,
  };
}

export default useFirebase;
