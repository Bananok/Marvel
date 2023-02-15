import React, { FC, useCallback } from "react";

import { observer } from "mobx-react-lite";
import styled from "styled-components";

import HeartIcon from "../../assets/img/heart.png";
import RedHeartIcon from "../../assets/img/redHeart.png";
import appStore from "../../stores/appStore";
import { Card as CardType } from "../../types/card";

interface CardProps {
  card: CardType;
}

const Card: FC<CardProps> = ({ card }) => {
  const { id, name, title, description, thumbnail } = card;
  const { checkItem, addOrRemoveFavourite } = appStore;
  const determineItem = useCallback(() => {
    if (card.characters && card.comics) {
      return "series";
    }
    if (card.characters && card.series) {
      return "comics";
    }
    return "";
  }, [card.characters, card.comics, card.series]);

  return (
    <Root>
      <FavouriteButton onClick={() => addOrRemoveFavourite(card)}>
        <FavouriteItem src={checkItem(id) ? RedHeartIcon : HeartIcon} />
      </FavouriteButton>
      <Link href={`${determineItem()}/${id}`}>
        <ImageItem src={`${thumbnail.path}.${thumbnail.extension}`} />
      </Link>
      <TextItem>
        <Link href={`${determineItem()}/${id}`}>
          <LinkItem>{name || title}</LinkItem>
        </Link>
        <Description>{description}</Description>
      </TextItem>
    </Root>
  );
};

export default observer(Card);

const Root = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: flex;
  align-items: center;
`;
const ImageItem = styled.img`
  width: 500px;
  height: 250px;
`;
const TextItem = styled.div`
  padding-left: 50px;
`;
const LinkItem = styled.h3`
  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.typography.subtitleM};
  padding-top: 10px;
  margin-bottom: 40px;
`;
const Description = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  ${({ theme }) => theme.typography.desRegular};
  width: 700px;
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
  width: 55px;
  height: 55px;

  :hover {
    width: 58px;
    height: 58px;
    right: 3%;
    top: 6%;
  }
`;
const Link = styled.a`
  text-decoration: none;
  max-width: max-content;
`;
