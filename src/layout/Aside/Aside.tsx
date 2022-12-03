import React, { FC, ReactNode, useContext, useRef } from "react";
import classNames from "classnames";
import { motion, MotionStyle } from "framer-motion";
import ThemeContext from "../../context/themeContext";
import useAsideTouch from "../../hooks/useAsideTouch";

interface IAsideHeadProps {
  children: ReactNode;
}
export const AsideHead: FC<IAsideHeadProps> = ({ children }) => {
  return <div className="aside-head">{children}</div>;
};

interface IAsideBodyProps {
  children: ReactNode;
}
export const AsideBody: FC<IAsideBodyProps> = ({ children }) => {
  return <div className="aside-body">{children}</div>;
};

interface IAsideFootProps {
  children: ReactNode;
}
export const AsideFoot: FC<IAsideFootProps> = ({ children }) => {
  return <div className="aside-foot">{children}</div>;
};

interface IAsideProps {
  children: any;
}
const Aside: FC<IAsideProps> = ({ children }) => {
  const { asideStatus } = useContext(ThemeContext);

  const { asideStyle, touchStatus, hasTouchButton, asideWidthWithSpace, x } =
    useAsideTouch();

  const isModernDesign = process.env.REACT_APP_MODERN_DESGIN === "true";

  const constraintsRef = useRef(null);

  return (
    <>
      <motion.aside
        style={asideStyle as MotionStyle}
        className={classNames(
          "aside",
          { open: asideStatus },
          {
            "aside-touch-bar": hasTouchButton && isModernDesign,
            "aside-touch-bar-close":
              !touchStatus && hasTouchButton && isModernDesign,
            "aside-touch-bar-open":
              touchStatus && hasTouchButton && isModernDesign,
          }
        )}
      >
        {children}
      </motion.aside>
      {asideStatus && hasTouchButton && isModernDesign && (
        <>
          <motion.div className="aside-drag-area" ref={constraintsRef} />
        </>
      )}
    </>
  );
};

export default Aside;
