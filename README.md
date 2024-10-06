# PromptPasta README

**PromptPasta** is a Visual Studio Code extension designed to make building and managing AI prompts as easy as twirling a forkful of spaghetti. Whether you're working with markdown content, context files, or just need a quick way to gather up multiple documents, PromptPasta has your back. With simple commands and context-aware features, you'll be able to effortlessly copy, organize, and optimize your prompts for AI-powered projects.

## Current Features (v1.0.0)

### 📝 Prompt Builder

- Quickly craft prompts using your current VS Code context or specific snippets of text.

### 📂 Context Manager

- Configure and manage context files to streamline your AI interactions.

### 📋 Markdown Clipboard

- Effortlessly cut and paste markdown between VS Code and AI tools to make sharing and prompt editing easier.

### 📑 Snappy Copy-Paste

- Use a variety of commands to copy single tabs, tab groups, or all open tabs with just a few clicks.
- **Copy commands include**:
  - **Copy for Prompt**: Select one or more files in the explorer to copy their contents, respecting your settings for binary and large files.
  - **Copy Tab for Prompt**: Copy the contents of a currently open tab.
  - **Copy Tab Group for Prompt**: Copy all the tabs in a specific tab group.
  - **Copy All Tabs for Prompt**: Collect the content of all open tabs across all groups.

### ⚙️ Flexible Configuration

- Configure **binary file handling**, **ignore patterns**, and **summary-only handling** to customize how PromptPasta works with different types of files.
- Summary options allow you to handle large binaries or images without copying full content, just giving file metadata like name and size.

### 🏗️ Extension Settings

PromptPasta offers several configuration settings to personalize how you work:

- **promptpasta.binaryFileHandling**: Choose how to handle binary files, either `summarize` or `ignore`.
- **promptpasta.ignore**: Define glob patterns for files or folders to ignore when copying.
- **promptpasta.summaryOnly**: Specify which file types should be summarized instead of copying full content (e.g., images, archives).

## Getting Started

Once installed, the extension is ready to use out of the box. You can trigger the copy commands through the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) by searching for any of the **PromptPasta** commands, or by right-clicking on files, tabs, or tab groups and selecting the desired copy action.

## Requirements

There are no specific dependencies required for PromptPasta, but a recent version of VS Code (v1.94.0 or later) is recommended.

## Extension Settings

Here's a quick rundown of the available configuration properties:

- **`promptpasta.binaryFileHandling`**: Configure whether to summarize or ignore binary files during copy operations. Default is `summarize`.
- **`promptpasta.ignore`**: Set glob patterns for files or folders to ignore.
- **`promptpasta.summaryOnly`**: Set glob patterns for files that should only have summaries (e.g., images or large archives).

## Known Issues

- Certain file encodings might not be properly detected or converted.
- Large folder operations may be slower than expected, depending on the number of files.

## Future Roadmap

We are excited about expanding PromptPasta and have several ideas in mind for the future. While we are still evaluating which features to prioritize, here are some potential improvements we're considering:

### Planned Improvements

- **Prompt Building Made Easy**: Allow users to save, edit, and quickly build prompts directly from their workspace for an even more efficient workflow.
- **Enhanced Context Awareness**: Improve prompt building with more context awareness to make working with prompt copy-paste more seamless and intuitive.
- **Advanced Context Management**: Introduce new tools for intricate context organization, including versioning, categorization, and more granular context controls.
- **Improved User Interface**: Add enhanced UI elements for easier access to commonly used commands and features, making the extension even more intuitive.
- **Selective Copy Options**: Expand options to selectively copy content based on file type, specific sections, or even customized criteria.
- **Integration with AI Models**: Provide integration capabilities to directly interact with AI models, allowing users to test prompts in real time within the editor.
- **Collaboration Features**: Add support for shared prompt libraries and collaborative editing to enable teams to work together on prompt building.
- **Performance Optimizations**: Continue to improve performance, especially for large folder operations and handling large datasets.

Stay tuned as we continue to improve and add more features to make your prompt-building experience even better!

## Commands Overview

| Command                                  | Description                                             |
| ---------------------------------------- | ------------------------------------------------------- |
| `PromptPasta: Copy for Prompt`           | Copy selected files from the explorer to the clipboard. |
| `PromptPasta: Copy Tab for Prompt`       | Copy the current tab content to the clipboard.          |
| `PromptPasta: Copy Tab Group for Prompt` | Copy all tabs in the current tab group.                 |
| `PromptPasta: Copy All Tabs for Prompt`  | Copy all tabs across all groups.                        |

Whether you're fine-tuning prompts or managing large datasets, PromptPasta is here to streamline your workflow and ensure you're always ready to engage with your AI tools effectively.
