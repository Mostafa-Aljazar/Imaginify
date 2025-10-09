import Main_Layout from "@/components/layouts/main-layout";
import Navbar from "@/components/shared/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row px-2 pt-16 min-h-screen">
      <div className="hidden md:flex">
        <Navbar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
