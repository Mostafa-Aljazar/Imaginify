import Navbar from "@/components/shared/navbar";
import StoreUserComponent from "@/components/stores/store-user-component";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row px-2 pt-16 min-h-screen">
      <StoreUserComponent />
      <div className="hidden md:flex">
        <Navbar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
