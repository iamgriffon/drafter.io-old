import { IoMdSettings } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export function Navbar() {
  const user = useUser();
  const { isLoaded, isSignedIn, user: userProps } = user;

  return (
    <>
      <div className="flex flex-row justify-between self-center items-center py-4 px-8 w-full max-w-[1440px] border-b-2 mb-3">
        <div className="flex flex-row gap-8">
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"Start/Reset"}
          </span>
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"New Draft"}
          </span>
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"Import"}
          </span>
          <span className="text-gray-100 font-bold   cursor-pointer">
            {"Export"}
          </span>
          <span className="text-gray-100 font-bold   hover:text-gray-300 cursor-pointer">
            {"Save"}
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <IoMdSettings
            size={24}
            className="fill-gray-100 cursor-pointer hover:fill-gray-300"
          />
          {!!user.isSignedIn && (
            <div className="rounded-full h-5">
              <Image
                src={userProps?.profileImageUrl!}
                className='rounded-full'
                width={24}
                height={24}
                alt="Profile Picture"
              />
            </div>
          )}
          <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
        </div>
      </div>
    </>
  );
}
