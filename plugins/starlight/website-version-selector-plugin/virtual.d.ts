declare module 'virtual:starlight-website-version-selector-plugin-config' {
  const WebsiteVersionSelectorUserConfig: import('./index').WebsiteVersionSelectorUserConfig

  export default WebsiteVersionSelectorUserConfig
}

declare module 'virtual:starlight/user-config' {
  const StarlightConfig: import('@astrojs/starlight/types').StarlightConfig

  export default StarlightConfig
}