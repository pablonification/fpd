export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#DFF5F8] to-white">
      <div className="flex w-[500px] flex-col items-center justify-start gap-6 rounded-[36px] bg-white/80 p-11 shadow-[0px_0px_32px_0px_rgba(0,0,0,0.07)] outline outline-1 outline-offset-[-1px] outline-zinc-300 backdrop-blur-lg">
        {/* Header */}
        <div className="flex flex-col items-center justify-start gap-4 self-stretch">
          <div className="h-7 w-7 bg-zinc-300" />
          <div className="flex flex-col items-center justify-start gap-3 self-stretch">
            <div className="text-center text-2xl leading-8 font-medium text-black">
              Welcome Back
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col items-start justify-start gap-4 self-stretch">
          {/* Email */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="text-base leading-5 font-medium text-black">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="focus:ring-Primary600 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base leading-5 text-black outline-none focus:ring-2"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col items-start justify-start gap-2 self-stretch">
            <label className="text-base leading-5 font-medium text-black">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="focus:ring-Primary600 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base leading-5 text-black outline-none focus:ring-2"
            />
            <div className="mt-1 text-sm leading-4 font-normal text-neutral-500">
              Forgot password?{' '}
              <span className="cursor-pointer underline">Click here</span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="bg-Primary600 w-full rounded-2xl px-6 py-3 text-base font-medium text-white">
          Login
        </button>
      </div>
    </div>
  );
}
