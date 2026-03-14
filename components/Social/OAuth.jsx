import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { app } from "@/firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/state/auth/authSlice";

export default function OAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      console.log(idToken,"idToken");

      // Extract first and last name from displayName
      const nameParts = result.user.displayName
        ? result.user.displayName.split(" ")
        : ["Google", "User"];
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || firstName;

      // Call backend to verify/register social user
      const res = await api.post(`/v1/auth/ssologin`, {
        idToken,
        firstName,
        lastName,
      });

      const data = res.data.data || res.data;

      // Structure data as expected by lib/api.js and Redux authSlice
      // Backend returns 'tokens' object which usually contains access and refresh
      const tokens = data.tokens || {
        access: {
          token: data.accessToken,
        },
      };

      // Dispatch to Redux to update state immediately
      dispatch(loginSuccess({
        user: data.user,
        tokens,
        rememberMe: true
      }));
      
      toast.success("Login successful");
      router.push(returnUrl || "/");
    } catch (error) {
      console.error("could not login with google", error.message);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex flex-col gap-y-3">
      <button
        type="button"
        onClick={handleGoogleClick}
        className=" w-full text-[#2E2E2E]  border border-[#E9E9E9] rounded-[6px] p-3 flex justify-center items-center gap-3"
      >
        <FcGoogle className="text-3xl" />{" "}
        <p className=" font-medium md:text-sm text-xs">Sign up with Google</p>
      </button>
    </div>
  );
}
