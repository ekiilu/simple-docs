module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Simple Doc Site",
  },
  plugins: [
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `repo-one`,
        remote: `https://github.com/reselbob/pbByteAnalyzer.git`,
        branch: `main`,
        local: `${__dirname}/git/pbByteAnalyzer`,
        // Only import the docs folder from a codebase.
        patterns: `helpers/**/*.js`
      }
    },
    "gatsby-transformer-documentationjs",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `source`,
        path: `${__dirname}/git/pbByteAnalyzer`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};