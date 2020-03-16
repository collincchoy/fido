import React from "react";
import styled from "styled-components";
import { TILE_SIZE_PX } from "reactified/src/constants";

const PLAYER_SIZE = {
  width: TILE_SIZE_PX * 0.8,
  height: TILE_SIZE_PX * 1.5
};

console.log(TILE_SIZE_PX);
console.dir(PLAYER_SIZE);

const StyledPlayer = styled.div`
  position: absolute;
  left: 0px;
  background-color: rgb(64, 64, 64);
  width: ${PLAYER_SIZE.width}px;
  height: ${PLAYER_SIZE.height}px;
`;

const Player = () => {
  return <StyledPlayer />;
};

export default Player;
