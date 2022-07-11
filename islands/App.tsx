/** @jsx h */
import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";

import CellularAutomaton from "../components/CellularAutomaton.tsx";

type AppProps = {};

const illustrations = [
  "/totemiq/ruinas_black.png",
  "/totemiq/ruinas_blue.png",
  "/totemiq/ruinas_rose.png",
  "/totemiq/ruinas_lila.png",
];

export default function App({}: AppProps) {
  const [isReady, setIsReady] = useState(false);

  const imageSource =
    illustrations[Math.floor(Math.random() * illustrations.length)];

  return (
    <div>
      {isReady ? (
        // <div
        //   class={tw`z-0 absolute top-0 left-0 w-screen h-screen bg-gradient-to-t from-secondary via-primary to-primary`}
        // />
        <div
          class={tw`z-0 absolute top-0 left-0 w-screen h-screen bg-gray-400`}
        />
      ) : (
        <div class={tw`z-20 absolute top-0 left-0 w-screen h-screen bg-black`}>
          <div class={tw`flex justify-center`}>
            <div class={tw`h-screen flex flex-col justify-center`}>
              <p class={tw`text-6xl text-white`}>Loading...</p>
            </div>
          </div>
        </div>
      )}
      <div class={tw`z-10 absolute top-0 left-0 w-screen h-screen`}>
        <div
          class={tw`mx-auto max-w-screen-md flex flex-col justify-between h-screen`}
        >
          <div class={tw`h-1`} />
          <img src={imageSource} class={tw`max-h-screen object-contain`} />
        </div>
      </div>
      <CellularAutomaton onReady={() => setIsReady(true)} />
    </div>
  );
}
