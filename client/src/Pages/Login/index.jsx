// The Log In Page
// !FIX: The background image is pushing the footer down in desktop view

import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import StyledButton from "../../components/StyledButton";
import StyledFormInput from "../../components/StyledFormInput";
import loginBG from "./kyle_chloe_login_bg.jpg";

export default function Login(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      localStorage.setItem("name", data.login.user.username);
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <section className="flex min-h-full">
      <div
        className="min-h-full bg-cover bg-center md:w-1/2"
        style={{ backgroundImage: `url(${loginBG})` }}
      ></div>
      <div className="flex w-screen items-center justify-center md:w-1/2">
        <div className="w-full px-10">
          {data ? (
            <p>
              <RouterLink to={"/myevents"}>MyEvents</RouterLink>
            </p>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              className="mb-5 flex flex-col items-center rounded-md bg-beige px-5 py-10 shadow-lg"
            >
              <StyledFormInput
                fullWidthStyle
                onChange={handleChange}
                type={"text"}
                name={"username"}
                placeholder={"Username"}
                value={formState.username}
                required
              />
              <StyledFormInput
                fullWidthStyle
                onChange={handleChange}
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                value={formState.password}
                required
              />
              <StyledButton submit primaryColor>
                Log In
              </StyledButton>
            </form>
          )}
          {error && <div className="">{error.message}</div>}
          <p className="text-right">
            Not a member?{" "}
            <RouterLink to={"/signup"} className="underline hover:no-underline">
              Sign Up Now!
            </RouterLink>
          </p>
        </div>
      </div>
    </section>
  );
}
