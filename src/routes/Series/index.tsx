import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import debouce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Virtuoso } from "react-virtuoso";
import styled from "styled-components";

import series from "../../api/series";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import { Card as CardType } from "../../types/card";

const Series: FC = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [scrollSeries, setScrollSeries] = useState<CardType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(1);
  const [error, setError] = useState<string>();
  const { t } = useTranslation();

  const handleSetSearchString = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchString(event.target.value);
    event.target.value
      ? series
          .getSearchSeries(0, event.target.value)
          .then((res) => setScrollSeries(res))
      : series.getSeriesScroll(0).then((res) => setScrollSeries(res));
  };
  const debouncedResults = useMemo(() => {
    return debouce(handleSetSearchString, 3000);
  }, []);

  const getseries = useCallback(async () => {
    setOffset(offset + 1);
    setLoading(true);
    searchString
      ? await series
          .getSearchSeries(offset, searchString)
          .then((res) => setScrollSeries((prevState) => [...prevState, ...res]))
      : await series
          .getSeriesScroll(offset)
          .then((res) =>
            setScrollSeries((prevState) => [...prevState, ...res])
          );
    setLoading(false);
  }, [setScrollSeries, offset, searchString]);

  useEffect(() => {
    series
      .getSeriesScroll(0)
      .then((res) => setScrollSeries(res))
      .catch((error: { message: string }) => setError(error.message));
  }, []);
  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <Root>
      {!!scrollSeries.length ? (
        <>
          <Title>
            {t("series")}
            <NumberSeries>({scrollSeries.length})</NumberSeries>
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
              data={scrollSeries}
              endReached={getseries}
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

export default observer(Series);

const Root = styled.div``;
const Title = styled.h1`
  padding-left: 20px;
  ${({ theme }) => theme.typography.titleL};
  color: ${({ theme }) => theme.colors.black};
`;
const NumberSeries = styled.span`
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
