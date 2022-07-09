/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import CellularAutomaton from "../islands/CellularAutomaton.tsx";

export default function Home() {
  return (
    <Fragment>
      <div
        class={tw`z-0 absolute top-0 left-0 w-screen h-screen bg-gradient-to-t from-secondary via-primary to-primary`}
      ></div>

      <CellularAutomaton />

      <div class={tw`z-10 absolute top-0 left-0 w-screen h-screen`}>
        <div
          class={tw`mx-auto max-w-screen-md flex flex-col justify-between h-screen`}
        >
          <div class={tw`h-1`}></div>
          <img src="/totemiq/ruinas_circulares_baja.jpg" />
        </div>
      </div>

      <div class={tw`z-20 absolute top-0 left-0 w-screen h-screen`}>
        <div class={tw`flex m-6`}>
          <div class={tw` bg-white rounded-lg`}>
            <p class={tw`my-3 mx-4 text-3xl`}>Ruinas Circulares</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
