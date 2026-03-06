"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  signupUser,
  sendForgotPassword,
  performResetPassword,
} from "@/state/auth/authSlice";

// Import sub views
import SignInForm from "@/modules/auth/SignInForm";
import SignUpForm from "@/modules/auth/SignUpForm";
import ForgotPasswordForm from "@/modules/auth/ForgotPasswordForm";
import ResetPasswordForm from "@/modules/auth/ResetPasswordForm";
import ResetSuccessForm from "@/modules/auth/ResetSuccessForm";

const AuthPageContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const [currentView, setCurrentView] = useState("signin");
  const [forgotEmail, setForgotEmail] = useState("");

  // Redux state
  const { status, resetStatus } = useSelector((state) => state.auth);

  const loading = status === "loading" || resetStatus === "loading";

  // Read initial view from search params
  useEffect(() => {
    const view = searchParams.get("view");
    const token = searchParams.get("token");
    if (view === "reset-password" || token) {
      setCurrentView("reset-password");
    } else if (view === "signup") {
      setCurrentView("signup");
    } else if (view === "forgot-password") {
      setCurrentView("forgot-password");
    }
  }, [searchParams]);

  // Set document title based on current view
  useEffect(() => {
    const titles = {
      signin: "Sign In",
      signup: "Sign Up",
      "forgot-password": "Forgot Password",
      "reset-password": "Reset Password",
      "reset-success": "Check Your Email",
    };
    document.title = titles[currentView] || "Auth";
    window.scrollTo(0, 0);
  }, [currentView]);

  // Login handler
  const handleLogin = (values) => {
    toast.loading("Logging in...");
    dispatch(
      loginUser({
        identifier: values.identifier,
        password: values.password,
        rememberMe: true,
      }),
    )
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("Login successful");
        const returnUrl = searchParams.get("returnUrl");
        router.push(returnUrl || "/");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Invalid email or password");
      });
  };

  // Signup handler
  const handleSignup = (values) => {
    toast.loading("Creating account...");
    dispatch(signupUser(values))
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("Account created successfully!");
        setCurrentView("signin");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Registration failed");
      });
  };

  // Forgot password handler
  const handleSendForgotPassword = (values) => {
    if (!values.email) return;
    setForgotEmail(values.email);
    toast.loading("Sending reset link...");
    dispatch(sendForgotPassword(values.email))
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("Reset link sent. Please check your mail.");
        setCurrentView("reset-success");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Failed to send reset link");
      });
  };

  // Resend reset link handler
  const handleResend = () => {
    if (!forgotEmail) {
      toast.error("No email to resend");
      return;
    }
    toast.loading("Resending link...");
    dispatch(sendForgotPassword(forgotEmail))
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("Link resent successfully");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Failed to resend link");
      });
  };

  // Reset password handler
  const handleResetPassword = (values) => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Missing reset token");
      return;
    }

    toast.loading("Resetting password...");
    dispatch(
      performResetPassword({
        token,
        password: values.password,
      }),
    )
      .unwrap()
      .then(() => {
        toast.dismiss();
        toast.success("Password changed successfully");
        setCurrentView("signin");
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.message || "Failed to reset password");
      });
  };

  const renderForm = () => {
    switch (currentView) {
      case "signin":
        return (
          <SignInForm
            onSubmit={handleLogin}
            onForgotPassword={() => setCurrentView("forgot-password")}
            onSwitchToSignUp={() => setCurrentView("signup")}
            loading={loading}
          />
        );
      case "signup":
        return (
          <SignUpForm
            onSubmit={handleSignup}
            onSwitchToSignIn={() => setCurrentView("signin")}
            loading={loading}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onSubmit={handleSendForgotPassword}
            onBack={() => setCurrentView("signin")}
            loading={loading}
          />
        );
      case "reset-password":
        return (
          <ResetPasswordForm onSubmit={handleResetPassword} loading={loading} />
        );
      case "reset-success":
        return (
          <ResetSuccessForm
            onBack={() => setCurrentView("signin")}
            onResend={handleResend}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="flex justify-center items-start h-screen p-5 mt-10 min-w-96">
      {renderForm()}
    </section>
  );
};

const AuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPageContent />
    </Suspense>
  );
};

export default AuthPage;
