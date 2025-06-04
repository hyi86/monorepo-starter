#!/usr/bin/env node
import { log, outro, intro, select, isCancel, text, confirm, spinner } from '@clack/prompts';
import { Command } from 'commander';
import fs4 from 'fs';
import path2 from 'path';
import { z } from 'zod';
import { exec } from 'child_process';
import util from 'util';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import yaml from 'yaml';
import fastGlob from 'fast-glob';

// ../utils/dist/console.js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
var RESET = "\x1B[0m";
var rgb = (value) => (text2) => {
  const [red, green, blue] = value.split(" ").map(Number);
  if (!red || !green || !blue) {
    return text2;
  }
  const clampedRed = clamp(red, 0, 255);
  const clampedGreen = clamp(green, 0, 255);
  const clampedBlue = clamp(blue, 0, 255);
  return `\x1B[38;2;${clampedRed};${clampedGreen};${clampedBlue}m${text2}${RESET}`;
};
var colors = {
  process: rgb("156 163 175"),
  success: rgb("34 197 94"),
  info: rgb("59 130 246"),
  warn: rgb("250 204 21"),
  error: rgb("239 68 68"),
  green: rgb("34 197 94"),
  dim: rgb("156 163 175"),
  dim2: rgb("107 114 128"),
  cyan: rgb("59 130 246"),
  white: rgb("217 217 217"),
  yellow: rgb("250 204 21")
};
function devLog(type, ...args) {
  if (process.env.NODE_ENV === "production") {
    return;
  }
  const log5 = console.log;
  if (typeof window !== "undefined") {
    switch (type) {
      case "process":
        log5(`%c\u23F3 ${args[0]}`, "color:rgb(161,161,170);", ...args.slice(1));
        return;
      case "success":
        log5(`%c\u2705 ${args[0]}`, "color:rgb(21,128,61);", ...args.slice(1));
        return;
      case "info":
        log5(`%c\u{1F4A1} ${args[0]}`, "color:rgb(100,149,237);", ...args.slice(1));
        return;
      case "warn":
        log5(`%c\u26A0\uFE0F ${args[0]}`, "color:rgb(202,138,4);", ...args.slice(1));
        return;
      case "error":
        log5(`%c\u274C ${args[0]}`, "color:rgb(185,28,28);", ...args.slice(1));
        return;
      default:
        log5(...args);
        return;
    }
  }
  const now = `[${(/* @__PURE__ */ new Date()).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })}]`;
  switch (type) {
    case "process":
      log5(colors.process(` \u280B ${now}`), ...args);
      return;
    case "success":
      log5(colors.success(` \u2713 ${now}`), ...args);
      return;
    case "info":
      log5(colors.info(` \u25CB ${now}`), ...args);
      return;
    case "warn":
      log5(colors.warn(` \u26A0 ${now}`), ...args);
      return;
    case "error":
      log5(colors.error(` \u2717 ${now}`), ...args);
      return;
    default:
      log5(...args);
      return;
  }
}
var execPromise = util.promisify(exec);
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function runCommands(commands) {
  const running = spinner();
  log.info(`pwd: ${colors.dim(process.cwd())}`);
  running.start("Running commands...");
  let successCount = 0;
  for (const command of commands) {
    await delay(300);
    if (command.commandType === "bash" && command.code.startsWith("cd ")) {
      process.chdir(command.code.slice(3).trim());
      running.message(`Changed directory: ${colors.info(process.cwd())}`);
      successCount++;
      continue;
    }
    if (command.commandType === "bash") {
      await execPromise(command.code);
      running.message(`Executed: ${colors.info(command.code.slice(0, 100))}`);
      successCount++;
      continue;
    }
    if (command.filePath) {
      fs4.mkdirSync(path2.dirname(command.filePath), { recursive: true });
      fs4.writeFileSync(command.filePath, command.code);
      running.message(`Created: ${colors.info(command.filePath)}`);
      successCount++;
    }
  }
  running.stop(`All commands done! (${successCount}/${commands.length})`);
}
async function parseMarkdown(markdown2) {
  const commands = [];
  const file = await unified().use(remarkParse).use(remarkFrontmatter, ["yaml"]).use(remarkStringify).parse(markdown2);
  let config2 = {
    packagePrefix: "",
    packageName: ""
  };
  visit(file, "yaml", (node) => {
    const data = yaml.parse(node.value);
    config2 = {
      ...config2,
      ...data
    };
  });
  if (!config2.packagePrefix || !config2.packageName) {
    throw new Error("packagePrefix and packageName are required");
  }
  const rootPath = config2.rootPath || process.cwd();
  let isExistPackage = false;
  try {
    fs4.accessSync(path2.join(rootPath, "packages", config2.packageName), fs4.constants.F_OK);
    isExistPackage = true;
  } catch {
    isExistPackage = false;
  }
  if (isExistPackage) {
    log.error(`Package ${colors.error(config2.packageName)} already exists`);
    const isOverwrite = await confirm({
      message: "Overwrite?",
      initialValue: false
    });
    if (isCancel(isOverwrite)) {
      outro("Package creation canceled by user");
      process.exit(0);
    }
    if (!isOverwrite) {
      outro("Package creation canceled");
      process.exit(0);
    }
  }
  visit(file, "code", (node) => {
    if (!node.lang || !node.value) {
      return;
    }
    if (node.lang === "bash" || node.lang === "sh") {
      const code2 = node.value.replace(/\$packagePrefix/g, config2.packagePrefix).replace(/\$packageName/g, config2.packageName);
      code2.split("\n").filter((line) => line.trim() !== "" && !line.trim().startsWith("#")).forEach((line) => {
        commands.push({
          commandType: "bash",
          code: line
        });
      });
      return;
    }
    const meta = parseMeta(node.meta ?? "");
    if (!meta.filename || meta.skip) {
      return;
    }
    if (node.lang === "diff") {
      return;
    }
    const code = node.value.replace(/\$packagePrefix/g, config2.packagePrefix).replace(/\$packageName/g, config2.packageName);
    commands.push({
      commandType: "file",
      filePath: path2.join(rootPath, "packages", config2.packageName, meta.filename),
      code
    });
  });
  return commands;
}
function parseMeta(meta) {
  if (!meta) return {};
  const result = {};
  const regex = /(\w+)(?:="([^"]*)")?/g;
  let match;
  while ((match = regex.exec(meta)) !== null) {
    const [, key, value] = match;
    if (key) {
      result[key] = value ?? true;
    }
  }
  return result;
}
async function runTernimalUI() {
  const dirname2 = import.meta.dirname;
  let markdown2 = "";
  intro(`Start create package from markdown file with ${colors.green("tui")}`);
  const parentPath = path2.join(dirname2, "..", "templates");
  const templateFiles = await fastGlob(`${parentPath}/**/*.md`, {
    onlyFiles: true
  });
  const selectedTemplate = await select({
    message: "Select a template",
    options: templateFiles.map((file) => ({
      value: file,
      label: path2.basename(file)
    }))
  });
  if (isCancel(selectedTemplate)) {
    outro("No template selected");
    process.exit(0);
  }
  const selectedTemplateFilePath = String(selectedTemplate);
  markdown2 = fs4.readFileSync(selectedTemplateFilePath, "utf-8");
  log.info(`Selected template: ${colors.success(selectedTemplateFilePath)}`);
  const packageName = await text({
    message: "Enter package name",
    placeholder: "package-name.."
  });
  if (isCancel(packageName)) {
    outro("No package name provided");
    process.exit(0);
  }
  markdown2 = markdown2.replace('packageName: ""', `packageName: "${String(packageName)}"`);
  const commands = await parseMarkdown(markdown2);
  await runCommands(commands);
  outro("Create package done.");
}

// src/index.ts
var dirname = import.meta.dirname;
var program = new Command();
var config = {
  template: "",
  packageName: ""
};
program.name("markdown-runner").description(colors.green("markdown-runner CLI")).version("1.0.0").option("-t, --template <template>", "select template").option("-p, --packageName <packageName>", "select package name").parse();
var schema = z.object({
  template: z.string().optional(),
  packageName: z.string().optional()
});
try {
  const options = schema.parse(program.opts());
  config.template = options.template || "";
  config.packageName = options.packageName || "";
} catch (exception) {
  const error = exception;
  error.errors.forEach((err) => {
    devLog("error", err.message);
  });
  process.exit(0);
}
if (!config.template && !config.packageName) {
  await runTernimalUI();
  process.exit(0);
}
var markdown = "";
try {
  const templateFilePath = path2.join(dirname, "../templates", config.template);
  fs4.accessSync(templateFilePath, fs4.constants.F_OK);
  markdown = fs4.readFileSync(templateFilePath, "utf-8");
  log.info(`Template file found: ${colors.success(templateFilePath)}`);
} catch {
  devLog("error", "\uD15C\uD50C\uB9BF \uACBD\uB85C\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
  process.exit(0);
}
try {
  markdown = markdown.replace('packageName: ""', `packageName: "${String(config.packageName)}"`);
  const commands = await parseMarkdown(markdown);
  await runCommands(commands);
  outro("Create package done.");
} catch {
  devLog("error", "\uD328\uD0A4\uC9C0\uBA85\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
  process.exit(0);
}
