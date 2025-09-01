import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { TableStack } from "./stacks/TableStack";
import { ApiStack } from "./stacks/ApiStack";
import { SearchStack } from "./stacks/SearchStack";
import { DeadLetterQueueStack } from "./stacks/DeadLetterQueueStack";

export default {
  config(_input) {
    return {
      name: "v2",
      region: "eu-central-1",
    };
  },
  stacks(app) {
    app
      .stack(TableStack)
      .stack(SearchStack)
      .stack(DeadLetterQueueStack)
      .stack(StorageStack)
      .stack(ApiStack);
  },
} satisfies SSTConfig;
