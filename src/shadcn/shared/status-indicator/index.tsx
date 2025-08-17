import { cn } from '@/shadcn/lib/utils';

interface StatusIndicatorProps {
  status: 'active' | 'inactive';
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        status === 'active'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      )}
    >
      {status === 'active' ? 'Active' : 'Inactive'}
    </div>
  );
}
