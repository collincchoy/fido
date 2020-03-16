import React from "react";
import styled from "styled-components";
import { simpleLevelPlan } from "reactified/src/levels.js";

const Level = styled.div`
  background: rgb(52, 166, 251);
  width: 500px;
  height: 500px;
`;

const Game = () => {
  // const renderLevel = ({plan}) => {
  //   plan.
  // }
  return <Level>{simpleLevelPlan}</Level>;
};

export default Game;
