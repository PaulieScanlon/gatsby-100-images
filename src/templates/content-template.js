import React from 'react';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Page = ({
  data: {
    markdownRemark: {
      id,
      frontmatter: { date, author, image },
      rawMarkdownBody
    }
  }
}) => {
  return (
    <main>
      <Link to="/">Back</Link>
      <h1>{date}</h1>
      <h2>{author}</h2>
      <GatsbyImage image={getImage(image)} alt={id} />
      <p>{rawMarkdownBody}</p>
    </main>
  );
};

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date
        author
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      rawMarkdownBody
    }
  }
`;

export default Page;
