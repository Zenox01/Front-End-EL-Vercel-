import React, { useContext, useState } from "react";
import classNames from "classnames";
import Brand from "../../../layout/Brand/Brand";
import Navigation, {
  NavigationLine,
} from "../../../layout/Navigation/Navigation";
import { mainMenu } from "../../../Components/menu";
import ThemeContext from "../../../context/themeContext";
import useDarkMode from "../../../hooks/useDarkMode";
import Aside, {
  AsideBody,
  AsideFoot,
  AsideHead,
} from "../../../layout/Aside/Aside";
import Icon from "../../../Components/icon/Icon";

const DefaultAside = () => {
  const { asideStatus, setAsideStatus } = useContext(ThemeContext);

  const [doc, setDoc] = useState(false);

  const { darkModeStatus } = useDarkMode();

  return (
    <Aside>
      <AsideHead>
        <Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
      </AsideHead>
      <AsideBody>
        <Navigation menu={mainMenu} id="aside-dashboard" />
      </AsideBody>
      <AsideFoot>
        <nav aria-label="aside-bottom-menu">
          <div className="navigation">
            <div
              role="presentation"
              className="navigation-item cursor-pointer"
              onClick={() => {
                setDoc(!doc);
              }}
              data-tour="documentation"
            >
              <span className="navigation-link navigation-link-pill">
                <span className="navigation-link-info">
                  <Icon
                    icon={doc ? "ToggleOn" : "ToggleOff"}
                    color={doc ? "success" : undefined}
                    className="navigation-icon"
                  />
                </span>
                <span className="navigation-link-extra">
                  <Icon
                    icon="Circle"
                    className={classNames(
                      "navigation-notification",
                      "text-success",
                      "animate__animated animate__heartBeat animate__infinite animate__slower"
                    )}
                  />
                </span>
              </span>
            </div>
          </div>
        </nav>
      </AsideFoot>
    </Aside>
  );
};

export default DefaultAside;
