import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import debouce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";

import comics from "../../api/comics";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { Card as CardType } from "../../types/card";

const Comics: FC = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [scrollComics, setScrollComics] = useState<CardType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(1);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const handleSetSearchString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchString(event.target.value);
    event.target.value
      ? comics
          .getSearchComics(0, event.target.value)
          .then((res) => setScrollComics(res))
      : comics.getComicsScroll(0).then((res) => setScrollComics(res));
  };
  const debouncedResults = useMemo(() => {
    return debouce(handleSetSearchString, 3000);
  }, []);

  const getComics = useCallback(async () => {
    setOffset(offset + 1);
    setLoading(true);
    searchString
      ? await comics
          .getSearchComics(offset, searchString)
          .then((res) => setScrollComics((prevState) => [...prevState, ...res]))
      : await comics
          .getComicsScroll(offset)
          .then((res) =>
            setScrollComics((prevState) => [...prevState, ...res])
          );
    setLoading(false);
  }, [setScrollComics, offset, searchString]);

  useEffect(() => {
    comics
      .getComicsScroll(0)
      .then((res) => setScrollComics(res))
      .catch((error: { message: string }) => setError(error.message));
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <Root>
      {!!scrollComics.length ? (
        <>
          <Title>
            {t("comics")}
            <NumberComics>({scrollComics.length})</NumberComics>
          </Title>
          <SearchItem>
            <SearchInput
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
              data={scrollComics}
              endReached={getComics}
              overscan={200}
              itemContent={(index, comic) => {
                return <Card key={index} card={comic} />;
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

export default observer(Comics);

const Root = styled.div``;
const Title = styled.h1`
  padding-left: 20px;
  ${({ theme }) => theme.typography.titleL};
  color: ${({ theme }) => theme.colors.black};
`;
const NumberComics = styled.span`
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
