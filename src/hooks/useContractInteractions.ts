import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { erc20Abi, vaultAbi } from '@/abis/index'
import { ADDRESSES } from '@/lib/contracts'
import { parseUnits } from 'viem'
import { useEffect } from 'react'

export function useTokenBalance(tokenAddress: `0x${string}`) {
  const { address } = useAccount()
  const { data: balance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address!],
    query: {
      enabled: !!address && !!tokenAddress,
    },
  })
  return balance
}

export function useTokenAllowance(tokenAddress: `0x${string}`, spenderAddress: `0x${string}`) {
  const { address } = useAccount()
  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: 'allowance',
    args: [address!, spenderAddress],
    query: {
      enabled: !!address && !!tokenAddress && !!spenderAddress,
    },
  })
  return allowance
}

export function useApprove(tokenAddress: `0x${string}`, spenderAddress: `0x${string}`, amount: bigint) {
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const approve = () => {
    writeContract({
      abi: erc20Abi,
      address: tokenAddress,
      functionName: 'approve',
      args: [spenderAddress, amount],
    })
  }

  return { approve, isConfirming, isConfirmed }
}

export function useDeposit(amount: string) {
  useAccount()
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const usdtAllowance = useTokenAllowance(ADDRESSES.USDT, ADDRESSES.VAULT)
  const parsedAmount = parseUnits(amount, 18) // Assuming 18 decimals for mUSDT

  const { approve, isConfirmed: isApproved } = useApprove(ADDRESSES.USDT, ADDRESSES.VAULT, parsedAmount)

  useEffect(() => {
    if (usdtAllowance !== undefined && usdtAllowance < parsedAmount && !isApproved) {
      approve()
    }
  }, [usdtAllowance, parsedAmount, approve, isApproved])

  const deposit = () => {
    if (usdtAllowance !== undefined && usdtAllowance >= parsedAmount) {
      writeContract({
        abi: vaultAbi,
        address: ADDRESSES.VAULT,
        functionName: 'deposit',
        args: [parsedAmount],
      })
    }
  }

  return { deposit, isConfirming, isApproved: usdtAllowance !== undefined && usdtAllowance >= parsedAmount || isApproved, isConfirmed }
}

export function useGuildContribute(guildId: `0x${string}`, amount: string) {
  useAccount()
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const usdtAllowance = useTokenAllowance(ADDRESSES.USDT, ADDRESSES.VAULT)
  const parsedAmount = parseUnits(amount, 18) // Assuming 18 decimals for mUSDT

  const { approve, isConfirmed: isApproved } = useApprove(ADDRESSES.USDT, ADDRESSES.VAULT, parsedAmount)

  useEffect(() => {
    if (usdtAllowance !== undefined && usdtAllowance < parsedAmount && !isApproved) {
      approve()
    }
  }, [usdtAllowance, parsedAmount, approve, isApproved])

  const contribute = () => {
    if (usdtAllowance !== undefined && usdtAllowance >= parsedAmount) {
      writeContract({
        abi: vaultAbi,
        address: ADDRESSES.VAULT,
        functionName: 'depositForGuild',
        args: [guildId, parsedAmount],
      })
    }
  }

  return { contribute, isConfirming, isApproved: usdtAllowance !== undefined && usdtAllowance >= parsedAmount || isApproved, isConfirmed }
}

export function useWithdraw(amount: string) {
  useAccount()
  const { writeContract, data: hash } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const parsedAmount = parseUnits(amount, 18) // Assuming 18 decimals for mUSDT

  const withdraw = () => {
    writeContract({
      abi: vaultAbi,
      address: ADDRESSES.VAULT,
      functionName: 'withdraw',
      args: [parsedAmount],
    })
  }

  return { withdraw, isConfirming, isConfirmed }
}


