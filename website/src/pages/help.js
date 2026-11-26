import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Help = () => {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description={siteConfig.tagline}
    >
      <main className="help-page">
        <h1>Need Help?</h1>
        <p className="help-page__lead">Everything you need to get going with npm-package-json-lint.</p>

        <div className="help-grid">
          <section className="help-card">
            <h2>Learn more by checking out the docs.</h2>
            <ul>
              <li><Link to={useBaseUrl('docs')}>Getting started</Link></li>
              <li>Learn what <Link to={useBaseUrl('docs/rules')}>rules</Link> exist</li>
              <li>Explore the <Link to={useBaseUrl('docs/api')}>Node.js API</Link></li>
            </ul>
          </section>

          <section className="help-card">
            <h2>Stay up to date</h2>
            <ul>
              <li>Find out what's new with npm-package-json-lint. Subscribe to the <Link to={useBaseUrl('blog')}>npm-package-json-lint blog</Link>.</li>
              <li>Check out the <Link to='https://github.com/tclindner/npm-package-json-lint/releases'>releases</Link>.</li>
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Help;
