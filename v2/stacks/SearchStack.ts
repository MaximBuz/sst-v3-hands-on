import { StackContext, use } from "sst/constructs";
import { TableStack } from "./TableStack";

export function SearchStack({ stack }: StackContext) {
  const { table } = use(TableStack);

  table.addConsumers(stack, {
    SearchIndexingLambda: {
      function: {
        handler: "packages/functions/src/searchIndexing.ts",
        environment: {
          MEILISEARCH_API_KEY: process.env.MEILISEARCH_API_KEY ?? "",
        },
        bind: [table],
      },
    },
  });
}
