
'use client';

import { useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { formatUnits, type Hex, zeroAddress } from 'viem';
import { vault, quest, rewards } from '@/lib/contracts';
import { vaultAbi } from '@/abis/StablecoinVault';
import { questManagerAbi } from '@/abis/QuestManager';
import { rewardsAbi } from '@/abis/RewardsController';
import { useAppStore } from '@/store/useAppStore';

const DECIMALS = 18; // mUSDT

export default function ActivityWatcher() {
  const { address } = useAccount();
  const client = usePublicClient();
  const addActivity = useAppStore((s) => s.addActivity);

  // Vault: Deposit
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: vault().address,
      abi: vaultAbi,
      eventName: 'Deposit',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const user = (log.args?.user as `0x${string}`) ?? zeroAddress;
          const raw = log.args?.amount as bigint;
          addActivity({
            kind: 'deposit',
            message: `Deposit`,
            user,
            value: formatUnits(raw ?? 0n, DECIMALS),
            txHash: log.transactionHash as Hex,
            at: Date.now(),
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity]);

  // Vault: Withdraw
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: vault().address,
      abi: vaultAbi,
      eventName: 'Withdraw',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const user = (log.args?.user as `0x${string}`) ?? zeroAddress;
          const raw = log.args?.amount as bigint;
          addActivity({
            kind: 'withdraw',
            message: `Withdraw`,
            user,
            value: formatUnits(raw ?? 0n, DECIMALS),
            txHash: log.transactionHash as Hex,
            at: Date.now(),
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity]);

  // Vault: GuildContributed
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: vault().address,
      abi: vaultAbi,
      eventName: 'GuildContributed',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const from = (log.args?.from as `0x${string}`) ?? zeroAddress;
          const raw = log.args?.amount as bigint;
          addActivity({
            kind: 'guildContributed',
            message: `Guild contribution`,
            user: from,
            guildId: log.args?.guildId as Hex,
            value: formatUnits(raw ?? 0n, DECIMALS),
            txHash: log.transactionHash as Hex,
            at: Date.now(),
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity]);

  // Vault: GuildFundsUnlocked
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: vault().address,
      abi: vaultAbi,
      eventName: 'GuildFundsUnlocked',
      onLogs: (logs) => {
        logs.forEach((log) => {
          addActivity({
            kind: 'guildUnlocked',
            message: `Guild funds unlocked`,
            guildId: log.args?.guildId as Hex,
            value: formatUnits((log.args?.amountPerMember as bigint) ?? 0n, DECIMALS),
            txHash: log.transactionHash as Hex,
            at: Date.now(),
            data: { members: log.args?.members as string[] },
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity]);

  // Rewards: BadgeMinted
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: rewards().address,
      abi: rewardsAbi,
      eventName: 'BadgeMinted',
      onLogs: (logs) => {
        logs.forEach((log) => {
          addActivity({
            kind: 'badgeMinted',
            message: `Achievement badge minted`,
            to: log.args?.to as `0x${string}`,
            txHash: log.transactionHash as Hex,
            at: Date.now(),
            data: { tokenId: (log.args?.tokenId as bigint)?.toString() },
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity]);

  // Quest: GuildCreated
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: quest().address,
      abi: questManagerAbi,
      eventName: 'GuildCreated',
      onLogs: (logs) => {
        logs.forEach((log) => {
          const members = (log.args?.members as string[]) ?? [];
          // If connected, you can choose to only show if I'm in the guild:
          if (address && !members.includes(address)) return;
          addActivity({
            kind: 'guildCreated',
            message: `Guild created`,
            guildId: log.args?.guildId as Hex,
            at: Date.now(),
            data: { members },
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity, address]);

  // Quest: QuestCompleted
  useEffect(() => {
    if (!client) return;
    const unwatch = client.watchContractEvent({
      address: quest().address,
      abi: questManagerAbi,
      eventName: 'QuestCompleted',
      onLogs: (logs) => {
        logs.forEach((log) => {
          addActivity({
            kind: 'questCompleted',
            message: `Quest completed`,
            user: log.args?.user as `0x${string}`,
            at: Date.now(),
            data: { questId: log.args?.questId as bigint },
          });
        });
      },
    });
    return () => unwatch?.();
  }, [client, addActivity]);

  return null;
}


