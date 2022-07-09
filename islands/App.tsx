/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import CellularAutomaton from "./CellularAutomaton.tsx";

type AppProps = {};

export default function App({}: AppProps) {
  return (
    <Fragment>
      <div
        class={tw`z-0 absolute top-0 left-0 w-screen h-screen bg-gradient-to-t from-secondary via-primary to-primary`}
      />

      <div class={tw`z-10 absolute top-0 left-0 w-screen h-screen`}>
        <div
          class={tw`mx-auto max-w-screen-md flex flex-col justify-between h-screen`}
        >
          <div class={tw`h-1`}></div>
          <img src="/totemiq/ruinas_circulares_baja.jpg" />
        </div>
      </div>
    </Fragment>
  );
}
