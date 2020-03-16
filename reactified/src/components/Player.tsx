import React from "react";
import styled from "styled-components";
import { TILE_SIZE_PX } from "reactified/src/constants";

const PLAYER_SIZE = {
  width: TILE_SIZE_PX * 0.8,
  height: TILE_SIZE_PX * 1.5
};

function calculatePosition(x: number, y: number) {
  return {
    left: `${x * TILE_SIZE_PX}px`,
    top: `${y * TILE_SIZE_PX - PLAYER_SIZE.height + TILE_SIZE_PX}px`
  };
}

const StyledPlayer = styled.div<{ left: string; top: string }>`
  position: absolute;
  left: ${props => props.left};
  top: ${props => props.top};
  background-color: rgb(64, 64, 64);
  width: ${PLAYER_SIZE.width}px;
  height: ${PLAYER_SIZE.height}px;
`;

const Player: React.FC<{ initialX: number; initialY: number }> = ({
  initialX,
  initialY
}) => {
  return <StyledPlayer {...calculatePosition(initialX, initialY)} />;
};

export default Player;
