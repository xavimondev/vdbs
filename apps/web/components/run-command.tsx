"use client";
import { useEffect, useState } from "react";
import { Check, Terminal } from "lucide-react";
import { CodeCommand } from "@/components/code-command";
import { copyToClipboard } from "@/utils";
import { useSchemaStore } from "@/store";

export function RunCommand() {
  const [isCopied, setIsCopied] = useState(false);
  const schema = useSchemaStore((state) => state.schema);
  const { cmdCode } = schema ?? {};
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
        if (cmdCode && cmdCode !== "") {
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
        {cmdCode && cmdCode !== "" && (
          <>
            npx vdbs add <CodeCommand commandCode={cmdCode} />
          </>
        )}
      </div>
      <span className="sr-only">Copy cli command</span>
    </button>
  );
}
