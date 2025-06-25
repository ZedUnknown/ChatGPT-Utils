This document outlines the workflow for releasing and enabling auto-updates for the Chrome Extension. Crucially, the `.crx` extension file is **generated manually** before triggering the automated release process.


### Project Structure

- **`.github/workflows/release.yml`**: The GitHub Actions workflow definition. This workflow is triggered by new Git tag pushes.

- **`docs/`**: This directory serves as the output location for the **manually prepared `.crx` extension** and the auto-generated `update.xml` file. It's configured to be served by GitHub Pages.

- **`src/`**: Contains the complete source code of the Chrome extension (e.g., `manifest.json`, JavaScript files, CSS, images).

- **`key.pem`**: The private key used to cryptographically sign the `.crx` extension. *This key is used during manual local `.crx` generation and is NOT directly used by the GitHub Action for building the `.crx`.* Its content is stored securely as a GitHub Secret (`EXTENSION_PRIVATE_KEY`) within the repository for reference/backup.

&nbsp;
-----
### Release Process Overview

The release and auto-update mechanism involves a critical manual pre-step followed by an automated GitHub Actions workflow.

#### 1. Manual CRX Generation & Placement (Crucial Pre-Step)

Before pushing any tags to trigger the workflow, you **MUST manually generate the `.crx` file using the Chrome browser** and place it in the `docs/` folder. This is essential as the GitHub Action expects this pre-packed file.

**Steps for Manual CRX Generation (via Chrome Browser):**

1. **Prepare the Extension Source:** Ensure the `src/` directory contains the final version of the extension code that you wish to release.

2. **Open Chrome Extensions Page:** Open the Chrome browser and navigate to `chrome://extensions`.

3. **Enable Developer Mode:** Toggle on "Developer mode" in the top-right corner of the extensions page.

4. **Pack Extension:** Click the "Pack extension" button.
	- In the "Extension root directory" field, browse and select the extension's **`src/` directory**.

	- **Select the `key.pem` for the "Private key file":** The chrome with use the private key to generate the `*.crx` file with the same extension `ID`.

	- Click "Pack extension".

5. **Locate Generated Files:** Chrome will generate the crx file in the parent directory of the `src/` folder:
	- `extension_name.crx`

6. **Rename and Place in `docs/`:**
	- Rename the generated `.crx` file to match the expected naming convention (e.g., `ChatGPT-Utils-v<VERSION>.crx`, where `<VERSION>` is the release version like `1.0.0`. The release version **MUST** be higher than previous version).

	- Move this renamed `.crx` file into the local `docs/` directory.

7. **Verify Extension ID (Crucial):** It is absolutely critical that the generated `.crx` file, when packed with the `key.pem`, results in the **correct and consistent Extension ID**.
	- **The required Extension ID for this project is: `neojikhlkcommekalkmemddhnfflkgln`**

	- After generating the `.crx`, you can temporarily drag and drop it onto your `chrome://extensions` page (with developer mode on) to install it and confirm its ID matches `neojikhlkcommekalkmemddhnfflkgln`. If it doesn't, you are likely not using the correct or consistent `.pem` file.

&nbsp;

#### 2. Triggering a New Release

Once the `.crx` file is manually generated and placed in `docs/` with the correct ID, commit these changes and then create and push an annotated Git tag to your repository. The tag name should follow a semantic versioning pattern (e.g., `v1.0.0`, `v1.1.2`).

```bash
git add docs/ChatGPT-Utils-v1.0.0.crx          # Add the new .crx file to staging
git commit -m "Add new v1.0.0 CRX for release" # Commit the .crx file
git tag -a v1.0.0 -m "Release version 1.0.0"   # Create an annotated tag
git push origin v1.0.0                         # Push the tag and committed files to GitHub
```

*Pushing this tag will automatically trigger the `release.yml` GitHub Actions workflow.*

&nbsp;

#### 3. Deleting a Tag (If Necessary)

Should you need to remove a tag (e.g., due to an error), follow these steps:

```bash
git tag -d v1.0.0                     # Delete the tag from your local repository
git push origin :refs/tags/v1.0.0     # Delete the tag from the remote (GitHub) repository
```

#### 4. GitHub Actions Workflow (`release.yml`) Summary

Upon a tag push, the `release.yml` workflow performs the following actions:

- **Verifies CRX File Existence:** Checks for the existence of the expected `.crx` file in the `docs/` directory (which you manually placed there).

- **Generates `update.xml`:** Creates an `update.xml` file with:
	* The correct `appid` for the extension.
	* The hosted URL pointing to the *pre-existing* `.crx` file in `docs/`.
	* The `version` attribute matching the pushed Git tag (`github.ref_name`).

- **Creates GitHub Release:** Creates a new GitHub Release associated with the pushed tag. The *existing* `.crx` and the generated `update.xml` files are attached as downloadable assets to this release.

&nbsp;
-----
&nbsp;
### GitHub Pages (Just to Read)

GitHub Pages settings are configured as follows:

* **Source Branch:** `main`
* **Folder:** `/docs`

This setup makes the `update.xml` file accessible at a predictable URL, which Chrome uses for update checks:

➡️ **Auto-Update XML URL Example:** `https://zedunknown.github.io/ChatGPT-Utils/update.xml`

➡️ **CRX URL Example:** `https://zedunknown.github.io/ChatGPT-Utils/ChatGPT-Utils-v<VERSION>.crx`

&nbsp;
-----
&nbsp;

### Chrome Auto-Update

Chrome's auto-update work when the `update.xml` updated to a new version and file must precisely match the extension's details:

- **Extension ID:** The `appid` in `update.xml` (`neojikhlkcommekalkmemddhnfflkgln`) must exactly match the ID of the `.crx` file you manually generated and placed in `docs/`. This ID is derived from your `key.pem`.

- **Codebase URL:** The `codebase` attribute must point directly to the `.crx` file hosted on your GitHub Pages (e.g., `https://zedunknown.github.io/ChatGPT-Utils/docs/ChatGPT-Utils-v1.0.0.crx`).

- **Version Match:** The `version` attribute in `update.xml` (which comes from the Git tag) must precisely match the `version` in your extension's `manifest.json`.

**Example `update.xml` snippet:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">
<app appid="neojikhlkcommekalkmemddhnfflkgln"> <updatecheck codebase="https://zedunknown.github.io/ChatGPT-Utils/docs/ChatGPT-Utils-v1.0.0.crx" version="1.0.0" />
</app>
</gupdate>
```

&nbsp;
-----
&nbsp;

### Workflow Adjustment (Refined `release.yml`)

Based on this, you'll need to remove the CRX building steps from your workflow and potentially add a check for the file's existence.

```yaml
  name: Release Extension (Manual CRX)

  on:
    push:
      tags:
        - 'v*'

  jobs:
    release: # Renamed job to 'release' for clarity
      runs-on: ubuntu-latest
      permissions:
        contents: write
        pages: write
        id-token: write

      steps:
        - name: Checkout repository
          uses: actions/checkout@v4

        # Removed 'Setup Node.js', 'Install CRX3 CLI', 'Restore private key',
        # 'Zip extension', and 'Build .crx from source' steps
        # as CRX generation is now manual and pre-workflow.

        - name: Verify Manually Placed CRX Exists
          # This assumes the CRX file naming convention will be ChatGPT-Utils-v<tag_name>.crx
          # Adjust 'ChatGPT-Utils-v' prefix if your naming differs.
          run: |
            CRX_FILENAME="ChatGPT-Utils-v${{ github.ref_name }}.crx"
            if [ ! -f "docs/${CRX_FILENAME}" ]; then
              echo "Error: Manually generated CRX file 'docs/${CRX_FILENAME}' not found!"
              echo "Please generate the CRX locally, place it in the 'docs/' folder, and commit it before pushing the tag."
              exit 1
            fi
            echo "Verified: CRX file 'docs/${CRX_FILENAME}' found."

        - name: Generate update.xml
          run: |
            CRX_FILENAME="ChatGPT-Utils-v${{ github.ref_name }}.crx" # Ensure filename matches the manually placed one
            printf '<?xml version="1.0" encoding="UTF-8"?>\n' > docs/update.xml
            printf '<gupdate xmlns="http://www.google.com/update2/response" protocol="2.0">\n' >> docs/update.xml
            printf '  <app appid="neojikhlkcommekalkmemddhnfflkgln">\n' >> docs/update.xml
            printf '    <updatecheck codebase="https://zedunknown.github.io/ChatGPT-Utils/docs/%s" version="%s" />\n' "${CRX_FILENAME}" "${{ github.ref_name }}" >> docs/update.xml
            printf '  </app>\n' >> docs/update.xml
            printf '</gupdate>\n' >> docs/update.xml

        - name: Verify generated files
          run: |
            ls -l docs/
            cat docs/update.xml

        - name: Deploy to GitHub Pages
          uses: peaceiris/actions-gh-pages@v4
          with:
            github_token: ${{ secrets.GITHUB_TOKEN }}
            publish_dir: ./docs

        - name: Create GitHub Release
          uses: softprops/action-gh-release@v1
          with:
            files: |
              ChatGPT-Utils-${{ github.ref_name }}.crx
              update.xml
```