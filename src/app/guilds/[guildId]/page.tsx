
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Hex } from 'viem';
import { zeroAddress } from 'viem';
import { usePublicClient, useReadContract } from 'wagmi';
import { quest, vault } from '@/lib/contracts';
import { questManagerAbi } from '@/abis/QuestManager';
import { vaultAbi } from '@/abis/StablecoinVault';

type GuildTuple = readonly [id: Hex, members: readonly `0x${string}`[]];

export default function GuildPage() {
  const params = useParams();
  const raw = String(params.guildId ?? '');

  const guildId = useMemo<Hex | null>(() => {
    const v = raw.startsWith('0x') ? (raw as Hex) : (`0x${raw}` as Hex);
    return v.length === 66 ? v : null; // bytes32
  }, [raw]);

  const client = usePublicClient();
  const [activity, setActivity] = useState<string[]>([]);

  // 1) Read guild members via the public mapping accessor: guilds(bytes32) -> (bytes32,address[])
  const { data: guildData } = useReadContract({
    address: quest().address,
    abi: questManagerAbi,
    functionName: 'guilds',
    args: guildId ? [guildId] : undefined,
    // wagmi v1 exposes TanStack options under "query"
    query: { enabled: !!guildId },
  });

  const members = useMemo(() => {
    if (!guildData) return [] as `0x${string}`[];
    const tuple = guildData as unknown as GuildTuple;
    return tuple[1] ?? [];
  }, [guildData]);

  // 2) Watch Vault events for this guild (GuildContributed, GuildFundsUnlocked)
  useEffect(() => {
    // Guard for both: client can be undefined until provider is ready.
    if (!client || !guildId) return;

    const unwatchContrib = client.watchContractEvent({
      address: vault().address,
      abi: vaultAbi,
      eventName: 'GuildContributed',
      args: { guildId }, // indexed filter
      onLogs: (logs) => {
        logs.forEach((l) => {
          const from = (l.args?.from as string) ?? zeroAddress;
          const amt = l.args?.amount?.toString?.() ?? '0';
          setActivity((a) => [`Contribution: ${from} +${amt}`, ...a]);
        });
      },
    });

    const unwatchUnlocked = client.watchContractEvent({
      address: vault().address,
      abi: vaultAbi,
      eventName: 'GuildFundsUnlocked',
      args: { guildId }, // indexed filter
      onLogs: (logs) => {
        logs.forEach((l) => {
          const per = l.args?.amountPerMember?.toString?.() ?? '0';
          setActivity((a) => [`Unlocked: ${per} per member`, ...a]);
        });
      },
    });

    return () => {
      unwatchContrib?.();
      unwatchUnlocked?.();
    };
  }, [client, guildId]);

  if (!guildId) return <div className="p-6 text-red-500">Invalid guild id</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Guild {guildId}</h1>

      <section>
        <h2 className="text-lg mb-2">Members</h2>
        <ul className="space-y-1">
          {members.map((m) => (
            <li key={m} className="text-sm">{m}</li>
          ))}
          {members.length === 0 && <li className="text-sm opacity-70">No members found yet.</li>}
        </ul>
      </section>

      <section>
        <h2 className="text-lg mb-2">Activity</h2>
        <ul className="space-y-1">
          {activity.map((l, i) => (
            <li key={i} className="text-sm">{l}</li>
          ))}
          {activity.length === 0 && <li className="text-sm opacity-70">Waiting for events…</li>}
        </ul>
      </section>
    </div>
  );
}


