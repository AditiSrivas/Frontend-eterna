import { TokenDetail } from '@/components/token/TokenDetail'

export default function TokenPage({ params }: { params: { id: string } }) {
  return <TokenDetail tokenId={params.id} />
}

