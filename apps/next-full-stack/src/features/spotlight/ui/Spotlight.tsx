'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@monorepo-starter/ui/components/command';
import { InfoIcon, MoonIcon, Sidebar, SunIcon } from 'lucide-react';
import { useSpotlight } from '~/features/spotlight/model/useSpotlight';

export function Spotlight() {
  const {
    theme,
    openCommandDialog,
    setOpenCommandDialog,
    search,
    setSearch,
    filteredRoutes,
    handleGoToPage,
    handleToggleSidebar,
    handleToggleTheme,
    handleViewComponentInfo,
  } = useSpotlight();

  return (
    <>
      <CommandDialog open={openCommandDialog} onOpenChange={setOpenCommandDialog}>
        <CommandInput placeholder="Type a command or search..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>
            <p className="text-muted-foreground font-semibold">No results found.</p>
          </CommandEmpty>
          <CommandGroup heading="Files">
            {filteredRoutes
              .filter((_, index) => index <= 10)
              .map((route) => (
                <CommandItem key={route.path} value={route.path} onSelect={() => handleGoToPage(route.path)}>
                  <span className="font-mono">{route.name}</span>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Settings">
            <CommandItem onSelect={handleToggleSidebar}>
              <Sidebar />
              <span>Toggle sidebar</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleToggleTheme}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              <span>Toggle theme</span>
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={handleViewComponentInfo}>
              <InfoIcon />
              <span>View Component info Current Path</span>
              <CommandShortcut>⌘I</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
