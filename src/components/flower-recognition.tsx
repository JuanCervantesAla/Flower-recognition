import Navbar from "./ui/navbar2";
import Explorer from "./ui/explorer";
import Scanner from "./ui/scanner";
import OwnFooter from "./ui/ownFooter";

const FlowerRecognition = () => {
  return (
    <>
      <img className="absolute max-h-screen items-center justify-center flex w-full opacity-10" src="pattern.png" />
      <Navbar />
      <Explorer />
      <Scanner />
      <OwnFooter />
    </>
  );
}

export default FlowerRecognition;