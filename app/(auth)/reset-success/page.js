import Image from 'next/image';

export default function ResetSuccess() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#DFF5F8] to-white">
      <div className="flex w-[500px] flex-col items-center justify-start gap-6 rounded-[36px] bg-white/80 p-11 shadow-[0px_0px_32px_0px_rgba(0,0,0,0.07)] outline outline-1 outline-offset-[-1px] outline-zinc-300 backdrop-blur-lg">
        {/* Header */}
        <div className="flex flex-col items-center justify-start gap-4 self-stretch">
          <Image
            src="/icon/lock.png" // icon dari folder public
            alt="Edit"
            width={120}
            height={120}
            className="cursor-pointer"
          />
          <div className="flex flex-col items-center justify-start gap-1 self-stretch">
            <div className="text-center text-xl leading-7 font-medium text-black">
              Password Reset Successfully!
            </div>
            <div className="text-center text-sm leading-4 font-normal text-neutral-500">
              Click below to login with your new password
            </div>
          </div>
        </div>

        {/* Form */}

        {/* Button */}
        <button className="w-full rounded-2xl bg-[#2AB2C7] px-6 py-3 text-base font-medium text-white">
          Login
        </button>

        {/* Back to login */}
      </div>
    </div>
  );
}
