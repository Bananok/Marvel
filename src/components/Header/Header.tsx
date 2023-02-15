import React, { FC } from "react";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import LogoIcon from "../../assets/icons/logo.svg";
import { setLanguage } from "../../localization";
import appStore from "../../stores/appStore";
import Toogle from "../Toogle";

const Header: FC = () => {
  const { pathname } = useLocation();
  const { themeIsBlack, changeTheme } = appStore;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isChecked = localStorage.getItem("LOCALE") === "enUS";
  return (
    <Root themeIsBlack={themeIsBlack}>
      <Logo src={LogoIcon} alt="Logo" />
      <ThemeItem>
        Base
        <Toogle
          isChecked={themeIsBlack}
          onChange={() => {
            changeTheme();
          }}
        />
        Dark
      </ThemeItem>

      <LanguageItem>
        <LanguageButton
          onClick={() => setLanguage("enUS")}
          isActive={isChecked}
        >
          ENG
        </LanguageButton>
        <LanguageButton
          onClick={() => setLanguage("ruRU")}
          isActive={!isChecked}
        >
          RUS
        </LanguageButton>
      </LanguageItem>

      <Buttons>
        <HeaderButton
          themeIsBlack={themeIsBlack}
          onClick={() => navigate("/favourites")}
          isThisPage={pathname === "/favourites"}
        >
          {t("favourites")}
        </HeaderButton>
        <HeaderButton
          themeIsBlack={themeIsBlack}
          onClick={() => navigate("/")}
          isThisPage={pathname === "/"}
        >
          {t("characters")}
        </HeaderButton>
        <HeaderButton
          themeIsBlack={themeIsBlack}
          onClick={() => navigate("/comics")}
          isThisPage={pathname === "/comics"}
        >
          {t("comics")}
        </HeaderButton>
        <HeaderButton
          themeIsBlack={themeIsBlack}
          onClick={() => navigate("/series")}
          isThisPage={pathname === "/series"}
        >
          {t("series")}
        </HeaderButton>
      </Buttons>
    </Root>
  );
};

export default observer(Header);

const Root = styled.header<{ themeIsBlack: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  border-bottom: ${({ themeIsBlack, theme }) =>
    themeIsBlack ? `1px solid ${theme.colors.white}` : "none"};
  background-color: ${({ theme, themeIsBlack }) =>
    themeIsBlack ? "transparent" : theme.colors.red};
`;
const Logo = styled.img`
  width: auto;
  height: 60%;
  padding-left: 10px;
`;
const Buttons = styled.div`
  display: flex;
  padding-right: 10px;
  width: 600px;
  justify-content: center;
`;
const LanguageItem = styled.div`
  display: flex;
  align-items: center;
`;
const LanguageButton = styled.button<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? "45px" : "40px")};
  height: ${({ isActive }) => (isActive ? "30px" : "25px")};
  margin-left: 20px;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.blue : theme.colors.white};
  ${({ theme }) => theme.typography.desRegular};
  border: none;
  outline: ${({ theme, isActive }) =>
    isActive ? `2px solid ${theme.colors.blue}` : "none"};
  cursor: pointer;
`;
const ThemeItem = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typography.desRegular};
  color: ${({ theme }) => theme.colors.white};
`;
const HeaderButton = styled.button<{
  isThisPage: boolean;
  themeIsBlack: boolean;
}>`
  border: none;
  background: transparent;
  cursor: pointer;
  ${({ theme }) => theme.typography.titleM};
  color: ${({ theme, themeIsBlack }) =>
    themeIsBlack ? theme.colors.blue : theme.colors.yellow};
  text-decoration: ${({ isThisPage }) => (isThisPage ? "underline" : "none")};

  :hover {
    text-decoration: underline;
  }
`;
