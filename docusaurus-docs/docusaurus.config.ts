import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pricing Script Documentation',
  tagline: 'API Reference & Examples for Infigo Pricing Scripts',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://infigo-official.github.io',
  baseUrl: '/types-for-pricing-scripts/',

  organizationName: 'Infigo-Official',
  projectName: 'types-for-pricing-scripts',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-typedoc',
      {
        entryPoints: ['../v1/index.d.ts'],
        tsconfig: '../tsconfig.json',
        out: 'api',
        sidebar: {
          autoConfiguration: true,
          pretty: true,
        },
        readme: 'none',
        excludePrivate: true,
        excludeProtected: true,
        excludeInternal: true,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/Infigo-Official/types-for-pricing-scripts/tree/main/docusaurus-docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Pricing Script',
      logo: {
        alt: 'Infigo Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://www.npmjs.com/package/@infigo-official/types-for-pricing-script',
          label: 'NPM',
          position: 'right',
        },
        {
          href: 'https://github.com/Infigo-Official/types-for-pricing-scripts',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Examples',
              to: '/patterns/basic-pricing',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'NPM Package',
              href: 'https://www.npmjs.com/package/@infigo-official/types-for-pricing-script',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Infigo-Official/types-for-pricing-scripts',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Infigo Software. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.dracula,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript', 'bash', 'json'],
    },
    algolia: undefined,
  } satisfies Preset.ThemeConfig,
};

export default config;
