// Keep the dynamically imported SIWE chunk limited to the two utilities used
// by the demo. Importing the viem root dynamically would retain every export.
export { recoverMessageAddress, stringToHex } from "viem";
