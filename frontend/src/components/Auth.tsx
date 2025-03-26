import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Create a navigate function for navigation

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, redirect to the home page or another page
      navigate("/#"); // Change "/home" to your desired route
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", form)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          console.log("User logged in successfully:", res.data);
          navigate("/home"); // Redirect after successful login
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-1 px-10 py-16 text-center sm:px-12 md:px-[60px] border border-black ">
              <div className="mb-10 text-center md:mb-16">
                <a href="/#" className="mx-auto inline-block max-w-[350px]">
                  <img
                    src={
                      "https://firebasestorage.googleapis.com/v0/b/spotlight-53c23.appspot.com/o/GDGlogo.png?alt=media&token=d67ad5e5-5479-4d3b-a782-a4b09104fea7"
                    }
                    alt="logo"
                  />
                </a>
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox
                  type="email"
                  name="email"
                  placeholder="Email"
                  handleChange={handleChange}
                />
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                  handleChange={handleChange}
                />
                <div className="mb-10">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-md border border-black bg-[#4285F4] px-5 py-3 text-base font-medium text-white transition"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <p className="mb-6 text-base text-secondary-color font-roboto">
                Connect With
              </p>
              {/* Social login buttons */}
              <a
                href="/#"
                className="font-roboto mb-2 inline-block text-base text-dark hover:text-primary hover:underline "
              >
                Forget Password?
              </a>
              <p className="text-base text-body-color font-roboto ">
                <span className="pr-0.5">Not a member yet?</span>
                <a
                  href="/#"
                  className="text-primary hover:underline font-roboto"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

const InputBox = ({ type, placeholder, name, handleChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        className="font-roboto w-full rounded-md border border-black  px-5 py-3 text-base text-body-color outline-none  focus-visible:shadow-none "
      />
    </div>
  );
};
