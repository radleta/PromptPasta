import * as vscode from "vscode";
import { wrapContentInMarkdown } from "../utils/fileUtils";
import { copyToClipboard } from "../services/clipboardService";

export const copyTabGroupForPrompt = async (uri?: vscode.Uri) => {
  if (!uri) {
    vscode.window.showWarningMessage("No tab selected.");
    return;
  }

  const tabGroups = vscode.window.tabGroups.all;

  const targetTabGroup = tabGroups.find((group) =>
    group.tabs.some(
      (tab) =>
        (tab.input as vscode.TabInputText)?.uri?.toString() === uri.toString()
    )
  );

  if (!targetTabGroup) {
    vscode.window.showWarningMessage(
      "Could not find the tab group for the selected tab."
    );
    return;
  }

  const clipboardContents: string[] = [];
  let totalSize = 0;
  let itemCount = 0;

  for (const tab of targetTabGroup.tabs) {
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

  if (clipboardContents.length > 0) {
    const finalClipboardContent = clipboardContents.join("\n\n");
    await copyToClipboard(finalClipboardContent);
    vscode.window.showInformationMessage(
      `Copied ${itemCount} tabs from the selected tab group, total size: ${totalSize} bytes to the clipboard.`
    );
  } else {
    vscode.window.showWarningMessage(
      "No content available to copy from the selected tab group."
    );
  }
};
