import { KeyRound } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row pb-2 sm:items-center sm:justify-between gap-2 sm:gap-0 w-full">
        <div className="hidden sm:flex items-center cursor-pointer text-white">
          <AppLogo />
        </div>
        <div className="flex gap-2 w-full sm:max-w-48">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full rounded-md p-[1px] focus:outline-none hidden sm:flex gap-2 items-center bg-card border hover:bg-zinc-400 dark:hover:bg-zinc-800 transition-colors duration-300">
                <KeyRound size={18} className="text-green-300" />
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-green-500 via-green-300 to-green-100 font-semibold">
                  Set Your API Key
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px]">
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
