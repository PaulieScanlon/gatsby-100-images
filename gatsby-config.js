module.exports = {
  siteMetadata: {
    title: 'gatsby-100-images'
  },
  plugins: [
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-gatsby-cloud'
  ]
};
