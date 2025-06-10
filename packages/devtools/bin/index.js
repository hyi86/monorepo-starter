#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import path2 from 'path';
import { z } from 'zod';
import { watch } from 'chokidar';
import FastGlob from 'fast-glob';
import { parse } from 'yaml';
import { format } from 'prettier';

// ../utils/dist/console.js
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
var RESET = "\x1B[0m";
var rgb = (value) => (text) => {
  const [red, green, blue] = value.split(" ").map(Number);
  if (!red || !green || !blue) {
    return text;
  }
  const clampedRed = clamp(red, 0, 255);
  const clampedGreen = clamp(green, 0, 255);
  const clampedBlue = clamp(blue, 0, 255);
  return `\x1B[38;2;${clampedRed};${clampedGreen};${clampedBlue}m${text}${RESET}`;
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
  if (typeof window !== "undefined") {
    throw new Error("devLog is not supported in the browser");
  }
  const log = console.log;
  const now = `[${(/* @__PURE__ */ new Date()).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  })}]`;
  switch (type) {
    case "process":
      log(colors.process(` \u280B ${now}`), ...args);
      return;
    case "success":
      log(colors.success(` \u2713 ${now}`), ...args);
      return;
    case "info":
      log(colors.info(` \u25CB ${now}`), ...args);
      return;
    case "warn":
      log(colors.warn(` \u26A0 ${now}`), ...args);
      return;
    case "error":
      log(colors.error(` \u2717 ${now}`), ...args);
      return;
    default:
      log(...args);
      return;
  }
}
async function generate(filePath) {
  const dirname = path2.dirname(filePath);
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
  } catch {
    devLog("error", "dictionaries.json \uD30C\uC77C\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
    return;
  }
  const result = {};
  const yamlFiles = await FastGlob(`${filePath}/**/*.yaml`);
  for (const yamlFile of yamlFiles) {
    const lang = path2.basename(yamlFile).replace(/(\.yaml)$/, "");
    const file = fs.readFileSync(yamlFile, "utf-8");
    const data = parse(file);
    result[lang] = flattenObject(data);
  }
  const content = JSON.stringify(result, null, 2);
  fs.writeFileSync(`${dirname}/dictionaries.json`, content, "utf-8");
}
function flattenObject(obj, prefix = "", res = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

// src/typed-next-routes/route-utils.ts
var deepCloneNode = (node) => {
  return {
    path: node.path,
    children: node.children.map((child) => deepCloneNode(child))
  };
};
function mergeTreeNodes(trees) {
  const result = [];
  const addOrMergeNode = (targetList, nodeToAdd) => {
    const existingNode = targetList.find((n) => n.path === nodeToAdd.path);
    if (existingNode) {
      for (const childToAdd of nodeToAdd.children) {
        const existingChild = existingNode.children.find((c) => c.path === childToAdd.path);
        if (existingChild) {
          addOrMergeNode(existingNode.children, childToAdd);
        } else {
          existingNode.children.push(deepCloneNode(childToAdd));
        }
      }
    } else {
      targetList.push(deepCloneNode(nodeToAdd));
    }
  };
  for (const tree of trees) {
    for (const node of tree) {
      addOrMergeNode(result, node);
    }
  }
  return result;
}
function buildSimpleSortedTree(items) {
  const sortedItems = [...items].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  const root = [];
  let currentLevel = root;
  for (const item of sortedItems) {
    const node = {
      path: item.path,
      children: []
    };
    currentLevel.push(node);
    currentLevel = node.children;
  }
  return root;
}

// src/typed-next-routes/route-structure.ts
async function getRouteStructure() {
  const routes = FastGlob.sync("src/app/**/{page,layout,loading,not-found,error,template}.{ts,tsx,mdx}");
  const pagePathList = normalizePageRoutesBySegments(routes.filter((route) => route.match(/\/page\.(ts|tsx|mdx)$/)));
  const routeStructures = [];
  for (const pageRoute of pagePathList) {
    const index = routeStructures.findIndex((item) => item.linkTypes === pageRoute.linkTypes);
    if (index < 0) {
      routeStructures.push({
        href: pageRoute.href,
        linkTypes: pageRoute.linkTypes,
        files: [pageRoute.file],
        isParallelRoute: pageRoute.isParallelRoute,
        isDynamicRoute: pageRoute.isDynamicRoute
      });
    } else {
      routeStructures[index].files.push(pageRoute.file);
    }
  }
  const updatedRouteStructures = routeStructures.map((routeStructure) => {
    const specialFiles = routeStructure.files.map((file) => {
      const specialFiles2 = [];
      let currentDir = path2.dirname(file);
      while (true) {
        const folderDepth = (currentDir.split("/").length - 2 + 1) * 10;
        const layoutPath = path2.join(currentDir, "layout.tsx");
        const templatePath = path2.join(currentDir, "template.tsx");
        const loadingPath = path2.join(currentDir, "loading.tsx");
        const errorPath = path2.join(currentDir, "error.tsx");
        const notFoundPath = path2.join(currentDir, "not-found.tsx");
        if (routes.includes(layoutPath)) {
          specialFiles2.unshift({ type: "layout", path: layoutPath, sort: folderDepth + 1 });
        }
        if (routes.includes(templatePath)) {
          specialFiles2.unshift({ type: "template", path: templatePath, sort: folderDepth + 2 });
        }
        if (routes.includes(loadingPath)) {
          specialFiles2.unshift({ type: "loading", path: loadingPath, sort: folderDepth + 3 });
        }
        if (routes.includes(errorPath)) {
          specialFiles2.unshift({ type: "error", path: errorPath, sort: folderDepth + 4 });
        }
        if (routes.includes(notFoundPath)) {
          specialFiles2.unshift({ type: "not-found", path: notFoundPath, sort: folderDepth + 5 });
        }
        if (currentDir === "src/app") {
          break;
        }
        currentDir = path2.dirname(currentDir);
      }
      specialFiles2.push({
        type: "page",
        path: file,
        sort: (path2.dirname(file).split("/").length - 2 + 1) * 10 + 6
      });
      return buildSimpleSortedTree(specialFiles2);
    });
    const structures = mergeTreeNodes(specialFiles);
    return {
      href: routeStructure.href,
      linkTypes: routeStructure.linkTypes,
      isParallelRoute: routeStructure.isParallelRoute,
      isDynamicRoute: routeStructure.isDynamicRoute,
      files: routeStructure.files,
      structures
    };
  });
  return updatedRouteStructures;
}
function normalizePageRoutesBySegments(allPageRoutes) {
  const sanitizedFiles = allPageRoutes.map((routePath) => {
    const segments = routePath.split("/").slice(2);
    const hasPrivateRoute = segments.some((segment) => segment.startsWith("_"));
    if (hasPrivateRoute) {
      return {
        file: routePath,
        href: null
      };
    }
    const hasInterceptingRoute = segments.some((segment) => segment.match(/\([.]{1,3}\)\w+/));
    if (hasInterceptingRoute) {
      return {
        file: routePath,
        href: null
      };
    }
    const isParallelRoute = segments.some((segment) => segment.startsWith("@"));
    const isDynamicRoute = segments.some((segment) => segment.startsWith("[") && segment.endsWith("]"));
    const updatedSegments = segments.filter((segment) => !segment.match(/page\.(tsx|mdx|ts)$/)).filter((segment) => !segment.match(/^\(.+\)$/)).filter((segment) => !segment.startsWith("@"));
    const linkTypeSegments = updatedSegments.map((segment) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        return "${string}";
      }
      return segment;
    });
    return {
      file: routePath,
      href: `/${updatedSegments.join("/")}`,
      linkTypes: `/${linkTypeSegments.join("/")}`,
      isParallelRoute,
      isDynamicRoute
    };
  });
  return sanitizedFiles.filter((route) => route.href !== null).sort();
}

// src/typed-next-routes/index.ts
async function generate2(filePath) {
  const routeStructure = await getRouteStructure();
  routeStructure.sort((a, b) => a.href.localeCompare(b.href));
  const staticPaths = routeStructure.filter((item) => !item.isDynamicRoute).map((item) => item.linkTypes);
  const staticPathString = staticPaths.length > 0 ? staticPaths.map((path5) => `'${path5}'`).join(" | ") : "/";
  const dynamicPaths = routeStructure.filter((item) => item.isDynamicRoute).map((item) => item.linkTypes);
  const dynamicPathString = dynamicPaths.length > 0 ? dynamicPaths.map((path5) => `'${path5}'`).join(" | ") : "string";
  const contents = `
  // NOTE: This file should not be edited
  export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
  export type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

  export type StaticPath = ${staticPathString};

  export type TypedRoute = LiteralUnion<StaticPath, ${dynamicPathString}>;

  export function getTypedPath(path: TypedRoute) {
    return path;
  }

  export type Structure = {
    path: string;
    children: Structure[];
  };

  export type AppPathRoutes = {
    href: string;
    linkTypes: string;
    isParallelRoute: boolean;
    isDynamicRoute: boolean;
    files: string[];
    structures: Structure[];
  };

  export const appPathRoutes: AppPathRoutes[] = ${JSON.stringify(routeStructure, null, 2)};
  `.trim();
  const formattedContents = await format(contents, {
    parser: "typescript",
    printWidth: 120,
    singleQuote: true
  });
  fs.writeFileSync(filePath, formattedContents, "utf-8");
}

// src/generate.ts
async function run(rootPath, config2) {
  if (!config2.watch) {
    devLog("process", "Start generating... (Run in Once)");
    await Promise.all([
      generate2(path2.join(rootPath, "src/app-path-types.ts")),
      generate(path2.join(rootPath, "src/dictionaries"))
    ]);
    devLog("success", "Generated all successfully");
    return;
  }
  devLog("process", "Start generating... (Watch Mode)");
  watch(["src/app", "src/dictionaries"], {
    persistent: true,
    ignoreInitial: false,
    awaitWriteFinish: true,
    binaryInterval: 1500,
    interval: 1500
  }).on("all", async (event, filePath) => {
    if (event === "change") return;
    if (filePath.includes("src/dictionaries")) {
      await generate(path2.join(rootPath, "src/dictionaries"));
    }
    if (filePath.includes("src/app") && filePath.match(/\/(page|layout|loading|not-found|error|template)\.(ts|tsx|mdx)$/)) {
      await generate2(path2.join(rootPath, "src/app-path-types.ts"));
    }
  });
  devLog("success", "Generated all successfully");
}

// src/index.ts
var projectRoot = path2.join(import.meta.dirname, "../../..");
var program = new Command();
var config = {
  watch: false,
  package: ""
};
program.name("devtools").description(colors.green("devtools CLI")).version("1.0.0").option("--watch", "watch mode", false).option("-p, --package <package>", "select packages").parse();
var schema = z.object({
  watch: z.boolean().default(false),
  package: z.string({ message: "\uD328\uD0A4\uC9C0\uBA85\uC740 \uD544\uC218 \uC785\uB2C8\uB2E4 --package <package>" })
});
try {
  const options = schema.parse(program.opts());
  config.watch = options.watch;
  config.package = options.package;
} catch (exception) {
  const error = exception;
  error.errors.forEach((err) => {
    devLog("error", err.message);
  });
  process.exit(0);
}
try {
  fs.accessSync(path2.join(projectRoot, config.package), fs.constants.F_OK);
} catch {
  devLog("error", "\uD328\uD0A4\uC9C0 \uACBD\uB85C\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4");
  process.exit(0);
}
process.chdir(path2.join(projectRoot, config.package));
await run(process.cwd(), config);
