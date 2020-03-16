import React from "react";
import styled from "styled-components";
import { simpleLevelPlan } from "reactified/src/levels";
import Tile from "reactified/src/components/Tile";

const Level = styled.table`
  position: relative;
  background: rgb(52, 166, 251);
`;

const Row = styled.tr`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Game: React.FC<{ plan?: string }> = ({ plan = simpleLevelPlan }) => {
  const renderLevel = () => {
    const lines = plan.trim().split("\n");
    return (
      <tbody>
        {lines.map((line: string, lineNo) => (
          <Row key={lineNo}>
            {line.split("").map((character, colNo) => (
              <Tile
                key={colNo}
                type={character}
                position={{ x: colNo, y: lineNo }}
              />
            ))}
          </Row>
        ))}
      </tbody>
    );
  };
  return <Level>{renderLevel()}</Level>;
};

export default Game;
