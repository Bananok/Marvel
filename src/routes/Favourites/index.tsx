import React, { FC } from "react";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Card from "../../components/Card";
import appStore from "../../stores/appStore";

const Favourites: FC = () => {
  const { t } = useTranslation();
  const { favourites } = appStore;
  return (
    <Root>
      {favourites.length ? (
        <>
          <Title>
            {t("favourites")}
            <NumberFavourites>{`(${favourites.length})`}</NumberFavourites>
          </Title>
          <Cards>
            {favourites.map((favourite) => (
              <Card key={favourite.id} card={favourite} />
            ))}
          </Cards>
        </>
      ) : (
        <Message>{t("no favourite items")}</Message>
      )}
    </Root>
  );
};

export default observer(Favourites);

const Root = styled.div``;
const Title = styled.h1`
  padding: 30px 20px;
  ${({ theme }) => theme.typography.titleL};
  color: ${({ theme }) => theme.colors.black};
`;
const NumberFavourites = styled.span`
  ${({ theme }) => theme.typography.titleM};
  color: ${({ theme }) => theme.colors.gray};
`;
const Cards = styled.div`
  width: 100%;
  display: grid;
`;
const Message = styled.div`
  ${({ theme }) => theme.typography.titleL};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;
