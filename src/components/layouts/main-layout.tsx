import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { Toaster } from "../ui/sonner";

export default function Main_Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Toaster />

      {/* <Footer /> */}
    </>
  );
}
