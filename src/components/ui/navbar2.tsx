import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { FaXmark, FaBars } from "react-icons/fa6";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 100) {
                setIsSticky(true);
            }
            else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.addEventListener('scroll', handleScroll);
        }
    })

    const navItems = [
        {link: "Scan", path: "scanner"},
        {link: "Explore", path: "explorer"},
    ]
    
    return (
      <header className='w-full bg-white md:bg-transparent fixed top-0 left-0 right-0'>
        <nav className={`py-4 lg:px-14 px-4 ${isSticky ? "sticky top-0 left-0 right-0 border-b bg-white duration-300" : ""}`}>
          <div className='flex justify-between items-center text-base gap-8'>
            <a href="/" className='text-2xl font-semibold flex items-center space-x-3'><img src="cyan-flower-icon.png" alt="" className='w-10 inline-block items-center'/><span className='text-[#263238] hover:text-brandPrimary'>FloraNet</span></a>

            <ul className='md:flex space-x-4 hidden'>
              {
                navItems.map(({link, path}) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} className='font-semibold text-2xl text-[#263238] py-2 px-4 transition-all duration-300 rounded hover:text-brandPrimary cursor-pointer'>{link}</Link>)
              }
            </ul>

            <div className='md:hidden'>
              <button 
              onClick={toggleMenu}
              className='text-neutralDGrey focus:outline-none focus:text-gray-500'>
                  {
                      isMenuOpen ? (<FaXmark className='h-6 w-6'/>) : (<FaBars className='h-6 w-6'/>)
                  }
              </button>
            </div>
          </div> 

          <div className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${ isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
            {
              navItems.map(({link, path}) => <Link to={path} spy={true} smooth={true} offset={-100} key={path} className='block text-base text-white hover:text-[#d1ecee] first:font-medium'>{link}</Link>)
            }
          </div>
        </nav>
      </header>
    );
}

export default Navbar;