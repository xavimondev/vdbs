"use client";
import { useEffect, useState } from "react";
import { Check, Terminal } from "lucide-react";
import { CodeCommand } from "@/components/code-command";
import { copyToClipboard } from "@/utils";

type RunCommandProps = {
  commandCode: string | undefined;
  hasEffect?: boolean;
};

export function RunCommand({ commandCode }: RunCommandProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isCopied]);

  return (
    <button
      className="shrink-0 
      justify-center 
      text-sm 
      font-medium 
      transition-colors 
      hover:bg-white/90 
      dark:hover:bg-white/5 
      h-8 
      flex 
      items-center 
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
      onClick={async () => {
        if (commandCode) {
          setIsCopied(!isCopied);
          await copyToClipboard("npx vdbs add");
        }
      }}
    >
      <div className="flex items-center flex-1 gap-2 font-mono text-xs sm:text-sm">
        {isCopied ? (
          <Check className="w-4 h-4" />
        ) : (
          <Terminal className="w-4 h-4" />
        )}
        npx vdbs add <CodeCommand commandCode={"now0pp"} />
      </div>
      <span className="sr-only">Copy cli command</span>
    </button>
  );
}
