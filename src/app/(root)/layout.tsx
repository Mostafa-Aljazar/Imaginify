import Main_Layout from "@/components/layouts/main-layout";
import Navbar from "@/components/shared/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row px-2 pt-16 min-h-screen">
      <Navbar />
      <div className="flex-1 px-2">{children}</div>
    </div>
  );
}
