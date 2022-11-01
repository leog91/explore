import React, { useState, useEffect, useCallback } from "react";
import Container from "../components/container";

function Aim() {
  const [hits, setHits] = useState(0);
  const [target, setTarget] = useState({ x: 0, y: 0 });

  const [cooldown, setCooldown] = useState(false);

  const [temp, setTemp] = useState(1);
  const [auto, setAuto] = useState(true);
  const [speed, setSpeed] = useState(1);

  const [difficulty, setDifficulty] = useState(3);

  const refreshTarget = useCallback(() => {
    const offset =
      difficulty === 1
        ? 112
        : difficulty === 2
        ? 80
        : difficulty === 3
        ? 48
        : difficulty === 4
        ? 24
        : 16;

    setCooldown(true);
    const timer = setTimeout(
      () => {
        setCooldown(false);
      },
      speed === 1 ? 1000 : speed === 2 ? 500 : 250
    );

    setTarget({
      x:
        offset / 2 +
        Math.floor(Math.random() * (window.innerWidth - offset * 2)),
      y:
        offset / 2 +
        Math.floor(Math.random() * (window.innerHeight - offset * 2)),
    });

    return () => {
      clearTimeout(timer);
    };
  }, [difficulty, speed]);

  useEffect(() => {
    console.log("effect");

    if (auto) {
      const time = setTimeout(
        () => {
          setTemp(temp + 1);
          if (!cooldown) refreshTarget();
        },

        speed === 1 ? 2000 : speed === 2 ? 1000 : 500
      );

      return () => {
        clearTimeout(time);
      };
    }
  }, [temp, auto, refreshTarget, speed, cooldown]);

  useEffect(() => {
    refreshTarget();
  }, [hits, difficulty, refreshTarget]);

  return (
    <div>
      <div className="flex justify-center items-center bg-black absolute w-full">
        <div>SIZE</div>
        <button
          onClick={() => setDifficulty(1)}
          className="w-2 h-2 m-0.5 bg-green-500"
        />

        <button
          onClick={() => setDifficulty(2)}
          className={`w-2 m-0.5 h-2 ${
            difficulty >= 2 ? "bg-green-500" : "bg-red-600"
          }`}
        />

        <button
          onClick={() => setDifficulty(3)}
          className={`w-2 m-0.5 h-2 ${
            difficulty >= 3 ? "bg-green-500" : "bg-red-600"
          }`}
        />
        <button
          onClick={() => setDifficulty(4)}
          className={`w-2 m-0.5 h-2 ${
            difficulty >= 4 ? "bg-green-500" : "bg-red-600"
          }`}
        />
        <button
          onClick={() => setDifficulty(5)}
          className={`w-2 m-0.5 h-2 ${
            difficulty >= 5 ? "bg-green-500" : "bg-red-600"
          }`}
        />
        <button onClick={() => setAuto(!auto)} className=" m-1 px-1 border-2">
          auto <span className="text-pink-500">{auto ? "ON" : "OFF"} </span>
        </button>
        <div>SPEED </div>
        <button
          onClick={() => setSpeed(1)}
          className="w-2 h-2 m-0.5 bg-green-500"
        ></button>
        <button
          onClick={() => setSpeed(2)}
          className={`w-2 m-0.5 h-2 ${
            speed >= 2 ? "bg-green-500" : "bg-red-600"
          }`}
        ></button>
        <button
          onClick={() => setSpeed(3)}
          className={`w-2 m-0.5 h-2 ${
            speed >= 3 ? "bg-green-500" : "bg-red-600"
          }`}
        ></button>
        <div className="text-pink-500 font-bold text-lg p-2 underline  animate-pulse underline-offset-4 ">
          {JSON.stringify(hits)}
        </div>
      </div>
      <div>
        <button
          style={{
            transform: `translate(${target.x}px,${target.y}px)`,
          }}
          onClick={() => setHits(hits + 1)}
          className={` bg-red-500 absolute rounded-full flex justify-center items-center text-cyan-300 border-4 overflow-hidden  ${
            difficulty === 1
              ? "h-28 w-28"
              : difficulty === 2
              ? "h-20 w-20"
              : difficulty === 3
              ? "h-12 w-12"
              : difficulty === 4
              ? "h-6 w-6"
              : "h-4 w-4"
          } `}
        >
          <div className="w-4 h-4 rounded-full  bg-black" />
        </button>
      </div>
      <Container justify="justify-center"></Container>
    </div>
  );
}

export default Aim;
