'use client'

interface ProgressBarProps {
  current: number
  total: number
  showPercentage?: boolean
  color?: 'bitcoin' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

export default function ProgressBar({
  current,
  total,
  showPercentage = true,
  color = 'primary',
  size = 'md',
  label
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  const getColorClasses = () => {
    switch (color) {
      case 'bitcoin':
        return 'bg-bitcoin'
      case 'primary':
        return 'bg-primary'
      case 'secondary':
        return 'bg-secondary'
      default:
        return 'bg-primary'
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2'
      case 'md':
        return 'h-3'
      case 'lg':
        return 'h-4'
      default:
        return 'h-3'
    }
  }

  return (
    <div className="w-full">
      {/* Label and percentage */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-600">{percentage}%</span>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className={`w-full bg-gray-200 rounded-full ${getSizeClasses()}`}>
        <div 
          className={`${getSizeClasses()} ${getColorClasses()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Current/Total indicator */}
      {!showPercentage && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{current} of {total}</span>
        </div>
      )}
    </div>
  )
}
