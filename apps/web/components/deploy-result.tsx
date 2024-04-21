"use client";

import { ExternalLink } from "lucide-react";

type DeployResultProps = {
  supabaseLinkTables: string;
};

export function DeployResult({ supabaseLinkTables }: DeployResultProps) {
  return (
    <div className="size-full flex flex-col gap-2 w-full animate-fade-slide">
      <p className="text-muted-foreground text-sm">
        View the results by clicking on the link:
      </p>
      <div className="flex items-center gap-3">
        <button
          className="justify-center text-sm font-medium transition-colors hover:bg-white/90 dark:hover:bg-white/5 h-8 flex items-center 
      text-zinc-600
      dark:text-zinc-50 
      shadow-none 
      bg-white
      dark:bg-neutral-800 
      w-full 
      px-3 
      py-1.5 
      rounded-lg 
      border 
      border-zinc-700"
        >
          <div className="flex items-center flex-1 gap-2 ">
            <span className="text-xs sm:text-sm text-green-500 dark:text-green-200">
              {supabaseLinkTables}
            </span>
          </div>
        </button>
        <a href={supabaseLinkTables} target="_blank">
          <ExternalLink />
        </a>
      </div>
    </div>
  );
}
