import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { showToast } from "@/helpers/showToast";
import { axiosInstance } from "@/lib/axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const response = await axiosInstance.post("/auth/google-login", {
        name: googleResponse.user.displayName,
        email: googleResponse.user.email,
        profilePic: googleResponse.user.photoURL,
      });

      showToast("success", response.data.message);
      navigate("/index");
    } catch (error) {
      const message =
        error.response.data.message ||
        "Something went wrong. Please try again.";
      showToast("error", message);
    }
  };
  return (
    <Button
      onClick={handleLogin}
      className="w-full bg-gray-700 hover:bg-gray-600"
    >
      <FcGoogle />
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;
