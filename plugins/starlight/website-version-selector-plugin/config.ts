import { z } from 'astro/zod';

export const VersionSchema = z.object({
  label: z.string(),
  url: z.string()
});

export const WebsiteVersionSelectorUserConfigSchema = z.object({
  versions: z.array(VersionSchema).refine((value) => value.length > 0, {
    message: 'At least one version of the documentation must be defined.',
  }),
});


export type WebsiteVersionSelectorUserConfig = z.input<typeof WebsiteVersionSelectorUserConfigSchema>;