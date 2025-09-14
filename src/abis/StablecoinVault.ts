export const vaultAbi = [
  { type: 'function', name: 'questManager', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
  { type: 'function', name: 'setQuestManager', stateMutability: 'nonpayable', inputs: [{ name: '_questManager', type: 'address' }], outputs: [] },
  { type: 'function', name: 'deposit', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [] },
  { type: 'function', name: 'depositForGuild', stateMutability: 'nonpayable', inputs: [{ name: 'guildId', type: 'bytes32' }, { name: 'amount', type: 'uint256' }], outputs: [] },
  { type: 'function', name: 'withdraw', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [] },
  { type: 'function', name: 'userBalances', stateMutability: 'view', inputs: [{ name: '', type: 'address' }], outputs: [{ type: 'uint256' }] },
  { type: 'function', name: 'guildBalances', stateMutability: 'view', inputs: [{ name: '', type: 'bytes32' }], outputs: [{ type: 'uint256' }] },
  { type: 'event', name: 'Deposit', inputs: [
    { indexed: true, name: 'user', type: 'address' },
    { indexed: true, name: 'token', type: 'address' },
    { indexed: false, name: 'amount', type: 'uint256' }], anonymous: false },
  { type: 'event', name: 'Withdraw', inputs: [
    { indexed: true, name: 'user', type: 'address' },
    { indexed: true, name: 'token', type: 'address' },
    { indexed: false, name: 'amount', type: 'uint256' }], anonymous: false },
  { type: 'event', name: 'GuildContributed', inputs: [
    { indexed: true, name: 'guildId', type: 'bytes32' },
    { indexed: true, name: 'from', type: 'address' },
    { indexed: false, name: 'amount', type: 'uint256' }], anonymous: false },
  { type: 'event', name: 'GuildFundsUnlocked', inputs: [
    { indexed: true, name: 'guildId', type: 'bytes32' },
    { indexed: false, name: 'members', type: 'address[]' },
    { indexed: false, name: 'amountPerMember', type: 'uint256' },
    { indexed: false, name: 'remainder', type: 'uint256' }], anonymous: false },
] as const;

