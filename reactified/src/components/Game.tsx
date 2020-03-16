import React from "react";
import styled from "styled-components";
import { simpleLevelPlan } from "reactified/src/levels";

const LEVEL_SIZE = "500px";

const Level = styled.table`
  background: rgb(52, 166, 251);
  width: ${LEVEL_SIZE};
  height: ${LEVEL_SIZE};
`;

const Row = styled.tr`
  display: flex;
  width: 100%;
`;

const StyledTile = styled.td`
  width: 20px;
  height: 20px;
`;

const Tile: React.FC<{ type: string }> = ({ type }) => {
  return <StyledTile>{type}</StyledTile>;
};

const Game: React.FC<{ plan?: string }> = ({ plan = simpleLevelPlan }) => {
  const renderLevel = () => {
    const lines = plan.split("\n");
    return (
      <tbody>
        {lines.map((line: string, lineNo) => (
          <Row key={lineNo}>
            {line.split("").map((character, colNo) => (
              <Tile key={colNo} type={character} />
            ))}
          </Row>
        ))}
      </tbody>
    );
  };
  return <Level>{renderLevel()}</Level>;
};

export default Game;
