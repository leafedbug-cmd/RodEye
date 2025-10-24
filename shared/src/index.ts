export * from "../schema/scanRecord";
export * from "../schema/threadSpec";
// Load large JSON data at runtime to avoid including it in the TypeScript
// project file list during compilation. Consumers can import `toolingMaster`
// as a value.
export const toolingMaster: unknown = require("../data/tooling.master.json");
