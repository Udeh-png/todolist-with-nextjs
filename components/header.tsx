import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

export default async function Header() {
  const session = await auth();

  return (
    <nav className="h-12 md:h-15 md:justify-end justify-start flex px-2">
      <div className="flex gap-5 items-center justify-between md:w-fit w-full">
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

        {session && (
          <Image
            width={40}
            height={40}
            src={`${session ? session.user?.image : "/"}`}
            alt=""
            className="border rounded-full"
          />
        )}
      </div>
    </nav>
  );
}
