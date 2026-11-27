import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './styles.module.css';

const installCommand = 'npm install --save-dev npm-package-json-lint';

const highlights = [
  {
    title: 'Configurable rules',
    imageUrl: 'img/tout1.svg',
    content: 'Rules allow you to tailor your desired file format.',
    link: {to: 'docs/rules', label: 'Browse the rules'},
  },
  {
    title: 'Monorepo support',
    imageUrl: 'img/tout2.svg',
    content: 'npm-package-json-lint is capable of scanning projects with multiple package.json files.',
    link: {to: 'docs/cli', label: 'Lint a monorepo'},
  },
];

const Icon = ({children}) => (
  <svg
    className={styles.featureIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const features = [
  {
    title: 'Shareable config',
    content:
      "Shareable config allows you to create your own reusable module or consume someone else's module to enforce rules.",
    to: 'docs/configuration',
    icon: (
      <Icon>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </Icon>
    ),
  },
  {
    title: 'Nothing on by default',
    content: 'npm-package-json-lint does not have any rules enabled by default.',
    to: 'docs/rules',
    icon: (
      <Icon>
        <rect x="2" y="6" width="20" height="12" rx="6" />
        <circle cx="8" cy="12" r="2.5" />
      </Icon>
    ),
  },
  {
    title: 'Ignore support',
    content:
      'You might not want to lint all package.json files in your project. Ignore support allows you to easily specify what files to skip.',
    to: 'docs/ignore',
    icon: (
      <Icon>
        <path d="M9.9 4.2A9.7 9.7 0 0 1 12 4c7 0 10 8 10 8a17 17 0 0 1-2.2 3.4M6.6 6.6A17 17 0 0 0 2 12s3 8 10 8a9.7 9.7 0 0 0 5.4-1.6" />
        <path d="M14.1 14.1a3 3 0 0 1-4.2-4.2M2 2l20 20" />
      </Icon>
    ),
  },
  {
    title: 'Node.js API',
    content: "All of npm-package-json-lint's CLI functionality is also exposed via a Node.js API.",
    to: 'docs/api',
    icon: (
      <Icon>
        <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
      </Icon>
    ),
  },
];

const CopyButton = ({text}) => {
  const [copied, setCopied] = useState(false);

  const onClick = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      type="button"
      className={styles.copyButton}
      onClick={onClick}
      aria-label={copied ? 'Copied' : 'Copy install command'}
      title={copied ? 'Copied' : 'Copy'}
    >
      {copied ? (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
};

const Hero = ({title, tagline}) => (
  <header className={styles.hero}>
    <div className={clsx('container', styles.heroInner)}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Open source · MIT License
        </p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroTagline}>{tagline}</p>

        <div className={styles.install}>
          <span className={styles.installPrompt} aria-hidden="true">$</span>
          <code className={styles.installCommand}>{installCommand}</code>
          <CopyButton text={installCommand} />
        </div>

        <div className={styles.heroActions}>
          <Link className={clsx('button button--lg', styles.buttonPrimary)} to={useBaseUrl('docs')}>
            Get Started
          </Link>
          <Link
            className={clsx('button button--lg', styles.buttonGhost)}
            href="https://github.com/tclindner/npm-package-json-lint"
          >
            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            Star on GitHub
          </Link>
        </div>
      </div>

      <div className={styles.heroArt}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <img alt="npm-package-json-lint logo" className={styles.heroLogo} src={useBaseUrl('img/logo-dark.svg')} />
      </div>
    </div>
  </header>
);

const Demo = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Lint every package.json in seconds</h2>
        <p className={styles.sectionLead}>
          Pick the rules you care about, run the CLI, and get clear errors and warnings.
        </p>
      </div>

      <div className={styles.demo}>
        <div className={styles.window}>
          <div className={styles.windowBar}>
            <span />
            <span />
            <span />
            <p>.npmpackagejsonlintrc.json</p>
          </div>
          <pre className={styles.windowBody}>
            <code>
              {'{\n  '}
              <span className={styles.tKey}>"rules"</span>
              {': {\n    '}
              <span className={styles.tKey}>"require-license"</span>
              {': '}
              <span className={styles.tStr}>"error"</span>
              {',\n    '}
              <span className={styles.tKey}>"require-repository"</span>
              {': '}
              <span className={styles.tStr}>"error"</span>
              {',\n    '}
              <span className={styles.tKey}>"no-caret-version-dependencies"</span>
              {': '}
              <span className={styles.tStr}>"warning"</span>
              {'\n  }\n}'}
            </code>
          </pre>
        </div>

        <div className={styles.window}>
          <div className={styles.windowBar}>
            <span />
            <span />
            <span />
            <p>Terminal</p>
          </div>
          <pre className={styles.windowBody}>
            <code>
              <span className={styles.tMuted}>$ </span>npmPkgJsonLint .{'\n\n'}
              <span className={styles.tUnderline}>./package.json</span>
              {'\n'}
              <span className={styles.tError}>ERROR</span> <span className={styles.tId}>require-license</span>
              {' - node: '}
              <span className={styles.tNode}>license</span>
              {' - '}
              <span className={styles.tRed}>license is required</span>
              {'\n'}
              <span className={styles.tWarn}>WARNING</span> <span className={styles.tId}>no-caret-version-dependencies</span>
              {' - node: '}
              <span className={styles.tNode}>dependencies</span>
              {' - '}
              <span className={styles.tYellow}>Please do not use ^</span>
              {'\n'}
              <span className={styles.tRed}>1 error</span>
              {'\n'}
              <span className={styles.tYellow}>1 warning</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  </section>
);

const Highlights = () => (
  <section className={clsx(styles.section, styles.sectionAlt)}>
    <div className="container">
      <div className={styles.highlights}>
        {highlights.map(({imageUrl, title, content, link}) => (
          <div key={title} className={styles.highlight}>
            <div className={styles.highlightArt}>
              <img src={useBaseUrl(imageUrl)} alt="" loading="lazy" />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{content}</p>
              <Link className={styles.textLink} to={useBaseUrl(link.to)}>
                {link.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className={styles.section}>
    <div className="container">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Built to fit your workflow</h2>
        <p className={styles.sectionLead}>Over 120 rules, opt-in by design, and easy to run anywhere Node.js runs.</p>
      </div>
      <div className={styles.featureGrid}>
        {features.map(({title, content, icon, to}) => (
          <Link key={title} className={styles.featureCard} to={useBaseUrl(to)}>
            <div className={styles.featureIconWrap}>{icon}</div>
            <h3>{title}</h3>
            <p>{content}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const CallToAction = () => (
  <section className={clsx(styles.section, styles.ctaSection)}>
    <div className="container">
      <div className={styles.cta}>
        <div>
          <h2>Ready to tidy up your package.json files?</h2>
          <p>Check out the documentation to learn more.</p>
        </div>
        <Link className={clsx('button button--lg', styles.buttonLight)} to={useBaseUrl('docs')}>
          Read the docs <span aria-hidden="true">→</span>
        </Link>
      </div>
      <p className={styles.credits}>
        Graphic design by <a href="https://isakknivsland.com">Isak Knivsland</a>. Thanks for the great illustrations!
      </p>
    </div>
  </section>
);

const Index = () => {
  const {siteConfig = {}} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero title={siteConfig.title} tagline={siteConfig.tagline} />
      <main>
        <Demo />
        <Highlights />
        <Features />
        <CallToAction />
      </main>
    </Layout>
  );
};

export default Index;
