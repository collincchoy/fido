import React from "react";
import styled from "styled-components";
import { simpleLevelPlan } from "reactified/src/levels";
import Tile from "reactified/src/components/Tile";
import { LEVEL_SIZE } from "reactified/src/constants";

const Level = styled.table`
  position: relative;
  background: rgb(52, 166, 251);
  width: ${LEVEL_SIZE};
  height: ${LEVEL_SIZE};
`;

const Row = styled.tr`
  display: flex;
  justify-content: center;
  width: 100%;
`;

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
