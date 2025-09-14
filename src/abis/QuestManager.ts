export const questManagerAbi = [
  { type: 'function', name: 'createQuest', stateMutability: 'nonpayable', inputs: [
    { name: 'title', type: 'string' }, { name: 'goal', type: 'uint256' }, { name: 'isGuildQuest', type: 'bool' }], outputs: [] },
  { type: 'function', name: 'createGuild', stateMutability: 'nonpayable', inputs: [{ name: 'members', type: 'address[]' }], outputs: [] },
  { type: 'function', name: 'getQuest', stateMutability: 'view', inputs: [{ name: 'questId', type: 'uint256' }], outputs: [{
    components: [
      { name: 'id', type: 'uint256' }, { name: 'title', type: 'string' },
      { name: 'goal', type: 'uint256' }, { name: 'isGuildQuest', type: 'bool' }
    ], type: 'tuple' }] },
  { type: 'function', name: 'completeQuest', stateMutability: 'nonpayable', inputs: [{ name: 'questId', type: 'uint256' }], outputs: [] },
  { type: 'event', name: 'GuildCreated', inputs: [
    { indexed: true, name: 'guildId', type: 'bytes32' }, { indexed: false, name: 'members', type: 'address[]' }], anonymous: false },
  { type: 'event', name: 'QuestCompleted', inputs: [
    { indexed: true, name: 'user', type: 'address' }, { indexed: false, name: 'questId', type: 'uint256' }], anonymous: false },
] as const;

