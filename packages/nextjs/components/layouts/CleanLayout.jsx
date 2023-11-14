export default function CleanLayout({ children }) {
  return (
    <>
      <main className="relative flex flex-col justify-center flex-1">{children}</main>
    </>
  );
}
