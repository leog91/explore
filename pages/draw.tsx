import React, { useState } from "react";
import Canvas from "../components/canvas";
import Container from "../components/container";

function Draw() {
  const [info, setInfo] = useState("start");
  return (
    <Container>
      Draw
      <div className="max-w-lg w-full text-center h-10 bg-red-500 text-lg font-semibold text-yellow-200 ">
        {info}
      </div>
      <Canvas setInfo={setInfo} />
    </Container>
  );
}

export default Draw;
