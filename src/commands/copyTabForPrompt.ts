import * as vscode from "vscode";
import { wrapContentInMarkdown } from "../utils/fileUtils";
import { copyToClipboard } from "../services/clipboardService";

export const copyTabForPrompt = async (uri?: vscode.Uri) => {
  if (!uri) {
    vscode.window.showWarningMessage("No tab selected.");
    return;
  }

  try {
    const document = await vscode.workspace.openTextDocument(uri);
    const content = document.getText();
    const markdownWrappedContent = wrapContentInMarkdown(uri, content);
    const totalSize = Buffer.byteLength(content, "utf8");

    await copyToClipboard(markdownWrappedContent);

    vscode.window.showInformationMessage(
      `Copied 1 tab, total size: ${totalSize} bytes to the clipboard.`
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      `Failed to copy tab: ${(error as any)?.message ?? error}`
    );
  }
};
