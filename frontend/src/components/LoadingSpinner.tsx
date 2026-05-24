export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-primary-200 dark:border-primary-900 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-4 border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0`}></div>
      </div>
    </div>
  );
}
