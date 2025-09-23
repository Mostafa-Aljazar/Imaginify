import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

export default function Main_Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
