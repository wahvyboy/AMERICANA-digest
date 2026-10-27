import { useState, useEffect } from 'react';

/**
 * Calculates dynamic relative elapsed time from a given date/timestamp.
 * Examples: "Just now", "14m ago", "2h ago", "Yesterday", "3d ago", "Oct 21, 2026"
 */
export function formatTimeAgo(dateInput: string | Date | number): string {
  if (!dateInput) return 'Recently';
  
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' 
    ? new Date(dateInput) 
    : dateInput;
    
  const timestamp = date.getTime();
  if (isNaN(timestamp)) return 'Recently';

  const now = Date.now();
  const diffInSeconds = Math.max(0, Math.floor((now - timestamp) / 1000));

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  if (days === 1) {
    return 'Yesterday';
  }
  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Formats a timestamp into a full date and time string.
 * Example: "Oct 27, 2026, 3:30 PM"
 */
export function formatFullDateTime(dateInput: string | Date | number): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' 
    ? new Date(dateInput) 
    : dateInput;
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

/**
 * Formats a timestamp into standard date only.
 * Example: "October 27, 2026"
 */
export function formatExactDate(dateInput: string | Date | number): string {
  if (!dateInput) return '';
  const date = typeof dateInput === 'string' || typeof dateInput === 'number' 
    ? new Date(dateInput) 
    : dateInput;
  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * React hook that returns dynamic timeAgo and updates automatically every intervalMs
 */
export function useRelativeTime(dateInput: string | Date | number, intervalMs = 60000): string {
  const [relativeTime, setRelativeTime] = useState<string>(() => formatTimeAgo(dateInput));

  useEffect(() => {
    setRelativeTime(formatTimeAgo(dateInput));
    const timer = setInterval(() => {
      setRelativeTime(formatTimeAgo(dateInput));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [dateInput, intervalMs]);

  return relativeTime;
}
