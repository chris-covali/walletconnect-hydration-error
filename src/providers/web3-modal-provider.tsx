"use client"

import {defaultWagmiConfig} from '@web3modal/wagmi/react/config'

import {cookieStorage, createStorage, WagmiProvider} from 'wagmi'
import {mainnet, sepolia} from 'wagmi/chains'
import React, {ReactNode} from 'react'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createWeb3Modal} from "@web3modal/wagmi/react";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_PROJECT_ID env var in .env file. Get your projectId at https://cloud.walletconnect.com')
}

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmiConfig
const chains = [mainnet, sepolia] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

export function Web3ModalProvider({
  children,
}: {
  children: ReactNode
}) {
  return (
    <WagmiProvider config={config} reconnectOnMount={false}>

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
