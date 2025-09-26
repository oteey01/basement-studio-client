import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../data/avatar.jpg";
import {
  Cart,
  Chat,
  Notification,
  userProfile,
} from ".";
import { useStateContext } from "../contexts/ContextProvider";
import UserProfile from "./UserProfile";
import { useAuth } from "../hooks/provider/AuthProvider";
import { Modal } from "./Modal";
import { useDisclosure } from "../hooks/use-disclosure";
import { useLogout } from "../hooks/api/auth";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";

const NavButton = ({
  title,
  customFunc,
  icon,
  color,
  dotColor,
}) => {
  return (
    <TooltipComponent
      content={title}
      position="BottomCenter"
    >
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray hover:dark:bg-slate-600"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();
  const { user } = useAuth();
  const {
    isOpen: isLogoutOpen,
    close: closeLogout,
    open: openLogout,
  } = useDisclosure();
  const navigate = useNavigate();
  const logout = useLogout();
  // console.log(data);
  useEffect(() => {
    const handleResize = () =>
      setScreenSize(window.innerWidth);

    window.addEventListener(
      "resize",
      handleResize
    );

    handleResize();

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLogout = () => {
    logout();
    closeLogout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-2 md:mx-6 relative  ">
      {isLogoutOpen && (
        <Modal
          isOpen={isLogoutOpen}
          close={closeLogout}
          dialogClassName={
            "flex flex-col gap-6 w-fit h-fit max-w-[600px] bg-white p-7"
          }
        >
          <p className="font-semibold text-lg">
            Are you sure you want to logout?
          </p>
          <div className="flex gap-2 justify-end items-center">
            <button
              className="border border-gray-400 px-2 py-1"
              onClick={closeLogout}
            >
              Cancel
            </button>
            <button
              className="bg-red-400 text-white px-2 py-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </Modal>
      )}
      <NavButton
        title="Menu"
        customFunc={() =>
          setActiveMenu(
            (prevActionMenu) => !prevActionMenu
          )
        }
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => {
            handleClick("cart");
          }}
          color={currentColor}
          icon={<FiShoppingCart />}
        /> */}

        {/* <NavButton
          title="Chat"
          dotColor="#03c9d7"
          customFunc={() => {
            handleClick("chat");
          }}
          color={currentColor}
          icon={<BsChatLeft />}
        /> */}

        <NavButton
          title="Notifications"
          customFunc={() => {
            handleClick("notification");
          }}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent
          content="Profile"
          position="BottomCenter"
        >
          <div
            className="cursor-pointer flex items-center gap-2 cursot-pointer p-1 hover:bg-light-gray hover:dark:bg-slate-600 rounded-lg"
            onClick={() => openLogout()}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="avatar"
            />
            <p>
              <span className=" text-gray-400 text-14">
                Hi,{" "}
              </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user?.fullName}
              </span>
            </p>
            <MdKeyboardArrowDown className=" text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
        {isClicked.cart && <Cart />} */}
      </div>
    </div>
  );
};

export default Navbar;
