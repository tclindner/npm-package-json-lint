const React = require('react');
const CompLibrary = require('../../core/CompLibrary.js');

const {Container, GridBlock} = CompLibrary;

const Help = (props) => {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Learn more by checking out the docs.\n\n- [Getting started.](${docUrl('index.html')})\n- Learn what [rules](${docUrl('rules.html')}) exist\n- Explore the [Node.js API](${docUrl('api.html')})`,
      title: 'Browse Docs',
    },
    {
      content: `Find out what's new with npm-package-json-lint.\n\n- Subscribe to the [npm-package-json-lint blog](/blog/).\n- Look at the [CHANGELOG](https://github.com/tclindner/npm-package-json-lint/blob/master/CHANGELOG.md).`,
      title: 'Stay up to date',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <GridBlock contents={supportLinks} layout="twoColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
