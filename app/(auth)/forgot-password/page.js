import Image from 'next/image';

export default function ForgotPassPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#DFF5F8] to-white">
      <div className="flex w-[500px] flex-col items-center justify-start gap-6 rounded-[36px] bg-white/80 p-11 shadow-[0px_0px_32px_0px_rgba(0,0,0,0.07)] outline outline-1 outline-offset-[-1px] outline-zinc-300 backdrop-blur-lg">
        {/* Header */}
        <div className="flex flex-col items-center justify-start gap-4 self-stretch">
          <Image
            src="/icon/keys.png" // icon dari folder public
            alt="Edit"
            width={120}
            height={120}
            className="cursor-pointer"
          />
          <div className="flex flex-col items-center justify-start gap-1 self-stretch">
            <div className="text-center text-xl leading-7 font-medium text-black">
              Forgot Password?
            </div>
            <div className="text-center text-sm leading-4 font-normal text-neutral-500">
              Don’t worry, we will send you a password reset link
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="text-base leading-5 font-medium text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="focus:ring-Primary600 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base leading-5 text-black outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Button */}
        <button className="w-full rounded-2xl bg-[#2AB2C7] px-6 py-3 text-base font-medium text-white">
          Send password reset link
        </button>

        {/* Footer: Back to Login & Resend */}
        <div className="mt-2 flex w-full justify-between">
          <span className="cursor-pointer text-sm leading-4 font-normal text-stone-500 underline">
            Back to Login
          </span>
          <span className="text-Primary600 cursor-pointer text-sm leading-4 font-bold">
            Resend link
          </span>
        </div>
      </div>
    </div>
  );
}
