
'use client';

import { useEffect, useCallback } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { formatUnits, type Hex, zeroAddress } from 'viem';
import { vault, quest, rewards } from '@/lib/contracts';
import { vaultAbi } from '@/abis/StablecoinVault';
import { questManagerAbi } from '@/abis/QuestManager';
import { rewardsAbi } from '@/abis/RewardsController';
import { useAppStore } from '@/store/useAppStore';

const DECIMALS = 18; // adjust if your stablecoin decimals differ

export default function ActivityWatcher() {
  const { address } = useAccount();
  const client = usePublicClient();
  const addActivity = useAppStore((s) => s.addActivity);

  // Helper to safely mount a watcher
  const mount = useCallback((fn: () => (() => void) | void) => {
    if (!client) return () => {};
    const unwatch = fn();
    return () => {
      try { (unwatch as unknown as (() => void))?.(); } catch {}
    };
  }, [client]);

  // Vault: Deposit
  useEffect(() => mount(() => client!.watchContractEvent({
    address: vault().address,
    abi: vaultAbi,
    eventName: 'Deposit',
    onLogs: (logs) => {
      logs.forEach((log) => {
        const user = (log.args?.user as `0x${string}`) ?? zeroAddress;
        const raw = (log.args?.amount as bigint) ?? BigInt(0);
        addActivity({
          kind: 'deposit',
          message: 'Deposit',
          user,
          value: formatUnits(raw, DECIMALS),
          txHash: log.transactionHash as Hex,
          at: Date.now(),
        });
      });
    },
  })), [client, addActivity, mount]);

  // Vault: Withdraw
  useEffect(() => mount(() => client!.watchContractEvent({
    address: vault().address,
    abi: vaultAbi,
    eventName: 'Withdraw',
    onLogs: (logs) => {
      logs.forEach((log) => {
        const user = (log.args?.user as `0x${string}`) ?? zeroAddress;
        const raw = (log.args?.amount as bigint) ?? BigInt(0);
        addActivity({
          kind: 'withdraw',
          message: 'Withdraw',
          user,
          value: formatUnits(raw, DECIMALS),
          txHash: log.transactionHash as Hex,
          at: Date.now(),
        });
      });
    },
  })), [client, addActivity, mount]);

  // Vault: GuildContributed
  useEffect(() => mount(() => client!.watchContractEvent({
    address: vault().address,
    abi: vaultAbi,
    eventName: 'GuildContributed',
    onLogs: (logs) => {
      logs.forEach((log) => {
        const from = (log.args?.from as `0x${string}`) ?? zeroAddress;
        const raw = (log.args?.amount as bigint) ?? BigInt(0);
        addActivity({
          kind: 'guildContributed',
          message: 'Guild contribution',
          user: from,
          guildId: log.args?.guildId as Hex,
          value: formatUnits(raw, DECIMALS),
          txHash: log.transactionHash as Hex,
          at: Date.now(),
        });
      });
    },
  })), [client, addActivity, mount]);

  // Vault: GuildFundsUnlocked
  useEffect(() => mount(() => client!.watchContractEvent({
    address: vault().address,
    abi: vaultAbi,
    eventName: 'GuildFundsUnlocked',
    onLogs: (logs) => {
      logs.forEach((log) => {
        addActivity({
          kind: 'guildUnlocked',
          message: 'Guild funds unlocked',
          guildId: log.args?.guildId as Hex,
          value: formatUnits((log.args?.amountPerMember as bigint) ?? BigInt(0), DECIMALS),
          txHash: log.transactionHash as Hex,
          at: Date.now(),
          data: { members: log.args?.members as string[] },
        });
      });
    },
  })), [client, addActivity, mount]);

  // Rewards: BadgeMinted
  useEffect(() => mount(() => client!.watchContractEvent({
    address: rewards().address,
    abi: rewardsAbi,
    eventName: 'BadgeMinted',
    onLogs: (logs) => {
      logs.forEach((log) => {
        addActivity({
          kind: 'badgeMinted',
          message: 'Achievement badge minted',
          to: log.args?.to as `0x${string}`,
          txHash: log.transactionHash as Hex,
          at: Date.now(),
          data: { tokenId: (log.args?.tokenId as bigint)?.toString() },
        });
      });
    },
  })), [client, addActivity, mount]);

  // Quest: GuildCreated
  useEffect(() => mount(() => client!.watchContractEvent({
    address: quest().address,
    abi: questManagerAbi,
    eventName: 'GuildCreated',
    onLogs: (logs) => {
      logs.forEach((log) => {
        const members = (log.args?.members as string[]) ?? [];
        if (address && !members.includes(address)) return;
        addActivity({
          kind: 'guildCreated',
          message: 'Guild created',
          guildId: log.args?.guildId as Hex,
          at: Date.now(),
          data: { members },
        });
      });
    },
    onError: (err) => console.error('GuildCreated watch error:', err),
  })), [client, addActivity, address, mount]);

  // Quest: QuestCompleted
  useEffect(() => mount(() => client!.watchContractEvent({
    address: quest().address,
    abi: questManagerAbi,
    eventName: 'QuestCompleted',
    onLogs: (logs) => {
      logs.forEach((log) => {
        addActivity({
          kind: 'questCompleted',
          message: 'Quest completed',
          user: log.args?.user as `0x${string}`,
          at: Date.now(),
          data: { questId: log.args?.questId as bigint },
        });
      });
    },
  })), [client, addActivity, mount]);

  return null;
}


