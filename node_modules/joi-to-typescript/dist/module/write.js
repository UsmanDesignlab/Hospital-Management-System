// Functions for converting properties to strings and to file system
// TODO: Move all code here
import { writeFileSync } from 'fs';
import Path from 'path';
/**
 * Write index.ts file
 *
 * @param settings - Settings Object
 * @param fileNamesToExport - List of file names that will be added to the index.ts file
 */
export function writeIndexFile(settings, fileNamesToExport) {
    if (fileNamesToExport.length === 0) {
        // Don't write an index file if its going to export nothing
        return;
    }
    const exportLines = fileNamesToExport.map(fileName => `export * from './${fileName.replace(/\\/g, '/')}';`);
    const fileContent = `${settings.fileHeader}\n\n${exportLines.join('\n').concat('\n')}`;
    writeFileSync(Path.join(settings.typeOutputDirectory, 'index.ts'), fileContent);
}
export function getTypeFileNameFromSchema(schemaFileName, settings) {
    return ((schemaFileName.endsWith(`${settings.schemaFileSuffix}.ts`)
        ? schemaFileName.substring(0, schemaFileName.length - `${settings.schemaFileSuffix}.ts`.length)
        : schemaFileName.replace('.ts', '')) + settings.interfaceFileSuffix);
}
/**
 * Get all indent characters for this indent level
 * @param settings includes what the indent characters are
 * @param indentLevel how many indent levels
 */
export function getIndentStr(settings, indentLevel) {
    return settings.indentationChacters.repeat(indentLevel);
}
/**
 * Get Interface jsDoc
 */
export function getJsDocString(settings, name, jsDoc, indentLevel = 0) {
    var _a, _b, _c, _d, _e;
    if ((jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.disable) === true) {
        return '';
    }
    if (!settings.commentEverything && !(jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.description) && !(jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.default) && ((_b = (_a = jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.examples) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) === 0) {
        return '';
    }
    const lines = [];
    if (settings.commentEverything || (jsDoc && jsDoc.description)) {
        let description = name;
        if (jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.description) {
            description = getStringIndentation(jsDoc.description).deIndentedString;
        }
        if (description) {
            lines.push(...description.split('\n').map(line => ` * ${line}`.trimEnd()));
        }
    }
    // Add a JsDoc divider if needed
    if ((((_d = (_c = jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.examples) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0 || (jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.default)) && lines.length > 0) {
        lines.push(' *');
    }
    if (jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.default) {
        const deIndented = getStringIndentation(jsDoc.default).deIndentedString;
        if (deIndented.includes('\n')) {
            lines.push(` * @default`);
            lines.push(...deIndented.split('\n').map(line => ` * ${line}`.trimEnd()));
        }
        else {
            lines.push(` * @default ${deIndented}`);
        }
    }
    for (const example of (_e = jsDoc === null || jsDoc === void 0 ? void 0 : jsDoc.examples) !== null && _e !== void 0 ? _e : []) {
        const deIndented = getStringIndentation(example).deIndentedString;
        if (deIndented.includes('\n')) {
            lines.push(` * @example`);
            lines.push(...deIndented.split('\n').map(line => ` * ${line}`.trimEnd()));
        }
        else {
            lines.push(` * @example ${deIndented}`);
        }
    }
    if (lines.length === 0) {
        return '';
    }
    // Add JsDoc boundaries
    lines.unshift('/**');
    lines.push(' */');
    return lines.map(line => `${getIndentStr(settings, indentLevel)}${line}`).join('\n') + '\n';
}
/**
 * Given an indented string, uses the first line's indentation as base to de-indent
 * the rest of the string, and returns both the de-indented string and the
 * indentation found as prefix.
 */
function getStringIndentation(value) {
    const lines = value.split('\n');
    let indent = '';
    for (const line of lines) {
        // Skip initial newlines
        if (line.trim() === '') {
            continue;
        }
        const match = /^(\s+)\b/.exec(line);
        if (match) {
            indent = match[1];
        }
        break;
    }
    const deIndentedString = lines
        .map(line => (line.startsWith(indent) ? line.substring(indent.length) : line))
        .join('\n')
        .trim();
    return {
        deIndentedString,
        indent
    };
}
