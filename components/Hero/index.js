import React from "react";
import { Wrapper } from "./styles";
export function Hero({ text, boldText }) {
  if (text === undefined) {
    text = "Hero Text";
    boldText = "Bold Text";
  }
  return (
    <Wrapper className="Container">
      <h1>
        {text} <br />
        <span className="bold">{boldText}</span>
      </h1>
    </Wrapper>
  );
}
