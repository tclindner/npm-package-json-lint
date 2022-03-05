// Docs: https://docusaurus.io/docs/en/site-config.html

const organizationName = 'tclindner';
const projectName = 'npm-package-json-lint';
const repoUrl = `https://github.com/${organizationName}/${projectName}`;

module.exports = {
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // Docs folder path relative to website dir.
          path: './docs',
          // Sidebars file relative to website dir.
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl: `${repoUrl}/edit/master/website/`,
          routeBasePath: 'docs',
          // Equivalent to `enableUpdateBy`.
          showLastUpdateAuthor: true,
          // Equivalent to `enableUpdateTime`.
          showLastUpdateTime: true,
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        googleAnalytics: {
          trackingID: 'UA-144589603-1',
        },
      },
    ],
  ],
  baseUrl: '/',
  title: 'npm-package-json-lint',
  tagline: 'A configurable linter for package.json files',
  url: 'https://npmpackagejsonlint.org',

  // Used for publishing and more
  projectName,
  organizationName,

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/releases/v5.9.0/js/solid.js',
    'https://use.fontawesome.com/releases/v5.9.0/js/fontawesome.js'
  ],
  themeConfig: {
    navbar: {
      title: 'npm-package-json-lint',
      logo: {
        alt: 'npm-package-json-lint logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: 'docs', label: 'Docs', position: 'left'},
        {to: 'docs/rules', label: 'Rules', position: 'left'},
        {to: 'docs/api', label: 'API', position: 'left'},
        {to: 'help', label: 'Help', position: 'left'},
        {
          href: repoUrl,
          label: 'GitHub',
          position: 'right',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
      ],
    },
    footer: {
      logo: {
        alt: 'npm-package-json-lint logo',
        src: 'img/logo.svg',
        href: 'https://npmpackagejsonlint.org/',
      },
      // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
      copyright: `Copyright © 2016-${new Date().getFullYear()} Thomas Lindner`,
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
    },
  },
};
