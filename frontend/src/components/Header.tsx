import React, { useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const token = localStorage.getItem("token");

  console.log("Token from localStorage:", token);

  const handleDelete = () => {
    localStorage.removeItem("token");
    console.log("User logged out and token removed.");
    window.location.href = "/login";
  };

  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
      <div className="container bg-white border-b border-[#E5E5E5] ">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-[400px] max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/spotlight-53c23.appspot.com/o/GDGlogo.png?alt=media&token=d67ad5e5-5479-4d3b-a782-a4b09104fea7"
                }
                alt="logo"
                className="w-full "
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color "></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color "></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color "></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  {isAuthenticated && (
                    <ListItem NavLink="/create">Create Post</ListItem>
                  )}
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleDelete}
                    className="font-roboto rounded-lg bg-red-600 px-7 py-3 text-base font-medium text-white"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="font-roboto px-7 py-3 text-base font-medium text-dark"
                  >
                    Sign in
                  </a>

                  <a
                    href="/signup"
                    className="font-roboto rounded-lg bg-[#DB4437] px-7 py-3 text-base font-medium text-white"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

interface ListItemProps {
  children: React.ReactNode; // Define children prop
  NavLink: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, NavLink }) => {
  return (
    <li>
      <a
        href={NavLink}
        className="font-roboto flex py-2 text-base font-medium text-dark hover:text-primary lg:ml-10 lg:inline-flex"
      >
        {children}
      </a>
    </li>
  );
};
