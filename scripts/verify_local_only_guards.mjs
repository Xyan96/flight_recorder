import fs from "node:fs";

const files = process.argv.slice(2);

if (!files.length) {
  console.error("Usage: node scripts/verify_local_only_guards.mjs <app.js> [...]");
  process.exit(2);
}

function countBraces(line) {
  let depth = 0;
  for (const char of line) {
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
  }
  return depth;
}

function findFunctions(source) {
  const lines = source.split(/\r?\n/);
  const functions = [];
  let current = null;
  let depth = 0;

  lines.forEach((line, index) => {
    const functionMatch = line.match(/^(async\s+)?function\s+([A-Za-z0-9_$]+)\s*\(/);
    if (!current && functionMatch) {
      current = {
        name: functionMatch[2],
        startLine: index + 1,
        lines: [],
      };
      depth = 0;
    }

    if (!current) return;

    current.lines.push(line);
    depth += countBraces(line);
    if (depth === 0 && current.lines.some((functionLine) => functionLine.includes("{"))) {
      current.endLine = index + 1;
      functions.push(current);
      current = null;
    }
  });

  return functions;
}

function hasLocalOnlyGuardBeforeFetch(functionInfo) {
  const firstFetchIndex = functionInfo.lines.findIndex((line) => /\bfetch\s*\(/.test(line));
  if (firstFetchIndex === -1) return true;

  const prefix = functionInfo.lines.slice(0, firstFetchIndex).join("\n");
  const earlyReturnGuard =
    /if\s*\(\s*LOCAL_ONLY_MODE\s*\)\s*return\s*;/.test(prefix) ||
    /if\s*\(\s*LOCAL_ONLY_MODE\s*\)\s*return\b[\s\S]*?;/.test(prefix) ||
    /if\s*\(\s*LOCAL_ONLY_MODE\s*\)\s*\{[\s\S]*?return\b[\s\S]*?;/.test(prefix);
  const localLoadGuard = /if\s*\(\s*localOnly\s*\|\|\s*LOCAL_ONLY_MODE\s*\)\s*\{/.test(prefix);

  return earlyReturnGuard || localLoadGuard;
}

let failed = false;

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const functions = findFunctions(source);
  const fetchFunctions = functions.filter((functionInfo) =>
    functionInfo.lines.some((line) => /\bfetch\s*\(/.test(line))
  );

  const functionRanges = functions.map((functionInfo) => [functionInfo.startLine, functionInfo.endLine]);
  source.split(/\r?\n/).forEach((line, index) => {
    if (!/\bfetch\s*\(/.test(line)) return;
    const lineNo = index + 1;
    const insideFunction = functionRanges.some(([start, end]) => lineNo >= start && lineNo <= end);
    if (!insideFunction) {
      console.error(`${file}:${lineNo}: top-level fetch is not allowed in the offline iPad app`);
      failed = true;
    }
  });

  for (const functionInfo of fetchFunctions) {
    if (!hasLocalOnlyGuardBeforeFetch(functionInfo)) {
      console.error(
        `${file}:${functionInfo.startLine}: ${functionInfo.name}() calls fetch before a LOCAL_ONLY_MODE guard`
      );
      failed = true;
    }
  }

  const names = fetchFunctions.map((functionInfo) => functionInfo.name).join(", ");
  console.log(`${file}: ${fetchFunctions.length} network-capable functions guarded for LOCAL_ONLY_MODE`);
  if (names) console.log(`  ${names}`);
}

if (failed) process.exit(1);
