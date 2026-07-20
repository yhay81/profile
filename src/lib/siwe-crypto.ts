import {
  createPublicClient,
  custom,
  getAddress,
  recoverMessageAddress,
  stringToHex,
} from "viem";
import { mainnet } from "viem/chains";

export { recoverMessageAddress, stringToHex };

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

/**
 * Resolve a primary ENS name through the wallet's existing mainnet provider.
 * A reverse record alone is not enough: require the name to resolve forward
 * to the same address before presenting it as a verified identity label.
 */
export async function resolvePrimaryEnsName(
  provider: EthereumProvider,
  address: string,
): Promise<string | null> {
  const client = createPublicClient({
    chain: mainnet,
    transport: custom(provider),
  });
  const checksummedAddress = getAddress(address);
  const name = await client.getEnsName({ address: checksummedAddress });
  if (name === null) return null;

  const resolvedAddress = await client.getEnsAddress({ name });
  if (resolvedAddress === null) return null;
  return getAddress(resolvedAddress) === checksummedAddress ? name : null;
}
