import * as vscode from "vscode";
import { getContentFromUri, wrapContentInMarkdown } from "../utils/fileUtils";
import { copyToClipboard } from "../services/clipboardService";
import * as micromatch from "micromatch";

export const copyForPrompt = async (uris: vscode.Uri[]) => {
  const clipboardContents: string[] = [];
  let totalSize = 0;
  let itemCount = 0;

  const ignorePatterns =
    vscode.workspace.getConfiguration("promptpasta").get<string[]>("ignore") ||
    [];
  const summaryOnlyPatterns =
    vscode.workspace
      .getConfiguration("promptpasta")
      .get<string[]>("summaryOnly") || [];
  const binaryFileHandling =
    vscode.workspace
      .getConfiguration("promptpasta")
      .get<string>("binaryFileHandling") || "summarize";

  if (uris && uris.length > 0) {
    for (const uri of uris) {
      const relativePath = vscode.workspace.asRelativePath(uri);

      // Ignore files based on glob patterns
      if (micromatch.isMatch(relativePath, ignorePatterns)) {
        continue;
      }

      const stat = await vscode.workspace.fs.stat(uri);

      if (stat.type === vscode.FileType.File) {
        const content = await getContentFromUri(uri);

        if (content === "binary") {
          if (binaryFileHandling === "ignore") {
            continue;
          } else if (binaryFileHandling === "summarize") {
            // Summarize binary files
            itemCount++;
            clipboardContents.push(
              `Binary File: ${relativePath}, Size: ${stat.size} bytes`
            );
          }
        } else if (micromatch.isMatch(relativePath, summaryOnlyPatterns)) {
          // Handle summary only files
          itemCount++;
          clipboardContents.push(
            `File: ${relativePath}, Size: ${stat.size} bytes`
          );
        } else {
          // Handle individual text file
          if (content) {
            itemCount++;
            totalSize += Buffer.byteLength(content, "utf8");
            clipboardContents.push(wrapContentInMarkdown(uri, content));
          }
        }
      } else if (stat.type === vscode.FileType.Directory) {
        // Handle folder: Get all files recursively
        const allFiles = await getAllFilesInDirectory(uri);
        for (const fileUri of allFiles) {
          const fileRelativePath = vscode.workspace.asRelativePath(fileUri);

          if (micromatch.isMatch(fileRelativePath, ignorePatterns)) {
            continue;
          }

          const fileStat = await vscode.workspace.fs.stat(fileUri);
          const fileContent = await getContentFromUri(fileUri);

          if (fileContent === "binary") {
            if (binaryFileHandling === "ignore") {
              continue;
            } else if (binaryFileHandling === "summarize") {
              // Summarize binary files
              itemCount++;
              clipboardContents.push(
                `Binary File: ${fileRelativePath}, Size: ${fileStat.size} bytes`
              );
            }
          } else if (
            micromatch.isMatch(fileRelativePath, summaryOnlyPatterns)
          ) {
            // Handle summary only files
            itemCount++;
            clipboardContents.push(
              `File: ${fileRelativePath}, Size: ${fileStat.size} bytes`
            );
          } else {
            if (fileContent) {
              itemCount++;
              totalSize += Buffer.byteLength(fileContent, "utf8");
              clipboardContents.push(
                wrapContentInMarkdown(fileUri, fileContent)
              );
            }
          }
        }
      }
    }

    // Add confirmation if there are a lot of items
    if (itemCount > 10) {
      const confirm = await vscode.window.showWarningMessage(
        `You are about to copy ${itemCount} items. Do you want to continue?`,
        "Yes",
        "No"
      );
      if (confirm !== "Yes") {
        return;
      }
    }
  }

  if (clipboardContents.length > 0) {
    const finalClipboardContent = clipboardContents.join("\n\n");
    await copyToClipboard(finalClipboardContent);
    vscode.window.showInformationMessage(
      `Copied ${itemCount} items, total size: ${totalSize} bytes to the clipboard.`
    );
  } else {
    vscode.window.showWarningMessage("No content available to copy.");
  }
};

// Helper function to recursively get all files within a directory
async function getAllFilesInDirectory(dir: vscode.Uri): Promise<vscode.Uri[]> {
  let files: vscode.Uri[] = [];
  const items = await vscode.workspace.fs.readDirectory(dir);

  for (const [name, fileType] of items) {
    const fullPath = vscode.Uri.joinPath(dir, name);
    if (fileType === vscode.FileType.File) {
      files.push(fullPath);
    } else if (fileType === vscode.FileType.Directory) {
      const nestedFiles = await getAllFilesInDirectory(fullPath);
      files = files.concat(nestedFiles);
    }
  }

  return files;
}
