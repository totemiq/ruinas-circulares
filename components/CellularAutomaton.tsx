/** @jsx h */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { IS_BROWSER } from "fresh/runtime.ts";
import { tw } from "@twind";
// import { useWindowSize } from "../lib/useWindowSize.ts";

interface CellularAutomatonProps {
  cellSize?: number;
  onReady?: () => void;
  liveCellColor?: string;
  deadCellColor?: string;
}

// type Board = ;

export default function CellularAutomaton({
  cellSize = 60,
  liveCellColor = "#ffffff",
  deadCellColor = "#000000",
  onReady,
}: CellularAutomatonProps) {
  const [state, setState] = useState(new Array<Array<number>>(0));

  const init = (ctx: CanvasRenderingContext2D) => {
    const XCells = Math.ceil(ctx.canvas.width / cellSize);
    const YCells = Math.ceil(ctx.canvas.height / cellSize);

    setState(new Array<Array<number>>(XCells));

    for (let x = 0; x < XCells; x++) {
      if (state[x] === undefined) {
        state[x] = new Array<number>(YCells);
      }

      for (let y = 0; y < YCells; y++) {
        state[x][y] = Math.random() > 0.5 ? 1 : 0;
      }
    }

    // setState(state);
  };

  const render = (ctx: CanvasRenderingContext2D) => {
    const XCells = Math.ceil(ctx.canvas.width / cellSize);
    const YCells = Math.ceil(ctx.canvas.height / cellSize);

    // console.log("render");
    // console.log(state);
    for (let x = 0; x < XCells; x++) {
      for (let y = 0; y < YCells; y++) {
        if (state[x][y] === 1) {
          ctx.fillStyle = liveCellColor;
        } else {
          ctx.fillStyle = deadCellColor;
        }

        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  };

  const countNeighbors = (x: number, y: number) => {
    const XCells = Math.floor(state.length);
    const YCells = Math.floor(state[0].length);

    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        let nx = x + i;
        let ny = y + j;

        if (nx < 0) {
          nx = XCells - 1;
        }
        if (nx >= XCells) {
          nx = 0;
        }
        if (ny < 0) {
          ny = YCells - 1;
        }
        if (ny >= YCells) {
          ny = 0;
        }

        // if (nx < 0 || nx >= XCells || ny < 0 || ny >= YCells) {
        //   continue;
        // }
        // console.log(nx, ny);
        count += state[nx][ny];
      }
    }

    return count;
  };

  const step = (ctx: CanvasRenderingContext2D) => {
    const XCells = Math.floor(state.length);
    const YCells = Math.floor(state[0].length);

    const newState = new Array<Array<number>>(XCells);

    for (let x = 0; x < XCells; x++) {
      if (newState[x] === undefined) {
        newState[x] = new Array<number>(YCells);
      }

      for (let y = 0; y < YCells; y++) {
        newState[x][y] = state[x][y];

        const neighbors = countNeighbors(x, y);

        if (neighbors === 3 || neighbors === 7) {
          newState[x][y] = 1;
          continue;
        }

        if (neighbors < 2 || neighbors > 3) {
          newState[x][y] = 0;
        }
      }
    }

    for (let x = 0; x < XCells; x++) {
      for (let y = 0; y < YCells; y++) {
        state[x][y] = newState[x][y];
      }
    }
  };

  const getDrawContext = (): CanvasRenderingContext2D | null => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = canvas?.parentElement?.offsetWidth || 200;
    canvas.height = canvas?.parentElement?.offsetHeight || 200;

    return canvas.getContext("2d");
  };

  useEffect(() => {
    const ctx = getDrawContext();

    ctx && init(ctx);
    ctx && render(ctx);

    setTimeout(() => onReady && onReady(), 1000);

    const interval = setInterval(() => {
      //   console.log("step");
      ctx && step(ctx);
      ctx && render(ctx);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  //   useEffect(() => {
  //     if (size.width < 0 || size.height < 0) {
  //       return;
  //     }
  //     const ctx = getDrawContext();
  //     ctx && render(ctx);
  //   }, [size]);

  // mix-blend-difference
  // multiply
  return (
    <div
      class={tw`z-20 mix-blend-difference absolute top-0 left-0 w-screen h-screen`}
    >
      <canvas id="canvas"></canvas>
    </div>
  );
}
