import { Navbar } from '../src/components/Navbar/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
