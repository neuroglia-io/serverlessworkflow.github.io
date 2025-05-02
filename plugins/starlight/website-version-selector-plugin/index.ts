import type { StarlightPlugin, StarlightUserConfig } from "@astrojs/starlight/types";
import { WebsiteVersionSelectorUserConfigSchema, type WebsiteVersionSelectorUserConfig } from "./config";
import { AstroError } from "astro/errors";
import { vitePluginWebsiteVersionSelector } from "./vite";
import { fileURLToPath } from 'node:url';

const overrides: Array<keyof NonNullable<StarlightUserConfig['components']>> = [
  'ThemeSelect',
  'Banner',
];

export type { WebsiteVersionSelectorUserConfig } from "./config";

export default function websiteVersionsPlugin(userConfig: WebsiteVersionSelectorUserConfig): StarlightPlugin {
  const parsingResult = WebsiteVersionSelectorUserConfigSchema.safeParse(userConfig);
  if (!parsingResult.success) {
    throw new AstroError(`The Website Version Selector plugin configuration is invalid.\n${parsingResult.error.issues.map((issue) => issue.message).join('\n')}`);
  }
  const config = parsingResult.data;
  return {
    name: 'starlight-website-version-selector-plugin',
    hooks: {
      /*async*/'config:setup'({
        addIntegration,
        config: starlightConfig,
        logger,
        updateConfig
      }) {
        try {
          const components = {...starlightConfig.components || {}};
          overrides.forEach(override => {
            if (components[override]) {
              logger.warn(`An override for component \`<${override}>\` has already been defined in your Starlight configuration.`)
              return;
            }
            components[override] = fileURLToPath(
              new URL(`./overrides/${override}.astro`, import.meta.url)
            )
          });
          updateConfig({ components });
          addIntegration({
            name: 'starlight-website-version-selector-integration',
            hooks: {
              'astro:config:setup': ({ updateConfig }) => {
                updateConfig({ vite: { plugins: [vitePluginWebsiteVersionSelector(config)] } })
              },
            }
          })
        }
        catch(error) {
          throw new AstroError(error instanceof Error ? error.message : 'An error occurred while generating versioned sidebars.');
        }
      }
    },
  };
}