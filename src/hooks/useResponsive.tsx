import { useEffect, useState } from 'react';

const useResponsive = (breakPoints: number[]) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateIndex = () => {
      const width = window.innerWidth;
      const newIndex = breakPoints.findIndex((bp) => width <= bp);
      setIndex(newIndex === -1 ? breakPoints.length : newIndex);
    };
    updateIndex();
    window.addEventListener('resize', updateIndex);
    return () => window.removeEventListener('resize', updateIndex);
  }, [breakPoints]);
  return index;
};

export default useResponsive;
