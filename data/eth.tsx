import { providers } from "ethers";

function getProvider(): providers.Provider {
  const provider = new providers.InfuraProvider(
    "homestead",
    process.env.INFURA_KEY
  );
  return provider;
}

export async function nameOrAddress(address: string): Promise<string> {
  const provider = getProvider();
  return (await provider.lookupAddress(address)) ?? address.substring(0, 7);
}

export async function batchNameOrAddress(
  addresses: string[]
): Promise<string[]> {
  return Promise.all(addresses.map((a) => nameOrAddress(a)));
}
