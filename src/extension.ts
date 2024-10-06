import * as vscode from "vscode";
import { copyForPrompt } from "./commands/copyForPrompt";
import { copyTabForPrompt } from "./commands/copyTabForPrompt";
import { copyTabGroupForPrompt } from "./commands/copyTabGroupForPrompt";
import { copyAllTabsForPrompt } from "./commands/copyAllTabsForPrompt";

export function activate(context: vscode.ExtensionContext) {
  let copyForPromptCommand = vscode.commands.registerCommand(
    "promptpasta.copyForPrompt",
    async (uri, uris) => {
      // Handle case where multiple items are selected
      if (uris && uris.length > 1) {
        await copyForPrompt(uris);
      } else {
        await copyForPrompt([uri]);
      }
    }
  );
  context.subscriptions.push(copyForPromptCommand);

  // Register copy tab command (context-aware)
  let copyTabForPromptCommand = vscode.commands.registerCommand(
    "promptpasta.copyTabForPrompt",
    async (uri) => {
      await copyTabForPrompt(uri);
    }
  );
  context.subscriptions.push(copyTabForPromptCommand);

  // Register copy tab group command (context-aware)
  let copyTabGroupForPromptCommand = vscode.commands.registerCommand(
    "promptpasta.copyTabGroupForPrompt",
    async (uri) => {
      await copyTabGroupForPrompt(uri);
    }
  );
  context.subscriptions.push(copyTabGroupForPromptCommand);

  // Register the new command to copy all tabs across groups
  let copyAllTabsForPromptCommand = vscode.commands.registerCommand(
    "promptpasta.copyAllTabsForPrompt",
    async () => {
      await copyAllTabsForPrompt();
    }
  );
  context.subscriptions.push(copyAllTabsForPromptCommand);
}

export function deactivate() {}
