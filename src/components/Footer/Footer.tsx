import React, { FC } from "react";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import LogoIcon from "../../assets/icons/logo.svg";
import appStore from "../../stores/appStore";

const Footer: FC = () => {
  const { themeIsBlack } = appStore;
  const { t } = useTranslation();

  return (
    <Root themeIsBlack={themeIsBlack}>
      <Logo src={LogoIcon} alt="Logo" />
      <TextItem>{t("data provided")} Marvel. © 2022 MARVEL</TextItem>
      <Link
        href="https://developer.marvel.com/"
        target="_blank"
        rel="noreferrer"
      >
        https://developer.marvel.com/
      </Link>
    </Root>
  );
};

export default observer(Footer);

const Root = styled.div<{ themeIsBlack: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  height: 70px;
  background-color: ${({ theme, themeIsBlack }) =>
    themeIsBlack ? "transparent" : theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.lightL};
`;
const Logo = styled.img`
  width: 150px;
  height: 50px;
`;
const TextItem = styled.div`
  padding-left: 15px;
`;
const Link = styled.a`
  padding-left: 15px;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
`;
