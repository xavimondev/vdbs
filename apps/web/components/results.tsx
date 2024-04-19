import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeEditor } from "@/components/code-editor";
import { RunCommand } from "@/components/run-command";
import { DeploySchema } from "@/components/deploy-schema";

type ResultsProps = {
  code: string;
};

export function Results({ code }: ResultsProps) {
  return (
    <Tabs defaultValue="sqlschema" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sqlschema">SQL Schema</TabsTrigger>
        <TabsTrigger value="migration">Migration</TabsTrigger>
      </TabsList>
      <TabsContent value="sqlschema">
        <CodeEditor code={code} />
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
              <RunCommand />
            </CardContent>
          </Card>
          <DeploySchema />
        </div>
      </TabsContent>
    </Tabs>
  );
}
