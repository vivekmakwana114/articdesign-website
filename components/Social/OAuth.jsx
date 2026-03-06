import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { app } from "@/firebase";

export default function OAuth() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      // return console.log(result);

      const res = await api.post(`/auth/outh`, {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
      const data = res.data;
      if (data.flag === false) {
        console.log("error", data.message);
        toast.error(data.message);
        return;
      }
      localStorage.setItem("accessToken", data.accessToken);
      router.push(returnUrl || "/"); // Redirect after successful submission
    } catch (error) {
      console.log("could not login with google", error.message);
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

      <button
        type="button"
        onClick={() => {
          console.log("apple");
        }}
        className=" w-full text-[#2E2E2E]  border border-[#E9E9E9] rounded-[6px] p-3 flex justify-center items-center gap-3"
      >
        <FaApple className="text-3xl" />{" "}
        <p className=" font-medium md:text-sm text-xs">Sign up with Apple</p>
      </button>
    </div>
  );
}
