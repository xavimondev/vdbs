import { Clock, KeyRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { FormApiKey } from "@/components/form-api-key";

export function Header() {
  return (
    <header>
      <div className="flex flex-col sm:flex-row pb-4 sm:items-center sm:justify-between gap-2 sm:gap-0 w-full">
        <div className="hidden sm:flex items-center cursor-pointer text-green-500 dark:text-green-200">
          <AppLogo />
        </div>
        <div className="flex gap-2 w-full sm:max-w-[23rem]">
          <div className="h-9 px-4 py-2 w-full rounded-md focus:outline-none hidden sm:flex items-center justify-center gap-2 bg-card border hover:bg-zinc-400 dark:hover:bg-zinc-800 transition-colors duration-300 text-sm">
            <Clock size={18} className="text-green-300" />
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-green-700 to-green-300 dark:from-green-500 dark:to-green-100 font-semibold">
              2 free generations
            </span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full rounded-md p-[1px] focus:outline-none hidden sm:flex gap-2 items-center bg-card border hover:bg-zinc-400 dark:hover:bg-zinc-800 transition-colors duration-300">
                <KeyRound size={18} className="text-green-300" />
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-green-700 to-green-300 dark:from-green-500 dark:to-green-100 font-semibold">
                  Set Your API Key
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px]" align="end">
              <div className="flex flex-col gap-5">
                <FormApiKey />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
