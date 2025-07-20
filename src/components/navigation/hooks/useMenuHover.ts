import { useState, useRef, useEffect } from 'react';

export const useMenuHover = () => {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (channelId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveChannel(channelId);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveChannel(null);
      setIsOpen(false);
    }, 150);
  };

  const handleContentMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    activeChannel,
    isOpen,
    handleMouseEnter,
    handleMouseLeave,
    handleContentMouseEnter,
  };
};
