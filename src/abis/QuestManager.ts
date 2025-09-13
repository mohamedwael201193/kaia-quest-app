export const questManagerAbi = [
  {
    inputs: [{ name: 'members', type: 'address[]' }],
    name: 'createGuild',
    outputs: [{ name: 'guildId', type: 'bytes32' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'guildId', type: 'bytes32' },
      { name: 'token', type: 'address' },
      { name: 'goal', type: 'uint256' },
      { name: 'receiver', type: 'address' },
    ],
    name: 'startGuildQuest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'guildId', type: 'bytes32' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'contribute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'guildId', type: 'bytes32' },
      { name: 'badgeId', type: 'uint256' },
    ],
    name: 'completeGuildQuest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'guildId', type: 'bytes32' }],
    name: 'getGuildInfo',
    outputs: [
      {
        components: [
          { name: 'members', type: 'address[]' },
          { name: 'token', type: 'address' },
          { name: 'goal', type: 'uint256' },
          { name: 'raised', type: 'uint256' },
          { name: 'receiver', type: 'address' },
          { name: 'isActive', type: 'bool' },
        ],
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'guildId', type: 'bytes32' },
      { indexed: false, name: 'members', type: 'address[]' },
    ],
    name: 'GuildCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'guildId', type: 'bytes32' },
      { indexed: true, name: 'token', type: 'address' },
      { indexed: false, name: 'goal', type: 'uint256' },
      { indexed: true, name: 'receiver', type: 'address' },
    ],
    name: 'QuestStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'guildId', type: 'bytes32' },
      { indexed: true, name: 'contributor', type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ],
    name: 'Contribution',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'guildId', type: 'bytes32' },
      { indexed: false, name: 'badgeId', type: 'uint256' },
    ],
    name: 'QuestCompleted',
    type: 'event',
  },
] as const

