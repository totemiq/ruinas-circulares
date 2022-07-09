/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import App from "../islands/App.tsx";
import CellularAutomaton from "../islands/CellularAutomaton.tsx";

export default function Home() {
  return (
    <Fragment>
      <App />
      <CellularAutomaton cellSize={50} />
      <div class={tw`z-20 absolute top-0 left-0 w-screen h-screen`}>
        <div class={tw`flex m-6`}>
          <div class={tw` bg-white rounded-lg`}>
            <p class={tw`my-3 mx-4 text-2xl`}>Ruinas Circulares</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
