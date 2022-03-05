import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Configurable rules',
    imageUrl: 'img/tout1.svg',
    content: 'Rules allow you to tailor your desired file format.',
  },
  {
    title: 'Monorepo support',
    imageUrl: 'img/tout2.svg',
    content: 'npm-package-json-lint is capable of scanning projects with multiple package.json files.'
  },
];

const Index = () => {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className='hero hero--primary'>
        <div className="container">
          <img
            alt="Project Logo"
            className={styles.indexHeroLogo}
            src={useBaseUrl('img/logo.svg')}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p className="index-hero-project-license">MIT License</p>
          <div>
            <div className={styles.indexGitHubButton}>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=tclindner&amp;repo=npm-package-json-lint&amp;type=star&amp;count=true&amp;size=large"
                frameBorder={0}
                scrolling={0}
                width={160}
                height={30}
                title="GitHub Stars"
              />
            </div>

            <Link
              className='button button--secondary button--lg'
              to={useBaseUrl('docs/overview')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ imageUrl, title, content }, idx) => (
                  <div
                    key={idx}
                    className={classnames('col col--6', styles.feature, styles.textCenter)}
                  >
                    <h3>{title}</h3>
                    <p>{content}</p>
                    {imageUrl && (
                      <div className="text--center">
                        <img
                          className={styles.featureImage}
                          src={useBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className={styles.highlightBanner}>
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <p><a href="/docs/en/">Check out the documentation to learn more <i className="fa fa-chevron-right"></i></a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col col--6">
              <h2>Shareable config</h2>
              <p>Shareable config allows you to create your own reusable module or consume someone else\'s module to enforce rules.</p>
            </div>
            <div className="col col--6">
              <h2>Nothing on by default</h2>
              <p>npm-package-json-lint does not have any rules enabled by default.</p>
            </div>
          </div>

          <div className="row">
            <div className="col col--6">
              <h2>Ignore support</h2>
              <p>You might not want to lint all package.json files in your project. Ignore support allows you to easily specific what files to skip.</p>
            </div>
            <div className="col col--6">
              <h2>Node.js API</h2>
              <p>All of npm-package-json-lint\'s CLI functionality is also exposed via a Node.js API.</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col col--12">
              <div className={styles.textCenter}>
                <h2>Hosting</h2>

                <p>
                  <a href="https://www.netlify.com">
                    <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" />
                  </a>
                </p>

                <h2>Graphic Design</h2>

                <p>Shout out to <a href="https://isakknivsland.com">Isak Knivsland</a> for his work on the graphics.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Index;
