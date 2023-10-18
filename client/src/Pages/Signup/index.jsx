// The Sign Up page
// !FIX: The background image is pushing the footer down in desktop view

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../utils/mutations";
import { Link as RouterLink } from "react-router-dom";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";
import signupBG from "./ben_jane_signup_bg.jpg";
import Auth from "../../utils/auth";

export default function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [addUser, { loading, error, data }] = useMutation(REGISTER_USER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...userData } });
      localStorage.setItem("name", userData.firstName + " " + userData.lastName);
      Auth.login(data.addUser.token);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <section className="flex min-h-full">
      <div
        className="min-h-full bg-cover bg-center md:w-1/2"
        style={{ backgroundImage: `url(${signupBG})` }}
      ></div>
      <div className="flex w-screen items-center justify-center md:w-1/2">
        <div className="w-full px-10">
          <form
            onSubmit={handleSubmit}
            className="mb-5 flex flex-col items-center rounded-md bg-beige px-5 py-10 shadow-lg"
          >
            <div className="flex w-full gap-4">
              <StyledFormInput
                halfWidthStyle
                onChange={handleInputChange}
                type={"text"}
                name={"firstName"}
                placeholder={"First Name"}
                required
              />
              <StyledFormInput
                halfWidthStyle
                onChange={handleInputChange}
                type={"text"}
                name={"lastName"}
                placeholder={"Last Name"}
                required
              />
            </div>
            <StyledFormInput
              fullWidthStyle
              onChange={handleInputChange}
              type={"text"}
              name={"username"}
              placeholder={"Username"}
              required
            />
            <StyledFormInput
              fullWidthStyle
              onChange={handleInputChange}
              type={"email"}
              name={"email"}
              placeholder={"Email"}
              required
            />
            <StyledFormInput
              fullWidthStyle
              onChange={handleInputChange}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              required
            />
            <StyledButton submit primaryColor>
              Sign Up
            </StyledButton>
          </form>
          <p className="text-right">
            Already a member?{" "}
            <RouterLink to={"/login"} className="underline hover:no-underline">
              Log In Now!
            </RouterLink>
          </p>
        </div>
      </div>
    </section>
  );
}
