import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <SessionProvider>
        <Header />
        {children}
      </SessionProvider>
    </div>
  );
}
