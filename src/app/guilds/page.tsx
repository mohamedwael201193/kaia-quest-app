
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount, usePublicClient } from 'wagmi';
import type { Hex } from 'viem';
import { quest } from '@/lib/contracts';
import { questManagerAbi } from '@/abis/QuestManager';

export default function GuildsPage() {
  const router = useRouter();
  const { address } = useAccount();
  const client = usePublicClient();

  const [lastGuildId, setLastGuildId] = useState<Hex | null>(null);

  // Navigate when we capture a GuildCreated event that includes this user (if connected)
  useEffect(() => {
    if (!client) return;

    const unwatch = client.watchContractEvent({
      address: quest().address,
      abi: questManagerAbi,
      eventName: 'GuildCreated',
      // No args filter because only guildId is indexed; we filter in onLogs below
      onLogs: (logs) => {
        for (const log of logs) {
          const guildId = log.args?.guildId as Hex | undefined;
          const members = (log.args?.members as `0x${string}`[] | undefined) ?? [];

          // If wallet is connected, only react to guilds that include me
          if (address && !members.includes(address)) continue;
          if (!guildId) continue;

          setLastGuildId(guildId);
          // Navigate to the guild detail page
          router.push(`/guilds/${guildId}`);
          break;
        }
      },
      onError: (err) => {
        // Avoid crashing build/runtime for benign provider errors
        console.error('watch GuildCreated error:', err);
      },
    });

    return () => {
      unwatch?.();
    };
  }, [client, address, router]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Guilds</h1>
      <p className="text-sm opacity-80">
        Create a guild or wait for an invite. When your guild is created, this page will redirect to its details.
      </p>
      {lastGuildId && (
        <div className="text-sm">
          Last created guild: <span className="font-mono">{lastGuildId}</span>
        </div>
      )}
      {/* TODO: your existing UI for Create Guild / Browse guilds stays here */}
    </div>
  );
}


