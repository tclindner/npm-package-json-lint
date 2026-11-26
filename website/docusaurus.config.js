// Docs: https://docusaurus.io/docs/en/site-config.html

const organizationName = 'tclindner';
const projectName = 'npm-package-json-lint';
const repoUrl = `https://github.com/${organizationName}/${projectName}`;
const {themes} = require('prism-react-renderer');

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

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.oneDark,
    },
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
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: repoUrl,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Getting started', to: 'docs'},
            {label: 'Configuration', to: 'docs/configuration'},
            {label: 'Rules', to: 'docs/rules'},
            {label: 'Node.js API', to: 'docs/api'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: repoUrl},
            {label: 'Issues', href: `${repoUrl}/issues`},
            {label: 'Releases', href: `${repoUrl}/releases`},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Blog', to: 'blog'},
            {label: 'Help', to: 'help'},
            {label: 'Related projects', to: 'docs/related-projects'},
          ],
        },
      ],
      logo: {
        alt: 'npm-package-json-lint logo',
        src: 'img/logo.svg',
        href: 'https://npmpackagejsonlint.org/',
      },
      // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
      copyright: [
        '<a class="vercel-badge" href="https://vercel.com/?utm_source=npm-package-json-lint&amp;utm_campaign=oss" target="_blank" rel="noopener noreferrer">',
        '<svg viewBox="0 0 76 65" width="13" height="11" aria-hidden="true"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor"/></svg>',
        '<span>Powered by Vercel</span>',
        '</a>',
        `<div class="footer__copyright-text">Copyright © 2016-${new Date().getFullYear()} Thomas Lindner</div>`,
      ].join(''),
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
