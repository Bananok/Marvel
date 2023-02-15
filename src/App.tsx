import React from "react";

import { observer } from "mobx-react-lite";
import { useRoutes } from "react-router-dom";
import styled from "styled-components";

import Background from "./assets/img/background.png";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { routes } from "./routes";
import appStore from "./stores/appStore";
import "./localization";

const App = () => {
  const route = useRoutes(routes);
  const { themeIsBlack } = appStore;

  return (
    <Root themeIsBlack={themeIsBlack}>
      <Header />
      <Content>{route}</Content>
      <Footer />
    </Root>
  );
};

export default observer(App);

const Root = styled.div<{ themeIsBlack: boolean }>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ themeIsBlack }) =>
    themeIsBlack ? `url(${Background})` : "transparent"};
`;
const Content = styled.div`
  width: 100%;
`;
