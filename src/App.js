import React from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "./contexts/ContextProvider";
import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query"; // import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hooks/provider/AuthProvider";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./guards/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`${
          currentMode === "Dark" ? "dark" : ""
        }`}
      >
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="*"
                element={
                  <Navigate to="/" replace />
                }
              />
              <Route
                path="/login"
                element={<AuthPage />}
              />
              <Route
                path="/"
                element={<ProtectedRoute />}
              >
                {/* Dashboard */}
                <Route
                  path="/"
                  element={<Ecommerce />}
                />
                <Route
                  path="/dashboard"
                  element={<Ecommerce />}
                />

                {/* Pages */}
                <Route
                  path="/projects"
                  element={<Orders />}
                />
                <Route
                  path="/employees"
                  element={<Employees />}
                />
                <Route
                  path="/customers"
                  element={<Customers />}
                />

                {/* Apps */}
                <Route
                  path="/tasks"
                  element={<Kanban />}
                />
                <Route
                  path="/notes"
                  element={<Editor />}
                />
                <Route
                  path="/events"
                  element={<Calendar />}
                />
                <Route
                  path="/configuration"
                  element={<ColorPicker />}
                />

                {/* Charts */}
                <Route
                  path="/revenue"
                  element={<Line />}
                />
                <Route
                  path="/area"
                  element={<Area />}
                />
                <Route
                  path="/bar"
                  element={<Bar />}
                />
                <Route
                  path="/pie"
                  element={<Pie />}
                />
                <Route
                  path="/financial"
                  element={<Financial />}
                />
                <Route
                  path="/color-mapping"
                  element={<ColorMapping />}
                />
                <Route
                  path="/pyramid"
                  element={<Pyramid />}
                />
                <Route
                  path="/stacked"
                  element={<Stacked />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
};

export default App;
