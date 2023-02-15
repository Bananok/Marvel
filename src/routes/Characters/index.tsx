import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import debouce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";

import charactersApi from "../../api/characters";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { Card as CardType } from "../../types/card";

const Characters: FC = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [scrollCharacters, setScrollCharacters] = useState<CardType[]>([]);
  const [offset, setOffset] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const handleSetSearchString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchString(event.target.value);
    event.target.value
      ? charactersApi
          .getSearchCharacters(0, event.target.value)
          .then((res) => setScrollCharacters(res))
      : charactersApi
          .getCharactersScroll(0)
          .then((res) => setScrollCharacters(res));
  };
  const debouncedResults = useMemo(() => {
    return debouce(handleSetSearchString, 3000);
  }, []);

  const getCharacters = useCallback(async () => {
    setOffset(offset + 1);
    setLoading(true);
    searchString
      ? await charactersApi
          .getSearchCharacters(offset, searchString)
          .then((res) =>
            setScrollCharacters((prevState) => [...prevState, ...res])
          )
      : await charactersApi
          .getCharactersScroll(offset)
          .then((res) =>
            setScrollCharacters((prevState) => [...prevState, ...res])
          );
    setLoading(false);
  }, [setScrollCharacters, offset, searchString]);

  useEffect(() => {
    charactersApi
      .getCharactersScroll(0)
      .then((res) => setScrollCharacters(res))
      .catch((error: { message: string }) => setError(error.message));
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });
  return (
    <Root>
      {!!scrollCharacters.length ? (
        <>
          <Title>
            {t("characters")}
            <NumberCharacters>({scrollCharacters.length})</NumberCharacters>
          </Title>
          <SearchItem
            onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
              event.preventDefault()
            }
          >
            <SearchInput
              type="text"
              onChange={debouncedResults}
              placeholder={t("search placeholder") || ""}
            />
          </SearchItem>
          <Cards>
            <Virtuoso
              style={{
                height: "400px",
                width: "100%",
              }}
              data={scrollCharacters}
              endReached={getCharacters}
              overscan={200}
              itemContent={(index, character) => {
                return <Card key={index} card={character} />;
              }}
            />
          </Cards>
        </>
      ) : (
        <Loader error={error} />
      )}
      <Loading isLoading={isLoading}>
        <Loader isScroll />
      </Loading>
    </Root>
  );
};

export default observer(Characters);

const Root = styled.div``;
const Title = styled.h1`
  padding-left: 20px;
  ${({ theme }) => theme.typography.titleL};
  color: ${({ theme }) => theme.colors.black};
`;
const NumberCharacters = styled.span`
  ${({ theme }) => theme.typography.titleM};
  color: ${({ theme }) => theme.colors.gray};
`;
const SearchItem = styled.form`
  padding: 20px;
  display: flex;
  justify-content: center;
  height: 40px;
`;
const SearchInput = styled.input`
  width: 70%;
`;
const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const Loading = styled.div<{ isLoading: boolean }>`
  display: ${({ isLoading }) => (isLoading ? "block" : "none")};
`;
