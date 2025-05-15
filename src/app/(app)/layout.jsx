import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
