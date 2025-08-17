import React from 'react';
import { Skeleton } from '@/shadcn/components/ui/skeleton';

interface SkeletonLoaderProps {
  count?: number; 
  height?: string; 
  width?: string; 
  className?: string; 
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 6,
  height = 'h-[125px]',
  width = 'w-[250px]',
  className = '',
}) => {
  return (
    <div className={`flex flex-wrap gap-6 p-10 items-center ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={`${height} ${width} rounded-xl bg-customGray`}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;
