"use client";

import {useWeb3Modal} from "@web3modal/wagmi/react";
import {useAccount} from "wagmi";

const date = new Date();

export default function Home() {
  const {open} = useWeb3Modal()
  const {address} = useAccount()

  return (
    <div className="flex flex-col gap-4 p-4 max-w-xl">
      <h1>Home</h1>
      <button className="border px-4 py-2" onClick={() => open()}>{address ? 'Disconnect' : 'Connect'}</button>
      {address && <p>Connected with address: {address}</p>}
      {/* Hydration error cause web3 modal to stop working, comment this line, to make web3 modal work */}
      Date: {date.toISOString()}
    </div>
  )
}
