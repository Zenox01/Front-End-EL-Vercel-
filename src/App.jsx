import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'
import JudgePanel from "./Pages/Validation/JudgePanel/JudgePanel";
import Department from "./Pages/Validation/Departments/Department";
import ChildDepartments from "./Components/Departments/ChildDepartments";
import ChildDepartmentFiles from "./Components/Departments/ChildDepartmentFiles";
import UserFolder from "./Components/UserFolder/UserFolder";
import Cases from "./Pages/Validation/Cases/ Cases";
import Judgment from "./Pages/Validation/Cases/Judgment";
import Statutes from "./Pages/Validation/Statutes/Statutes";
import Legislation from "./Pages/Validation/Statutes/Legislation";
import AsideRoutes from "./layout/Aside/AsideRoutes";
import useDarkMode from "./hooks/useDarkMode";
import { getOS } from "./helpers/helpers";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import ThemeContext from "./context/themeContext";
import { useFullscreen } from "react-use";
import { ThemeProvider } from "react-jss";
import COLORS from "./common/data/enumColors";
import "./styles/styles.scss";
import Wrapper from "./layout/Wrapper/Wrapper";

function App() {
  getOS();

  /**
   * Dark Mode
   */
  const { themeStatus, darkModeStatus } = useDarkMode();
  const theme = {
    theme: themeStatus,
    primary: COLORS.PRIMARY.code,
    secondary: COLORS.SECONDARY.code,
    success: COLORS.SUCCESS.code,
    info: COLORS.INFO.code,
    warning: COLORS.WARNING.code,
    danger: COLORS.DANGER.code,
    dark: COLORS.DARK.code,
    light: COLORS.LIGHT.code,
  };
  useEffect(() => {
    if (darkModeStatus) {
      document.documentElement.setAttribute("theme", "dark");
    }
    return () => {
      document.documentElement.removeAttribute("theme");
    };
  }, [darkModeStatus]);

  /**
   * Full Screen
   */
  // @ts-ignore
  const { fullScreenStatus, setFullScreenStatus } = useContext(ThemeContext);
  const ref = useRef(null);
  useFullscreen(ref, fullScreenStatus, {
    onClose: () => setFullScreenStatus(false),
  });

  /**
   * Modern Design
   */
  useLayoutEffect(() => {
    if (process.env.REACT_APP_MODERN_DESGIN === "true") {
      document.body.classList.add("modern-design");
    } else {
      document.body.classList.remove("modern-design");
    }
  });
  return (
    <ThemeProvider theme={theme}>
      {/* <Navbar />
      <Routes>
        <Route path="/department" element={<Department />} />
        <Route path="/department/:id" element={<ChildDepartments />} />
        <Route
          path="/department/child/files/:id"
          element={<ChildDepartmentFiles />}
        />
        <Route path="/judge/panel" element={<JudgePanel />} />
        <Route path="/user/documents" element={<UserFolder />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/judgment" element={<Judgment />} />

        <Route path="/statutes" element={<Statutes />} />
        <Route path="/statutes/:jurisdiction" element={<Statutes />} />
        <Route
          path="/statutes/:jurisdiction/:SubGroup"
          element={<Statutes />}
        />
        <Route
          path="/statutes/:jurisdiction/:SubGroup/:type"
          element={<Statutes />}
        />
        <Route path="/legislation" element={<Legislation />} />
      </Routes> */}

      <AsideRoutes />
      <Wrapper />
    </ThemeProvider>
  );
}

export default App;
