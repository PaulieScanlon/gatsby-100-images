module.exports = {
  siteMetadata: {
    title: 'gatsby-100-images'
  },
  plugins: [
    'gatsby-plugin-image',
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
