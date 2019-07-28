const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/* <Logo img_src={`${baseUrl}img/docusaurus.svg`} /> */}
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <p>MIT License</p>
          {/* <PromoSection> */}
            {/* <Button href={docUrl('doc1.html')}>Example Link</Button> */}
            {/* <Button href={docUrl('doc2.html')}>Example Link 2</Button> */}
          {/* </PromoSection> */}
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            // image: `${baseUrl}img/docusaurus.svg`,
            // imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: 'Talk about learning how to use this',
            // image: `${baseUrl}img/docusaurus.svg`,
            // imageAlign: 'right',
            title: 'Learn How',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="twoColumn">
        {[
          {
            content: 'Rules allow you to tailor your desired file format.',
            // image: `${baseUrl}img/docusaurus.svg`,
            // imageAlign: 'top',
            title: 'Configurable rules',
          },

          {
            content: 'npm-package-json-lint is capable of scanning projects with multiple package.json files.',
            // image: `${baseUrl}img/docusaurus.svg`,
            // imageAlign: 'top',
            title: 'Monorepo support',
          }
        ]}
      </Block>
    );

    const SecondaryFeatures = () => (
      <Container
        background="light"
        className="myCustomClass">

        <Block layout="fourColumn">
          {[

            {
              content: 'Shareable config allows you to create your own reusable module or consume someone else\'s module to enforce rules.',
              // image: `${baseUrl}img/docusaurus.svg`,
              // imageAlign: 'top',
              title: 'Shareable config',
            },
            {
              content: 'npm-package-json-lint does not have any rules enabled by default.',
              // image: `${baseUrl}img/docusaurus.svg`,
              // imageAlign: 'top',
              title: 'Nothing on by default',
            },
            {
              content: 'You might not want to lint all package.json files in your project. Ignore support allows you to easily specific what files to skip.',
              // image: `${baseUrl}img/docusaurus.svg`,
              // imageAlign: 'top',
              title: 'Ignore support',
            },
            {
              content: 'All of npm-package-json-lint\'s CLI functionality is also exposed via a Node.js API.',
              // image: `${baseUrl}img/docusaurus.svg`,
              // imageAlign: 'top',
              title: 'Node.js API',
            }
          ]}
        </Block>
      </Container>
    );
    const Hosting = () => (
      <Container
        padding={['bottom', 'top']}
        className="myCustomClass">

        <h2>Hosting</h2>

        <p>
          <a href="https://www.netlify.com">
            <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" />
          </a>
        </p>
      </Container>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <SecondaryFeatures />
          <Hosting />
          {/* <LearnHow /> */}
          {/* <Description /> */}
          {/* <Showcase /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
