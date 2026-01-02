import Navbar from './_components/navbar';
import Footer from './_components/footer';

export const metadata = {
  title: 'Si-Zero',
};

export default function UserLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
