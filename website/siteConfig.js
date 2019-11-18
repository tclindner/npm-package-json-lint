// Docs: https://docusaurus.io/docs/en/site-config.html

const {version} = require('../package.json');

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true
  }
];

const organizationName = 'tclindner';
const projectName = 'npm-package-json-lint';
const repoUrl = `https://github.com/${organizationName}/${projectName}`;

const siteConfig = {
  title: 'npm-package-json-lint',
  tagline: 'A configurable linter for package.json files',
  url: 'https://npmpackagejsonlint.org',
  baseUrl: '/',

  currentVersion: `v${version}`,

  // Used for publishing and more
  projectName,
  organizationName,

  repoUrl,
  editUrl: `${repoUrl}/edit/master/docs/`,

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {
      doc: 'index',
      label: 'Docs'
    },
    {
      doc: 'rules',
      label: 'Rules'
    },
    {
      doc: 'api',
      label: 'API'
    },
    {
      page: 'help',
      label: 'Help'
    },
    {
      blog: true,
      label: 'Blog'
    },
    {
      languages: false
    },
    {
      search: false
    },
    {
      href: repoUrl,
      label: 'GitHub'
    }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/logo.svg',
  // favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#194769',
    secondaryColor: '#f2855e',
    white: '#fff',
    lightGray: '#e6e6e6'
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2016-${new Date().getFullYear()} Thomas Lindner`,

  gaTrackingId: 'UA-144589603-1',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'atom-one-dark'
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    'https://buttons.github.io/buttons.js',
    'https://use.fontawesome.com/releases/v5.9.0/js/solid.js',
    'https://use.fontawesome.com/releases/v5.9.0/js/fontawesome.js'
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',

  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  // ogImage: 'img/docusaurus.png',
  // twitterImage: 'img/docusaurus.png',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  scrollToTop: true,
  scrollToTopOptions: {
    zIndex: 100
  }
};

module.exports = siteConfig;
