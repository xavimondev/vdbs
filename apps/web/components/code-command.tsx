type CommandCodeProps = {
  commandCode: string
}

export function CodeCommand({ commandCode }: CommandCodeProps) {
  return <span className='font-semibold drop-shadow-sm'>{commandCode}</span>
}
