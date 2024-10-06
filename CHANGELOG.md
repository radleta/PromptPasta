# Change Log

All notable changes to the "promptpasta" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.0.0] - Initial Release

### Added

- **Prompt Builder** for quickly crafting prompts using the VS Code context.
- **Context Manager** to configure and manage context files for AI interactions.
- **Markdown Clipboard** to easily cut and paste markdown between VS Code and AI tools.
- **Snappy Copy-Paste** commands, including:
  - **Copy for Prompt**: Copy selected files from the explorer.
  - **Copy Tab for Prompt**: Copy the content of the current tab.
  - **Copy Tab Group for Prompt**: Copy all tabs in the current tab group.
  - **Copy All Tabs for Prompt**: Copy all tabs across all groups.
- **Flexible Configuration** for handling binary files, ignoring certain patterns, and summarizing specific file types.

### Known Issues

- File encodings might not be properly detected or converted for certain files.
- Large folder operations can be slower depending on the number of files.
