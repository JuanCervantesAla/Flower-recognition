import Navbar from "./ui/navbar";
import Home from "./ui/home";
import Sources from "./ui/sources";
import About from "./ui/about";
import Product from "./ui/product";
import OwnFooter from "./ui/ownFooter";

const MainHome = () => {
  return (
    <>
      <img className="absolute max-h-screen items-center justify-center flex w-full opacity-10" src="pattern.png" />
      <Navbar />
      <Home />
      <Sources />
      <About />
      <Product />
      <OwnFooter />
    </>
  );
}

export default MainHome