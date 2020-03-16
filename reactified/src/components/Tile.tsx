import React from "react";
import styled, { keyframes } from "styled-components";
import { TILE_SIZE_PX } from "reactified/src/constants";
import Player from "./Player";

const StyledTile = styled.td`
  width: ${TILE_SIZE_PX}px;
  height: ${TILE_SIZE_PX}px;
  display: flex;
`;

const Wall = styled(StyledTile)`
  background-color: white;
`;

const Lava = styled(StyledTile)`
  background-color: rgb(255, 100, 100);
`;

const COIN_SIZE_PX = TILE_SIZE_PX * 0.6;

const CoinSpin = keyframes`
  0% {
    width: ${COIN_SIZE_PX}px;
  }
  50% {
    width: 4%;
  }
  100% {
    width: ${COIN_SIZE_PX}px;
  }
`;

const Coin = styled.div`
  width: ${COIN_SIZE_PX}px;
  height: ${COIN_SIZE_PX}px;
  background-color: rgb(241, 229, 89);
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  transition: width 0.1s linear;
  animation: ${CoinSpin} 1s linear 0s infinite;
`;

const Tile: React.FC<{ type: string; position: { x: number; y: number } }> = ({
  type,
  position
}) => {
  switch (type) {
    case "#":
      return <Wall />;
    case "+":
    case "=":
      return <Lava />;
    case "o":
      return (
        <StyledTile>
          <Coin />
        </StyledTile>
      );
    case "@":
      return (
        <StyledTile>
          <Player initialX={position.x} initialY={position.y} />
        </StyledTile>
      );
  }
  return <StyledTile>{type}</StyledTile>;
};

export default Tile;
