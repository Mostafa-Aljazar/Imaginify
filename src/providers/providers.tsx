import Clerk_Provider from "./clerk";

export default function Main_Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Clerk_Provider>{children}</Clerk_Provider>
    </>
  );
}
