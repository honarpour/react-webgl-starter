import React from 'react';
import styled from 'styled-components';

const NoSupport = () => (
  <Wrapper>
    <Text>Your browser does not support WebGL!</Text>
  </Wrapper>
);

const Wrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
`;

export default NoSupport;
