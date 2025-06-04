#!/usr/bin/env node
import { watch } from 'chokidar';
import { Command } from 'commander';
import fs from 'fs';
import path2 from 'path';
import { z } from 'zod';
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
  const log = console.log;
  if (typeof window !== "undefined") {
    switch (type) {
      case "process":
        log(`%c\u23F3 ${args[0]}`, "color:rgb(161,161,170);", ...args.slice(1));
        return;
      case "success":
        log(`%c\u2705 ${args[0]}`, "color:rgb(21,128,61);", ...args.slice(1));
        return;
      case "info":
        log(`%c\u{1F4A1} ${args[0]}`, "color:rgb(100,149,237);", ...args.slice(1));
        return;
      case "warn":
        log(`%c\u26A0\uFE0F ${args[0]}`, "color:rgb(202,138,4);", ...args.slice(1));
        return;
      case "error":
        log(`%c\u274C ${args[0]}`, "color:rgb(185,28,28);", ...args.slice(1));
        return;
      default:
        log(...args);
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

// ../utils/dist/fn.js
function debounceAsync(fn, delay2) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args).catch((error) => {
        throw error;
      });
    }, delay2);
  };
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

// ../utils/dist/array.js
function uniq(arr) {
  return [...new Set(arr)];
}

// ../../node_modules/.pnpm/fast-sort@3.4.1/node_modules/fast-sort/dist/sort.mjs
var castComparer = function(comparer) {
  return function(a, b, order) {
    return comparer(a, b, order) * order;
  };
};
var throwInvalidConfigErrorIfTrue = function(condition, context) {
  if (condition)
    throw Error("Invalid sort config: " + context);
};
var unpackObjectSorter = function(sortByObj) {
  var _a = sortByObj || {}, asc = _a.asc, desc = _a.desc;
  var order = asc ? 1 : -1;
  var sortBy = asc || desc;
  throwInvalidConfigErrorIfTrue(!sortBy, "Expected `asc` or `desc` property");
  throwInvalidConfigErrorIfTrue(asc && desc, "Ambiguous object with `asc` and `desc` config properties");
  var comparer = sortByObj.comparer && castComparer(sortByObj.comparer);
  return { order, sortBy, comparer };
};
var multiPropertySorterProvider = function(defaultComparer2) {
  return function multiPropertySorter(sortBy, sortByArr, depth, order, comparer, a, b) {
    var valA;
    var valB;
    if (typeof sortBy === "string") {
      valA = a[sortBy];
      valB = b[sortBy];
    } else if (typeof sortBy === "function") {
      valA = sortBy(a);
      valB = sortBy(b);
    } else {
      var objectSorterConfig = unpackObjectSorter(sortBy);
      return multiPropertySorter(objectSorterConfig.sortBy, sortByArr, depth, objectSorterConfig.order, objectSorterConfig.comparer || defaultComparer2, a, b);
    }
    var equality = comparer(valA, valB, order);
    if ((equality === 0 || valA == null && valB == null) && sortByArr.length > depth) {
      return multiPropertySorter(sortByArr[depth], sortByArr, depth + 1, order, comparer, a, b);
    }
    return equality;
  };
};
function getSortStrategy(sortBy, comparer, order) {
  if (sortBy === void 0 || sortBy === true) {
    return function(a, b) {
      return comparer(a, b, order);
    };
  }
  if (typeof sortBy === "string") {
    throwInvalidConfigErrorIfTrue(sortBy.includes("."), "String syntax not allowed for nested properties.");
    return function(a, b) {
      return comparer(a[sortBy], b[sortBy], order);
    };
  }
  if (typeof sortBy === "function") {
    return function(a, b) {
      return comparer(sortBy(a), sortBy(b), order);
    };
  }
  if (Array.isArray(sortBy)) {
    var multiPropSorter_1 = multiPropertySorterProvider(comparer);
    return function(a, b) {
      return multiPropSorter_1(sortBy[0], sortBy, 1, order, comparer, a, b);
    };
  }
  var objectSorterConfig = unpackObjectSorter(sortBy);
  return getSortStrategy(objectSorterConfig.sortBy, objectSorterConfig.comparer || comparer, objectSorterConfig.order);
}
var sortArray = function(order, ctx, sortBy, comparer) {
  var _a;
  if (!Array.isArray(ctx)) {
    return ctx;
  }
  if (Array.isArray(sortBy) && sortBy.length < 2) {
    _a = sortBy, sortBy = _a[0];
  }
  return ctx.sort(getSortStrategy(sortBy, comparer, order));
};
function createNewSortInstance(opts) {
  var comparer = castComparer(opts.comparer);
  return function(arrayToSort) {
    var ctx = Array.isArray(arrayToSort) && !opts.inPlaceSorting ? arrayToSort.slice() : arrayToSort;
    return {
      asc: function(sortBy) {
        return sortArray(1, ctx, sortBy, comparer);
      },
      desc: function(sortBy) {
        return sortArray(-1, ctx, sortBy, comparer);
      },
      by: function(sortBy) {
        return sortArray(1, ctx, sortBy, comparer);
      }
    };
  };
}
var defaultComparer = function(a, b, order) {
  if (a == null)
    return order;
  if (b == null)
    return -order;
  if (typeof a !== typeof b) {
    return typeof a < typeof b ? -1 : 1;
  }
  if (a < b)
    return -1;
  if (a > b)
    return 1;
  return 0;
};
var sort = createNewSortInstance({
  comparer: defaultComparer
});
createNewSortInstance({
  comparer: defaultComparer,
  inPlaceSorting: true
});

// ../utils/dist/sort.js
function sortArrayObject(array, compareFn) {
  return sort(array).by(compareFn);
}
async function getRouteStructure() {
  const typeMap = {
    layout: "Layout",
    template: "Template",
    error: "ErrorBoundary",
    loading: "Suspense",
    "not-found": "ErrorBoundary",
    page: "Page"
  };
  const routes = FastGlob.sync("src/app/**/{page,layout,loading,not-found,error,template}.{ts,tsx,mdx}");
  const pagePathList = updatePageRoutesBySegments(routes.filter((route) => route.match(/\/page\.(ts|tsx|mdx)$/)));
  const pageRoutes = routes.filter((route) => route.endsWith("page.tsx") || route.endsWith("page.mdx"));
  const layoutRoutes = routes.filter((route) => route.endsWith("layout.tsx"));
  const loadingRoutes = routes.filter((route) => route.endsWith("loading.tsx"));
  const notFoundRoutes = routes.filter((route) => route.endsWith("not-found.tsx"));
  const errorRoutes = routes.filter((route) => route.endsWith("error.tsx"));
  const templateRoutes = routes.filter((route) => route.endsWith("template.tsx"));
  const routeStructure = [];
  for (const pageFileName of pageRoutes) {
    const layouts = [];
    let currentDir = path2.dirname(pageFileName);
    while (true) {
      const folderDepth = (currentDir.split("/").length - 2 + 1) * 10;
      const layoutPath = path2.join(currentDir, "layout.tsx");
      const templatePath = path2.join(currentDir, "template.tsx");
      const loadingPath = path2.join(currentDir, "loading.tsx");
      const errorPath = path2.join(currentDir, "error.tsx");
      const notFoundPath = path2.join(currentDir, "not-found.tsx");
      if (layoutRoutes.includes(layoutPath)) {
        layouts.unshift({ type: "layout", path: layoutPath, sort: folderDepth + 1 });
      }
      if (templateRoutes.includes(templatePath)) {
        layouts.unshift({ type: "template", path: templatePath, sort: folderDepth + 2 });
      }
      if (loadingRoutes.includes(loadingPath)) {
        layouts.unshift({ type: "loading", path: loadingPath, sort: folderDepth + 3 });
      }
      if (errorRoutes.includes(errorPath)) {
        layouts.unshift({ type: "error", path: errorPath, sort: folderDepth + 4 });
      }
      if (notFoundRoutes.includes(notFoundPath)) {
        layouts.unshift({ type: "not-found", path: notFoundPath, sort: folderDepth + 5 });
      }
      if (currentDir === "src/app") break;
      currentDir = path2.dirname(currentDir);
    }
    const sortedLayouts = sortArrayObject(layouts, { asc: (value) => value.sort });
    sortedLayouts.push({ type: "page", path: pageFileName, sort: 99 });
    const componentTreeJson = sortedLayouts.reduceRight((acc, value) => {
      const node = {
        type: typeMap[value.type],
        path: value.path
      };
      if (value.type === "error") {
        node.fallback = "Error";
      }
      if (value.type === "not-found") {
        node.fallback = "NotFound";
      }
      if (value.type === "loading") {
        node.fallback = "Loading";
      }
      if (acc) {
        node.children = [acc];
      }
      return node;
    }, null);
    const pagePath = pagePathList.find((item) => item.file === pageFileName);
    if (pagePath) {
      routeStructure.push({
        href: pagePath.href,
        fileName: pageFileName,
        linkTypes: pagePath.linkTypes,
        componentTreeJson
      });
    }
  }
  return routeStructure;
}
function updatePageRoutesBySegments(allPageRoutes) {
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
    const hasParallelRoute = segments.some((segment) => segment.startsWith("@"));
    if (hasParallelRoute) {
      const parallelIndex = segments.findIndex((segment) => segment.startsWith("@"));
      const nextSegment = segments[parallelIndex + 1];
      if (!nextSegment?.match(/page\.(tsx|mdx|ts)$/)) {
        return {
          file: routePath,
          href: null
        };
      }
    }
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
      linkTypes: `/${linkTypeSegments.join("/")}`
    };
  });
  return sanitizedFiles.filter((route) => route.href !== null).sort();
}
function mergeComponentTrees(trees) {
  const [first, ...rest] = trees;
  if (!first) throw new Error("\uBE48 \uC785\uB825");
  return rest.reduce((acc, curr) => mergeNode(acc, curr), first);
}
function mergeNode(a, b) {
  if (a.path !== b.path || a.type !== b.type) {
    return {
      ...a,
      children: [...a.children || [], b]
    };
  }
  const mergedChildren = mergeChildren(a.children || [], b.children || []);
  return {
    ...a,
    fallback: a.fallback ?? b.fallback,
    // 필요시 덮어쓰기 전략 조정
    children: mergedChildren
  };
}
function mergeChildren(a, b) {
  const result = [...a];
  for (const bChild of b) {
    const match = result.find((aChild) => aChild.type === bChild.type && aChild.path === bChild.path);
    if (match) {
      const merged = mergeNode(match, bChild);
      const idx = result.indexOf(match);
      result[idx] = merged;
    } else {
      result.push(bChild);
    }
  }
  return result;
}

// src/lib/create-typed-routes.ts
async function generate2(filePath) {
  const prettierConfig = {
    parser: "typescript",
    printWidth: 120,
    singleQuote: true
  };
  const routeStructure = await getRouteStructure();
  const uniqueLinkTypes = uniq(routeStructure.map((route) => route.linkTypes));
  uniqueLinkTypes.sort((a, b) => a.localeCompare(b));
  const uniqRouteStructure = [];
  const staticRoutes = [];
  const dynamicRoutes = [];
  uniqueLinkTypes.forEach((linkType) => {
    if (linkType.includes("/${string}")) {
      dynamicRoutes.push(linkType);
    } else {
      staticRoutes.push(linkType);
    }
    const routeStructureItems = routeStructure.filter((route) => route.linkTypes === linkType);
    if (routeStructureItems.length > 1) {
      const base = routeStructureItems[0];
      const componentTreeJsonList = routeStructureItems.map((item) => item.componentTreeJson).filter(Boolean);
      const mergedTree = mergeComponentTrees(componentTreeJsonList);
      const mergedRouteStructure = {
        href: base.href,
        linkTypes: linkType,
        fileName: "",
        fileNames: routeStructureItems.map((item) => item.fileName),
        componentTreeJson: mergedTree
      };
      uniqRouteStructure.push(mergedRouteStructure);
      return;
    }
    if (routeStructureItems.length === 1) {
      uniqRouteStructure.push(routeStructureItems[0]);
      return;
    }
  });
  const uniqueStaticRoutes = uniq(staticRoutes);
  let uniqueStaticRoutesString = uniqueStaticRoutes.map((route) => `'${route}'`).join(" | ");
  if (uniqueStaticRoutesString.length === 0) {
    uniqueStaticRoutesString = "'/'";
  }
  const uniqueDynamicRoutes = uniq(dynamicRoutes);
  let uniqueDynamicRoutesString = uniqueDynamicRoutes.map((route) => "`" + route + "`").join(" | ");
  if (uniqueDynamicRoutesString.length === 0) {
    uniqueDynamicRoutesString = "string";
  }
  const contents = await format(
    `
      // NOTE: This file should not be edited
      export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
      export type LiteralUnion<LiteralType, BaseType extends Primitive> = LiteralType | (BaseType & Record<never, never>);

      export type StaticPath = ${uniqueStaticRoutesString}

      export type TypedRoute = LiteralUnion<StaticPath, ${uniqueDynamicRoutesString}>;


      export function getTypedPath(path: StaticPath) {
        return path;
      }

      export type ComponentTreeJson = {
        type: 'Layout' | 'Template' | 'ErrorBoundary' | 'Suspense' | 'Page';
        path: string;
        fallback?: 'Error' | 'NotFound' | 'Loading';
        children?: ComponentTreeJson[];
      };

      export type AppPathRoutes = {
        href: string | null;
        linkTypes: string;
        fileName: string;
        fileNames?: string[];
        componentTreeJson: ComponentTreeJson | null;
      };

      export const appPathRoutes: AppPathRoutes[] = ${JSON.stringify(uniqRouteStructure, null, 2)};
    `,
    prettierConfig
  );
  fs.writeFileSync(filePath, contents, "utf-8");
}

// src/generate.ts
var appPathFilename = "src/app-path-types.ts";
var dictionariesFilename = "src/dictionaries";
var generateAll = async () => {
  devLog("process", "Generating all...");
  await Promise.all([generate2(appPathFilename), generate(dictionariesFilename)]);
  devLog("success", "Generated all successfully");
};

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
if (!config.watch) {
  devLog("info", "Run in Once");
  await generateAll();
  process.exit(0);
}
watch(["src/app", "src/dictionaries"], {
  persistent: true,
  ignoreInitial: false
}).on(
  "all",
  debounceAsync(async (event) => {
    if (event === "change") return;
    await generateAll();
  }, 1500)
);
