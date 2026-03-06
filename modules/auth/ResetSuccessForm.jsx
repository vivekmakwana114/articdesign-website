"use client";

const ResetSuccessForm = ({ onBack, onResend, loading }) => {
  return (
    <div className="flex flex-col space-y-5 md:min-w-96">
      <h1 className="text-[#111827] text-[28px] font-bold">Check Your Email</h1>
      <p className="text-[#111827] text-sm font-normal">
        We&apos;ve sent a Reset Password link to your email. Please check your
        inbox and follow the link to proceed.
      </p>
      <p className="text-[#111827] text-sm font-normal">
        Didn&apos;t receive the email?{" "}
        <button
          type="button"
          className="text-[#0071E3] underline cursor-pointer hover:text-[#0071E3]/80 transition-colors"
          onClick={onResend}
          disabled={loading}
        >
          Resend
        </button>
      </p>

      <div className="mt-6">
        <p className="text-center text-gray-500 text-xs leading-tight">
          Remember your password?{" "}
          <button
            type="button"
            className="text-[#0071E3] cursor-pointer font-semibold hover:text-[#0071E3]/80 transition-colors"
            onClick={onBack}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetSuccessForm;
