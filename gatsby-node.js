const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach((edge) => {
    const { node } = edge;
    createPage({
      path: `/content/${node.id}`,
      component: path.resolve(`src/templates/content-template.js`),
      context: {
        id: node.id
      },
      defer: true
    });
  });
};
