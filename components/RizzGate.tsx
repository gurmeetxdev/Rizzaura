import RizzBar from "./RizzBar"

type RizzGateProps = {
  onEnter?: () => void
}

export default function RizzGate({ onEnter }: RizzGateProps) {
  return (
    <div className="fixed inset-0 z-[998] pointer-events-none flex items-center justify-center">
      <RizzBar onEnter={onEnter} />
    </div>
  )
}
