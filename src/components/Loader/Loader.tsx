import React, { FC } from "react";

import styled from "styled-components";

interface LoaderProps {
  error?: string;
  isScroll?: boolean;
}

const Loader: FC<LoaderProps> = ({ error, isScroll }) => {
  return <Root>{error || <Loading isScroll={isScroll} />}</Root>;
};

export default Loader;

const Root = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.typography.subtitleM};
`;
const Loading = styled.div<{ isScroll?: boolean }>`
  font-size: 40px;
  color: black;
  border: 16px solid ${({ theme }) => theme.colors.gray2};
  border-top: 16px solid ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  margin: auto;
  width: ${({ isScroll }) => (isScroll ? "50px" : "120px")};
  height: ${({ isScroll }) => (isScroll ? "50px" : "120px")};
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
