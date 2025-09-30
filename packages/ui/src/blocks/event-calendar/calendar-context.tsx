'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import type { EventColor } from './types';

export const etiquettes = [
  {
    id: 'my-events',
    name: 'My Events',
    color: 'emerald' as EventColor,
    isActive: true,
  },
  {
    id: 'marketing-team',
    name: 'Marketing Team',
    color: 'orange' as EventColor,
    isActive: true,
  },
  {
    id: 'interviews',
    name: 'Interviews',
    color: 'violet' as EventColor,
    isActive: true,
  },
  {
    id: 'events-planning',
    name: 'Events Planning',
    color: 'blue' as EventColor,
    isActive: true,
  },
  {
    id: 'holidays',
    name: 'Holidays',
    color: 'rose' as EventColor,
    isActive: true,
  },
];

interface CalendarContextType {
  // Date management
  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  // Etiquette visibility management
  visibleColors: string[];
  toggleColorVisibility: (color: string) => void;
  isColorVisible: (color: string | undefined) => boolean;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
}

interface CalendarProviderProps {
  children: ReactNode;
}

export function CalendarProvider({ children }: CalendarProviderProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Initialize visibleColors based on the isActive property in etiquettes
  const [visibleColors, setVisibleColors] = useState<string[]>(() => {
    // Filter etiquettes to get only those that are active
    return etiquettes.filter((etiquette) => etiquette.isActive).map((etiquette) => etiquette.color);
  });

  // Toggle visibility of a color
  const toggleColorVisibility = (color: string) => {
    setVisibleColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  // Check if a color is visible
  const isColorVisible = (color: string | undefined) => {
    if (!color) return true; // Events without a color are always visible
    return visibleColors.includes(color);
  };

  const value = {
    currentDate,
    setCurrentDate,
    visibleColors,
    toggleColorVisibility,
    isColorVisible,
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}
