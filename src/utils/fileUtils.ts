import * as vscode from "vscode";
import * as path from "path";
import * as isBinary from "isbinaryfile";
import * as chardet from "chardet";
import * as iconv from "iconv-lite";
import { Buffer } from "buffer";

export async function getContentFromUri(
  uri: vscode.Uri
): Promise<string | null> {
  const stat = await vscode.workspace.fs.stat(uri);

  if (stat.type === vscode.FileType.File) {
    const fileContent = await vscode.workspace.fs.readFile(uri);

    // Convert Uint8Array to Buffer
    const bufferContent = Buffer.from(fileContent);

    // Check if the file is binary
    const binary = await isBinary.isBinaryFile(bufferContent);

    if (binary) {
      return "binary"; // Returning "binary" as an indicator
    }

    // Detect encoding of the file
    const encoding = chardet.detect(bufferContent);

    if (encoding && encoding !== "UTF-8") {
      // If encoding is detected and not UTF-8, convert it using iconv-lite
      return iconv.decode(bufferContent, encoding);
    }

    // Fallback to UTF-8 if encoding is either UTF-8 or undetectable
    return bufferContent.toString("utf8");
  } else if (stat.type === vscode.FileType.Directory) {
    return null; // Skipping directories for now
  }

  return null;
}

export function wrapContentInMarkdown(
  uri: vscode.Uri,
  content: string
): string {
  const fileName = path.relative(vscode.workspace.rootPath || "", uri.fsPath);
  const fileType = path.extname(uri.fsPath).substring(1) || "plaintext";

  return `# ${fileName}\n\`\`\`${fileType}\n${content}\n\`\`\``;
}
