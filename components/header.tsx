import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="h-15 justify-end flex p-5">
      <div className="flex gap-5 items-center flex-row-reverse justify-between md:w-fit w-full">
        {session && (
          <Image
            width={40}
            height={40}
            src={`${session ? session.user?.image : "/"}`}
            alt=""
            className="border rounded-full"
          />
        )}
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit" className="my-button">
              LogOut
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button type="submit" className="my-button">
              LogIn
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
