"use client"
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { ReactNode } from 'react'

export function Popover({ trigger, children }: { trigger: ReactNode; children: ReactNode }) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content sideOffset={8} className="rounded-lg border border-neutral-800 bg-neutral-900 shadow-md p-3 text-sm text-white z-50">
        {children}
        <PopoverPrimitive.Arrow className="fill-neutral-900" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  )
}


