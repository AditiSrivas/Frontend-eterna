"use client"
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

export function Modal({ trigger, title, children }: { trigger: ReactNode; title: string; children: ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl rounded-lg border border-neutral-800 bg-neutral-900 p-4 shadow-xl">
          <Dialog.Title className="text-base font-semibold mb-2 text-white">{title}</Dialog.Title>
          <div className="text-sm text-neutral-300">{children}</div>
          <Dialog.Close className="absolute right-3 top-3 text-neutral-400 hover:text-white">✕</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


