import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export default function Logo({ className = '', width = 200, height = 200 }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/logo.png"
        alt="Future Youth CLT Logo"
        width={width}
        height={height}
        priority
        className="object-contain"
      />
    </div>
  )
}

