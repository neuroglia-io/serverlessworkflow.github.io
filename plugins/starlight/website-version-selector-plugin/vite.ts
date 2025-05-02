import type { ViteUserConfig } from 'astro'

import type { WebsiteVersionSelectorUserConfig  } from './config'

export function vitePluginWebsiteVersionSelector(config: WebsiteVersionSelectorUserConfig ): VitePlugin {
  const moduleId = 'virtual:starlight-website-version-selector-plugin-config'
  const resolvedModuleId = `\0${moduleId}`
  const moduleContent = `export default ${JSON.stringify(config)}`

  return {
    name: 'vite-plugin-starlight-website-version-selector',
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined
    },
  }
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]