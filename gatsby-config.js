module.exports = {
  siteMetadata: {
    title: 'gatsby-100-images'
  },
  plugins: [
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`
      }
    },
    'gatsby-transformer-remark'
  ]
};
