import { useContext, useEffect, useState } from "react";
import { addDoc } from "firebase/firestore";
import Button from "../../Components/Button/Button";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { usersCollectionRef } from "../../firebase/firestore.collections";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [districts, setDistricts] = useState([]);

  const {
    createUser,
    updateUserInfo,
    logOut,
    googleLogin,
    signIn,
    user,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Set the login or registration form based on the route
  useEffect(() => {
    if (location.pathname === "/login") {
      setIsSignUp(false);
    } else {
      setIsSignUp(true);
    }
  }, [location]);

  // Load all districts and store them in lexicographical order
  useEffect(() => {
    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => {
        const allDistricts = data.districts;
        allDistricts.sort();
        setDistricts(allDistricts);
      });
  }, []);

  // Login handler
  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    signIn(email, password)
      .then(() => {
        navigate(from, { replace: true });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome Back",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
        setLoading(false);
      });
  };

  // Sign-up handler
  const handleSignUp = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const selectElement = event.target.district;
    const address =
      selectElement.options[selectElement.selectedIndex].textContent;

    let image;

    // upload image
    const file = event.target.file.files[0];
    if (file) {
      const apiKey = import.meta.env.VITE_IMG_APIKEY;
      const formData = new FormData();
      formData.append("image", file);

      const response1 = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const response2 = await response1.json();

      if (response2.status === 200) {
        const imageUrl = response2.data.display_url;
        image = imageUrl;
      }
    }

    // validate password and confirm password
    if (password != confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password did not match!",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 character long!",
      });
      return;
    }

    if (!/(?=.*[A-Z])(?=.*[!@#$&*])/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password should contain one capital letter and one special character!",
      });
      return;
    }

    // Register user
    const userInfo = {
      name,
      email,
      photo: image,
      phone,
      address,
      role: "user",
    };

    const userCredential = await createUser(email, password);
    await updateUserInfo(name, image);
    await logOut();
    navigate("/login");

    Swal.fire({
      position: "center",
      icon: "success",
      title: "SignUp Successful",
      showConfirmButton: false,
      timer: 2500,
    });

    await axios.post("http://localhost:5000/api/create-user", userInfo);
    await addDoc(usersCollectionRef, {
      name,
      email: userCredential.user.email,
      photoURL: image,
      uid: userCredential.user.uid,
    });
  };

  // Google login handler
  const handleGoogleLogin = (event) => {
    event.preventDefault();

    googleLogin()
      .then(() => {
        navigate(from, { replace: true });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome Back",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Please try again later!",
        });
      });
  };

  if (loading)
    return (
      <div className="text-center h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );

  if (user) return <Navigate to="/" replace />;

  return (
    <div>
      {isSignUp ? (
        <>
          <div className="flex flex-col min-h-screen justify-center my-32">
            <h1 className="text-center text-4xl">Sign Up</h1>
            <form
              onSubmit={handleSignUp}
              action=""
              className="lg:w-1/3 lg:mx-auto p-5 lg:p-0 space-y-5"
            >
              <div className="flex flex-col w-full">
                <label htmlFor="name" className="text-gray-500 mb-2">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="py-3 px-6 w-full border rounded-md outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="text-gray-500 mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="py-3 px-6 w-full border rounded-md outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="file" className="text-gray-500 mb-2">
                  Photo URL
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="file-input file-input-bordered file-input-error w-full max-w-xs"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="phone" className="text-gray-500 mb-2">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="py-3 px-6 w-full border rounded-md outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="district" className="text-gray-500 mb-2">
                  District
                </label>
                <select
                  required
                  className="py-3 px-6 w-full border rounded-md outline-none cursor-pointer"
                  id="district"
                  name="district"
                >
                  {districts.map((district) => {
                    return (
                      <option value={`district`} key={district}>
                        {district}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-gray-500 mb-2">
                  Password
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter a new password"
                  className="py-3 px-6 w-full border rounded-md outline-none"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="text-gray-500 mb-2">
                  Confirm Password
                </label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re enter the new password"
                  className="py-3 px-6 w-full border rounded-md outline-none"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <div className="lg:w-1/3 lg:mx-auto p-5 lg:p-0 mt-3">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-ss-3xl rounded-ee-3xl shadow-md px-6 py-4 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <svg
                  className="h-6 w-6 mr-2"
                  xmlnsXlink="http://www.w3.org/2000/svg"
                  xmlnsxlink:xlink="http://www.w3.org/1999/xlink"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
            <p className="text-center mt-5 cursor-pointer">
              Do you have an account?{" "}
              <Link to="/login" className="text-[#FC7676]">
                Login
              </Link>
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col min-h-screen justify-center mt-5">
          <h1 className="text-center text-4xl">Sign In</h1>
          <form
            onSubmit={handleLogin}
            action=""
            className="lg:w-1/3 lg:mx-auto p-5 space-y-5"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-gray-500 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="py-3 px-6 w-full border rounded-md outline-none"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="text-gray-500 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="py-3 px-6 w-full border rounded-md outline-none"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="lg:w-1/3 lg:mx-auto p-5 lg:p-0 mt-3">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-ss-3xl rounded-ee-3xl shadow-md px-6 py-4 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <svg
                className="h-6 w-6 mr-2"
                xmlnsXlink="http://www.w3.org/2000/svg"
                xmlnsxlink:xlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    {" "}
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
          <p className="text-center mt-5 cursor-pointer">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FC7676]">
              Register
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
