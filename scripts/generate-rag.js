const fs = require("fs");
const path = require("path");

const doc = require("../docs/documentation.json");

const OUTPUT_DIR = path.join(__dirname, "..", "docs", "rag");

const KIND = {
  Project: 1,
  Module: 2,
  Variable: 32,
  Function: 64,
  Interface: 256,
  Property: 1024,
  Method: 2048,
  CallSignature: 4096,
  TypeAlias: 4194304,
};

function getCommentText(comment) {
  if (!comment) return "";
  const parts = [];
  if (comment.summary) {
    parts.push(
      comment.summary
        .map((s) => {
          if (s.kind === "text" || s.kind === "code") return s.text;
          return "";
        })
        .join("")
    );
  }
  if (comment.blockTags) {
    for (const tag of comment.blockTags) {
      const tagText = tag.content
        .map((s) => (s.kind === "text" || s.kind === "code" ? s.text : ""))
        .join("");
      if (tag.tag === "@example") {
        parts.push(`\n**Example:**\n${tagText}`);
      } else if (tag.tag === "@returns") {
        parts.push(`\n**Returns:** ${tagText}`);
      } else if (tag.tag === "@remarks") {
        parts.push(`\n**Remarks:** ${tagText}`);
      } else {
        parts.push(`\n${tag.tag}: ${tagText}`);
      }
    }
  }
  return parts.join("\n").trim();
}

function resolveType(typeNode) {
  if (!typeNode) return "unknown";
  switch (typeNode.type) {
    case "intrinsic":
      return typeNode.name;
    case "reference":
      return typeNode.name || "object";
    case "array":
      return `${resolveType(typeNode.elementType)}[]`;
    case "union":
      return (typeNode.types || []).map(resolveType).join(" | ");
    case "reflection":
      return "object";
    case "literal":
      return JSON.stringify(typeNode.value);
    default:
      return typeNode.type || "unknown";
  }
}

function renderProperty(prop, indent = "") {
  const type = resolveType(prop.type);
  const comment = getCommentText(prop.comment);
  let line = `${indent}- **${prop.name}**: \`${type}\``;
  if (comment) line += ` — ${comment.split("\n")[0]}`;
  return line;
}

function renderMethod(method) {
  const sig = method.signatures && method.signatures[0];
  if (!sig) return `- **${method.name}**()`;

  const params = (sig.parameters || [])
    .map((p) => `${p.name}: ${resolveType(p.type)}`)
    .join(", ");
  const returnType = resolveType(sig.type);
  const comment = getCommentText(sig.comment);

  const lines = [];
  lines.push(`### ${method.name}(${params}): ${returnType}`);
  if (comment) lines.push("", comment);

  if (sig.parameters && sig.parameters.length > 0) {
    lines.push("", "**Parameters:**");
    for (const p of sig.parameters) {
      const pComment = getCommentText(p.comment);
      lines.push(
        `- \`${p.name}\`: \`${resolveType(p.type)}\`${pComment ? ` — ${pComment}` : ""}`
      );
    }
  }

  return lines.join("\n");
}

function renderInterface(iface, moduleName) {
  const lines = [];
  const comment = getCommentText(iface.comment);

  lines.push(`# ${iface.name}`);
  lines.push(`**Module:** ${moduleName}`);
  lines.push(`**Kind:** Interface`);
  if (comment) lines.push("", comment);

  const properties = (iface.children || []).filter(
    (c) => c.kind === KIND.Property
  );
  const methods = (iface.children || []).filter(
    (c) => c.kind === KIND.Method
  );

  if (properties.length > 0) {
    lines.push("", "## Properties", "");
    for (const prop of properties) {
      const propComment = getCommentText(prop.comment);
      const type = resolveType(prop.type);
      lines.push(`### ${prop.name}`);
      lines.push(`- **Type:** \`${type}\``);
      if (propComment) lines.push(`- ${propComment}`);
      lines.push("");
    }
  }

  if (methods.length > 0) {
    lines.push("## Methods", "");
    for (const method of methods) {
      lines.push(renderMethod(method), "");
    }
  }

  return lines.join("\n");
}

function renderFunction(func, moduleName) {
  const sig = func.signatures && func.signatures[0];
  if (!sig) return "";

  const params = (sig.parameters || [])
    .map((p) => `${p.name}: ${resolveType(p.type)}`)
    .join(", ");
  const returnType = resolveType(sig.type);
  const comment = getCommentText(sig.comment);

  const lines = [];
  lines.push(`# ${func.name}()`);
  lines.push(`**Module:** ${moduleName}`);
  lines.push(`**Kind:** Function`);
  lines.push(`**Signature:** \`${func.name}(${params}): ${returnType}\``);
  if (comment) lines.push("", comment);

  if (sig.parameters && sig.parameters.length > 0) {
    lines.push("", "## Parameters", "");
    for (const p of sig.parameters) {
      const pComment = getCommentText(p.comment);
      lines.push(
        `- \`${p.name}\`: \`${resolveType(p.type)}\`${pComment ? ` — ${pComment}` : ""}`
      );
    }
  }

  return lines.join("\n");
}

function renderGlobalObject(variable, moduleName) {
  const comment = getCommentText(variable.comment);
  const type = resolveType(variable.type);

  const lines = [];
  lines.push(`# ${variable.name} (Global Object)`);
  lines.push(`**Module:** ${moduleName}`);
  lines.push(`**Type:** \`${type}\``);
  if (comment) lines.push("", comment);

  return lines.join("\n");
}

function renderTypeAlias(alias, moduleName) {
  const comment = getCommentText(alias.comment);
  const type = resolveType(alias.type);

  const lines = [];
  lines.push(`# ${alias.name}`);
  lines.push(`**Module:** ${moduleName}`);
  lines.push(`**Kind:** Type Alias`);
  lines.push(`**Type:** \`${type}\``);
  if (comment) lines.push("", comment);

  return lines.join("\n");
}

function slugify(name) {
  return name
    .replace(/\s*\/\s*/g, "-")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .toLowerCase();
}

function writeChunk(filename, content) {
  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, content.trim() + "\n", "utf8");
}

// Main
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const manifest = [];

for (const mod of doc.children || []) {
  const moduleName = mod.name;
  const moduleSlug = slugify(moduleName);

  // Module overview
  const moduleComment = getCommentText(mod.comment);
  if (moduleComment) {
    const overviewLines = [];
    overviewLines.push(`# ${moduleName} — Module Overview`);
    overviewLines.push("", moduleComment);

    const childNames = (mod.children || [])
      .filter((c) => c.kind === KIND.Interface)
      .map((c) => c.name);
    if (childNames.length > 0) {
      overviewLines.push("", "## Interfaces", "");
      childNames.forEach((n) => overviewLines.push(`- ${n}`));
    }

    const funcNames = (mod.children || [])
      .filter((c) => c.kind === KIND.Function)
      .map((c) => c.name);
    if (funcNames.length > 0) {
      overviewLines.push("", "## Functions", "");
      funcNames.forEach((n) => overviewLines.push(`- ${n}()`));
    }

    const filename = `${moduleSlug}-overview.md`;
    writeChunk(filename, overviewLines.join("\n"));
    manifest.push({ file: filename, title: `${moduleName} — Overview`, type: "module" });
  }

  for (const child of mod.children || []) {
    if (child.kind === KIND.Interface) {
      const content = renderInterface(child, moduleName);
      const filename = `${moduleSlug}-${slugify(child.name)}.md`;
      writeChunk(filename, content);
      manifest.push({ file: filename, title: `${moduleName} > ${child.name}`, type: "interface" });
    } else if (child.kind === KIND.Function) {
      const content = renderFunction(child, moduleName);
      if (content) {
        const filename = `${moduleSlug}-${slugify(child.name)}-function.md`;
        writeChunk(filename, content);
        manifest.push({ file: filename, title: `${moduleName} > ${child.name}()`, type: "function" });
      }
    } else if (child.kind === KIND.Variable) {
      const content = renderGlobalObject(child, moduleName);
      const filename = `${moduleSlug}-${slugify(child.name)}-global.md`;
      writeChunk(filename, content);
      manifest.push({ file: filename, title: `${moduleName} > ${child.name} (global)`, type: "global" });
    } else if (child.kind === KIND.TypeAlias) {
      const content = renderTypeAlias(child, moduleName);
      const filename = `${moduleSlug}-${slugify(child.name)}-type.md`;
      writeChunk(filename, content);
      manifest.push({ file: filename, title: `${moduleName} > ${child.name} (type)`, type: "type" });
    }
  }
}

// Write manifest
const manifestPath = path.join(OUTPUT_DIR, "manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");

console.log(`Generated ${manifest.length} RAG chunks in ${OUTPUT_DIR}`);
manifest.forEach((m) => console.log(`  ${m.file} — ${m.title}`));
