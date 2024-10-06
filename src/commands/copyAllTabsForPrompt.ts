import * as vscode from "vscode";
import { wrapContentInMarkdown } from "../utils/fileUtils";
import { copyToClipboard } from "../services/clipboardService";

export const copyAllTabsForPrompt = async () => {
  const tabGroups = vscode.window.tabGroups.all;

  const clipboardContents: string[] = [];
  let totalSize = 0;
  let itemCount = 0;

  for (const tabGroup of tabGroups) {
    for (const tab of tabGroup.tabs) {
      if (tab.input instanceof vscode.TabInputText) {
        const document = await vscode.workspace.openTextDocument(tab.input.uri);
        const content = document.getText();
        const markdownWrappedContent = wrapContentInMarkdown(
          tab.input.uri,
          content
        );
        clipboardContents.push(markdownWrappedContent);
        totalSize += Buffer.byteLength(content, "utf8");
        itemCount++;
      }
    }
  }

  if (clipboardContents.length > 0) {
    const finalClipboardContent = clipboardContents.join("\n\n");
    await copyToClipboard(finalClipboardContent);
    vscode.window.showInformationMessage(
      `Copied ${itemCount} tabs from all groups, total size: ${totalSize} bytes to the clipboard.`
    );
  } else {
    vscode.window.showWarningMessage(
      "No content available to copy from all tab groups."
    );
  }
};
