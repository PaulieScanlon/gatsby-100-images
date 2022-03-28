const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const matter = require('gray-matter');
const probe = require('probe-image-size');

const {
  polyfillImageServiceDevRoutes,
  addRemoteFilePolyfillInterface
} = require('gatsby-plugin-utils/polyfill-remote-file');

exports.onCreateDevServer = ({ app }) => {
  polyfillImageServiceDevRoutes(app);
};

const RAW_GITHUB_URL = 'https://raw.githubusercontent.com/PaulieScanlon/gatsby-100-images/main/content/';

exports.createSchemaCustomization = ({ actions, actions: { createTypes }, schema }) => {
  createTypes([
    'type MarkdownRemark implements Node { frontmatter: Frontmatter }',
    `type Frontmatter {
      image: MediaAsset @link(from: "image", by: "filename")
    }`,
    addRemoteFilePolyfillInterface(
      schema.buildObjectType({
        name: 'MediaAsset',
        fields: {},
        interfaces: ['Node', 'RemoteFile'],
        extensions: {
          infer: false
        }
      }),
      {
        schema,
        actions
      }
    )
  ]);
};

exports.onCreateNode = async ({ node, actions: { createNode }, createNodeId, createContentDigest }) => {
  if (node.internal.mediaType === 'text/markdown') {
    const grayMatter = await matter(node.internal.content);

    const image = await probe(`${RAW_GITHUB_URL}${node.relativeDirectory}/${grayMatter.data.image}`);

    createNode({
      url: image.url,
      mimeType: image.mime,
      width: image.width,
      height: image.height,
      filename: grayMatter.data.image,
      id: createNodeId(image.url),
      children: [],
      internal: {
        type: 'MediaAsset',
        contentDigest: createContentDigest(String(image.length))
      }
    });
  }
};

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
