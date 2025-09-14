export const rewardsAbi = [
  { type: 'function', name: 'questManager', stateMutability: 'view', inputs: [], outputs: [{ type: 'address' }] },
  { type: 'function', name: 'setQuestManager', stateMutability: 'nonpayable', inputs: [{ name: '_questManager', type: 'address' }], outputs: [] },
  { type: 'function', name: 'mintAchievementBadge', stateMutability: 'nonpayable', inputs: [{ name: 'player', type: 'address' }], outputs: [] },
  { type: 'event', name: 'BadgeMinted', inputs: [
    { indexed: true, name: 'to', type: 'address' },
    { indexed: true, name: 'tokenId', type: 'uint256' }], anonymous: false },
] as const;

