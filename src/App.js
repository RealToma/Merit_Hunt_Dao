import React from "react";
import styled from "styled-components";
import { Box } from '@material-ui/core';
import Sidebar from "./layouts/sidebar/sidebar";
import Staking from "./layouts/staking/staking";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function App() {
  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        <StyledComponent>
          <Sidebar/>
          <Staking />
        </StyledComponent>
      </Web3ReactProvider>
    </>
  );
}

const StyledComponent = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
`
export default App;
