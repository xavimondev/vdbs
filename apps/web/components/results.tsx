import Link from "next/link";
import { HelpCircle, CircleAlert } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CodeEditor } from "@/components/code-editor";
import { RunCommand } from "@/components/run-command";

export function Results() {
  return (
    <Tabs defaultValue="sqlschema" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sqlschema">SQL Schema</TabsTrigger>
        <TabsTrigger value="migration">Migration</TabsTrigger>
      </TabsList>
      <TabsContent value="sqlschema">
        <CodeEditor code="SELECT * FROM users;" />
      </TabsContent>
      <TabsContent value="migration">
        <div className="flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Run command</CardTitle>
              <CardDescription>
                Run this command locally to create a script of your database
                migration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RunCommand commandCode={""} />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Connect project</CardTitle>
              <CardDescription>
                Deploy your migration script to your Supabase project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-1.5">
                      <Label>Database Connection URL</Label>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="size-4 text-foreground/80" />
                          </TooltipTrigger>
                          <TooltipContent className="font-semibold">
                            <>
                              The connection string to your Supabase database.
                              You can find this in your{" "}
                              <Link
                                href="https://supabase.com/dashboard/project/_/settings/database"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline font-medium text-zinc-800"
                              >
                                database settings
                              </Link>{" "}
                              in the Supabase dashboard.
                            </>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input
                      className="w-full"
                      placeholder="postgres://postgres.[referenceId]:[YOUR-PASSWORD]@[cloud]-0-[region].pooler.supabase.com:5432/postgres"
                    />
                  </div>
                  <Alert variant="destructive" className="bg-destructive/20">
                    <CircleAlert className="size-5 text-red-500/90" />
                    <AlertTitle className="font-medium text-base text-red-500/90">
                      We never store your database credentials
                    </AlertTitle>
                    <AlertDescription className="text-red-500/90">
                      The credentials you provide are used exclusively for
                      validating your database connection and performing the
                      migration script. We do not store your database
                      credentials. You can examine the{" "}
                      <Link
                        href="https://github.com/xavimon/supamigration"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline"
                      >
                        source code
                      </Link>{" "}
                      for verification.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Deploy</Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
