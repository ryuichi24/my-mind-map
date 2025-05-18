import { Logger } from "@my-mind-maps/logger";
import { ConsoleLogStrategy } from "@my-mind-maps/logger/strategies";

const consoleLogStrategy = new ConsoleLogStrategy();
export const logger = new Logger({ name: "renderer_process" }).addStrategy(consoleLogStrategy);
