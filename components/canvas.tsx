import React, { useState } from "react";
import { useRef } from "react";

const unit = 64;

const canvasSize = { width: unit * 10, height: unit * 6 };

function Canvas() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const layer2 = useRef<HTMLCanvasElement>(null);

  const [gridVisible, setGridVisible] = useState(true);
  const [index, setIndex] = useState(0);

  const [qty, setQty] = useState(1);

  console.log("render main");

  const drawSquare = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ) => {
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.strokeRect(fromX, fromY, toX, toY);
  };

  //state
  let position = [0, 0];
  let directionForward = [true, true];

  const dvdScreenSaver = (ctx: CanvasRenderingContext2D, qty: number) =>
    Array(qty)
      .fill("e")
      .forEach((e) => {
        if (directionForward[1] && position[1] > canvasSize.height - unit) {
          directionForward[1] = false;
        }
        if (directionForward[0] && position[0] > canvasSize.width - unit) {
          directionForward[0] = false;
        }
        if (!directionForward[1] && position[1] < 0) {
          directionForward[1] = true;
        }
        if (!directionForward[0] && position[0] < 0) {
          directionForward[0] = true;
        }

        drawSquare(ctx, position[0], position[1], unit, unit);
        if (directionForward[1]) {
          position[1] = position[1] + 4;
        }
        if (directionForward[0]) {
          position[0] = position[0] + 4;
        }

        if (!directionForward[1]) {
          position[1] = position[1] - 4;
        }
        if (!directionForward[0]) {
          position[0] = position[0] - 4;
        }
      });

  const menu = (ctx: CanvasRenderingContext2D) => {
    drawSquare(
      ctx,
      0,
      canvasSize.height / 2,
      canvasSize.width,
      canvasSize.height
    );

    const divider = 5;

    for (let i = 0; i <= divider; i++) {
      drawSquare(
        ctx,
        (canvasSize.width / divider) * i + unit / 4,
        canvasSize.height / 2 + unit / 4,

        canvasSize.width / divider - unit / 2,
        canvasSize.height - canvasSize.height / 2 - unit / 2
      );
    }
  };

  const grid = () => {
    const ctx = layer2.current?.getContext("2d");

    if (!ctx) return;

    ctx.strokeStyle = "rgba(182, 167, 23, 0.8)";
    // ctx.beginPath();

    const cell = 1 * unit;

    for (let i = 0; i <= canvasSize.width / cell; i++) {
      ctx.moveTo(i * cell, 0);
      ctx.lineTo(i * cell, canvasSize.height);
    }

    for (let i = 0; i <= canvasSize.height / cell; i++) {
      ctx.moveTo(0, i * cell);
      ctx.lineTo(canvasSize.width, i * cell);
    }

    ctx.stroke();
  };

  const run = () => {
    console.log("run");
    console.log(Math.floor(Math.random() * 100));

    // if (!canvas.current) return;
    const context = canvas.current?.getContext("2d");

    if (!context) return;

    dvdScreenSaver(context, +qty);
    menu(context);

    //layer2
    grid();

    context?.stroke();
  };

  return (
    <div className="flex flex-col">
      <div> {index}</div>
      <div>{qty}</div>
      <input
        className=""
        value={qty}
        onChange={(e) => setQty(+e.target.value)}
        min={1}
        max={400}
        type="number"
      ></input>
      <button
        className="m-2 border-2  bg-green-700 border-green-700 hover:border-white  font-semibold text-black hover:text-white"
        onClick={() => run()}
      >
        {" "}
        RUN
      </button>
      <button
        className="m-2 border-2  bg-green-700 border-green-700 hover:border-white  font-semibold text-black hover:text-white"
        onClick={() => setGridVisible(!gridVisible)}
      >
        {" "}
        GRID
      </button>
      canvas
      <div
        style={{ height: `${canvasSize.height}px` }}
        className="relative flex  w-52 flex-col items-center bg-violet-500 "
      >
        <canvas
          onMouseEnter={() => console.log("over")}
          ref={canvas}
          height={canvasSize.height}
          width={canvasSize.width}
          className="absolute    bg-blue-600"
        />
        <canvas
          // onMouseEnter={() => console.log("over")}
          ref={layer2}
          height={canvasSize.height}
          width={canvasSize.width}
          className={`absolute  ${gridVisible ? "" : "hidden"}`}
        />
      </div>
      <div className="after:bg-slate-500">dasd</div>
    </div>
  );
}

export default Canvas;
