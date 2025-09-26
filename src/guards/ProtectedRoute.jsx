import {
  Navigate,
  Outlet,
} from "react-router-dom";
import { useAuth } from "../hooks/provider/AuthProvider";
import { Toaster } from "react-hot-toast";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { FiSettings } from "react-icons/fi";
import {
  Navbar,
  Sidebar,
  ThemeSettings,
} from "../components";

export default function ProtectedRoute({
  children,
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;
  if (!user)
    return <Navigate to="/login" replace />;

  return (
    <div>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

const MainLayout = ({ children }) => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div>
        <Toaster />
      </div>
      <div
        className="fixed right-4 bottom-4 "
        style={{ zIndex: "1000" }}
      >
        <TooltipComponent
          content="Settings"
          position="Top"
        >
          <button
            type="button"
            className=" text-3xl p-3 hover:bg-light-gray hover:drop-shadow-xl text-white"
            style={{
              background: currentColor,
              borderRadius: "50%",
            }}
            onClick={() => {
              setThemeSettings(true);
            }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 z-[50] fixed sidebar dark:bg-secondary-dark-bg bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-dark-bg min-h-screen bg-main-bg w-full
                        ${
                          activeMenu
                            ? "md:ml-72"
                            : "flex-2"
                        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar mb-10 w-full ">
          <Navbar />
        </div>

        <div>
          {themeSettings && <ThemeSettings />}
          {children}
        </div>
      </div>
    </div>
  );
};
