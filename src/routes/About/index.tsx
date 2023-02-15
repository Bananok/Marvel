import React, { FC, useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import styled from "styled-components";

import characters from "../../api/characters";
import comics from "../../api/comics";
import series from "../../api/series";
import HeartIcon from "../../assets/img/heart.png";
import RedHeartIcon from "../../assets/img/redHeart.png";
import Loader from "../../components/Loader";
import appStore from "../../stores/appStore";
import { Card } from "../../types/card";

interface AboutProps {
  entities: string;
}

const About: FC<AboutProps> = ({ entities }) => {
  const { id } = useParams();
  const [item, setItem] = useState<Card>();
  const [error, setError] = useState<string>("");
  const { themeIsBlack, checkItem, addOrRemoveFavourite } = appStore;
  const { t } = useTranslation();

  useEffect(() => {
    if (entities === "characters")
      characters
        .getCharacterById(id)
        .then((res) => setItem(res[0]))
        .catch((error: { message: string }) => setError(error.message));
    else if (entities === "comics")
      comics
        .getComicById(id)
        .then((res) => setItem(res[0]))
        .catch((error: { message: string }) => setError(error.message));
    else
      series
        .getSeriesById(id)
        .then((res) => setItem(res[0]))
        .catch((error: { message: string }) => setError(error.message));
  }, [id, entities]);

  if (!item) return <Loader error={error} />;

  return (
    <Root>
      <FavouriteButton>
        <FavouriteItem
          onClick={() => addOrRemoveFavourite(item)}
          src={checkItem(Number(id)) ? RedHeartIcon : HeartIcon}
        />
      </FavouriteButton>
      <ImageItem src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
      <TextItem themeIsBlack={themeIsBlack}>
        <TitleItem>
          <Title>{item.name || item.title}</Title>
          <Desription>{item.description}</Desription>
        </TitleItem>
        <CharactersItem hasCharacters={!!item.characters}>
          <LinkTitle>{t("characters")}</LinkTitle>
          <Links>
            {item.characters?.items?.map((character) => {
              const strings = character.resourceURI.split("/");
              const id = strings[strings.length - 1];
              return (
                <MyLink key={id} href={`/${id}`}>
                  {character.name}
                </MyLink>
              );
            })}
          </Links>
        </CharactersItem>
        <ComicsItem hasComics={!!item.comics}>
          <LinkTitle>{t("comics")}</LinkTitle>
          <Links>
            {item.comics?.items?.map((comic) => {
              const strings = comic.resourceURI.split("/");
              const id = strings[strings.length - 1];
              return (
                <MyLink key={id} href={`/comics/${id}`}>
                  {comic.name}
                </MyLink>
              );
            })}
          </Links>
        </ComicsItem>
        <SeriesItem hasSeries={!!item.series}>
          <LinkTitle>{t("series")}</LinkTitle>
          <Links>
            {item.series?.items?.map((episode) => {
              const strings = episode.resourceURI.split("/");
              const id = strings[strings.length - 1];
              return (
                <MyLink key={id} href={`/series/${id}`}>
                  {episode.name}
                </MyLink>
              );
            })}
          </Links>
        </SeriesItem>
      </TextItem>
    </Root>
  );
};

export default observer(About);

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const ImageItem = styled.img`
  width: auto;
  height: 400px;
`;
const TextItem = styled.div<{ themeIsBlack: boolean }>`
  padding-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  color: ${({ theme, themeIsBlack }) =>
    themeIsBlack ? theme.colors.white : theme.colors.black};
`;
const TitleItem = styled.div`
  width: 30%;
`;
const Title = styled.h3`
  ${({ theme }) => theme.typography.titleL};
  padding-bottom: 20px;
`;
const Desription = styled.div`
  ${({ theme }) => theme.typography.lightL};
`;
const LinkTitle = styled.div`
  ${({ theme }) => theme.typography.titleM};
  padding-bottom: 20px;
`;
const Links = styled.div`
  display: flex;
  flex-direction: column;
`;
const MyLink = styled.a`
  text-decoration: none;
  padding-bottom: 10px;
`;
const CharactersItem = styled.div<{ hasCharacters?: boolean }>`
  display: ${({ hasCharacters }) => (hasCharacters ? "flex" : "none")};
  flex-direction: column;
`;
const ComicsItem = styled.div<{ hasComics?: boolean }>`
  display: ${({ hasComics }) => (hasComics ? "flex" : "none")};
  flex-direction: column;
`;
const SeriesItem = styled.div<{ hasSeries?: boolean }>`
  display: ${({ hasSeries }) => (hasSeries ? "flex" : "none")};
  flex-direction: column;
`;
const FavouriteButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: 10%;
  top: 5%;
  width: max-content;
  height: max-content;
  border: none;
  background: transparent;
  padding: 0;
  border-radius: 10px;
`;
const FavouriteItem = styled.img`
  position: absolute;
  right: 10%;
  top: 5%;
  width: 55px;
  height: 55px;
  cursor: pointer;

  :hover {
    width: 58px;
    height: 58px;
    right: 3%;
    top: 6%;
  }
`;
