const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;

    return (
      <div className="index-hero">
        <div className="index-hero-inner">
          <h1 className="index-hero-project-title">
            <img
              alt="Project Logo"
              className="index-hero-logo"
              src={`${siteConfig.baseUrl}img/logo.svg`}
            />
            {siteConfig.title}
          </h1>
          <p className="index-hero-project-tagline">{siteConfig.tagline}</p>
          <p className="index-hero-project-license">MIT License</p>
          <div className="index-ctas">
            <a
              className="button index-ctas-get-started-button"
              href={`${siteConfig.baseUrl}docs/${language}/install`}>
              Get Started
            </a>
            <span className="index-ctas-github-button">
              <iframe
                src="https://ghbtns.com/github-btn.html?user=tclindner&amp;repo=npm-package-json-lint&amp;type=star&amp;count=true&amp;size=large"
                frameBorder={0}
                scrolling={0}
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

class MainFeatures extends React.Component {
  render() {
    const {baseUrl} = this.props;

    return (
      <Container
        padding={['bottom', 'top']}
        id={this.props.id}
        background={this.props.background}>

        <GridBlock
          align="center"
          layout="twoColumn"
          contents={[
            {
              content: 'Rules allow you to tailor your desired file format.',
              image: `${baseUrl}img/tout1.svg`,
              imageAlign: 'bottom',
              title: 'Configurable rules',
            },

            {
              content: 'npm-package-json-lint is capable of scanning projects with multiple package.json files.',
              image: `${baseUrl}img/tout2.svg`,
              imageAlign: 'bottom',
              title: 'Monorepo support',
            }
          ]}
        />
      </Container>
    );
  }
}

class DocsBanner extends React.Component {
  render() {
    return (
      <Container
        background="highlight"
        id={this.props.id}>

        <p className="doc-cta"><a href="/docs/en/">Check out the documentation to learn more <i className="fa fa-chevron-right"></i></a></p>
      </Container>
    );
  }
}

class MainContent extends React.Component {
  render() {
    return (
      <Container
        className="myCustomClass"
        padding={['bottom', 'top']}
        id={this.props.id}>

        <GridBlock
          align="left"
          layout="twoColumn"
          contents={[
            {
              content: 'Shareable config allows you to create your own reusable module or consume someone else\'s module to enforce rules.',
              title: 'Shareable config',
            },
            {
              content: 'npm-package-json-lint does not have any rules enabled by default.',
              title: 'Nothing on by default',
            }
          ]}
        />

        <GridBlock
          align="left"
          layout="twoColumn"
          contents={[
            {
              content: 'You might not want to lint all package.json files in your project. Ignore support allows you to easily specific what files to skip.',
              title: 'Ignore support',
            },
            {
              content: 'All of npm-package-json-lint\'s CLI functionality is also exposed via a Node.js API.',
              title: 'Node.js API',
            }
          ]}
        />


        <div className="text-center">
          <h2>Hosting</h2>

          <p>
            <a href="https://www.netlify.com">
              <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" />
            </a>
          </p>

          <h2>Graphic Design</h2>

          <p>Shout out to <a href="https://isakknivsland.com">Isak Knivsland</a> for his work on the graphics.</p>
        </div>
      </Container>
    );
  }
}


class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    return (
      <div className="index-page">
        <HomeSplash siteConfig={siteConfig} language={language} />

        <div className="mainContainer">
          <MainFeatures baseUrl={baseUrl} />
          <DocsBanner />
          <MainContent />
        </div>
      </div>
    );
  }
}

module.exports = Index;
