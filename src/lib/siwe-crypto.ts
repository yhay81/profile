import {
  createClient,
  custom,
  defineChain,
  getAddress,
  recoverMessageAddress,
  stringToHex,
} from "viem";

export { recoverMessageAddress, stringToHex };

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

const ethereumMainnet = defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: [] } },
  contracts: {
    ensUniversalResolver: {
      address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
      blockCreated: 23_085_558,
    },
  },
});

/**
 * Resolve a primary ENS name through the wallet's existing mainnet provider.
 * A reverse record alone is not enough: require the name to resolve forward
 * to the same address before presenting it as a verified identity label.
 */
export async function resolvePrimaryEnsName(
  provider: EthereumProvider,
  address: string,
): Promise<string | null> {
  const { getEnsAddress, getEnsName } = await import("viem/ens");
  const client = createClient({
    chain: ethereumMainnet,
    transport: custom(provider),
  });
  const checksummedAddress = getAddress(address);
  const name = await getEnsName(client, { address: checksummedAddress });
  if (name === null) return null;

  const resolvedAddress = await getEnsAddress(client, { name });
  if (resolvedAddress === null) return null;
  return getAddress(resolvedAddress) === checksummedAddress ? name : null;
}
