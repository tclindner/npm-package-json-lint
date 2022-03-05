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
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3 padding-vert--lg">
            <h1>Need Help?</h1>

            <h2>Learn more by checking out the docs.</h2>
            <ul>
              <li><Link to={useBaseUrl('docs')}>Getting started</Link></li>
              <li>Learn what <Link to={useBaseUrl('docs/rules')}>rules</Link> exist</li>
              <li>Explore the <Link to={useBaseUrl('docs/api')}>Node.js API</Link></li>
            </ul>

            <h2>Stay up to date</h2>
            <ul>
              <li>Find out what's new with npm-package-json-lint. Subscribe to the <Link to={useBaseUrl('blog')}>npm-package-json-lint blog</Link>.</li>
              <li>Check out the <Link to='https://github.com/tclindner/npm-package-json-lint/releases'>releases</Link>.</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Help;
