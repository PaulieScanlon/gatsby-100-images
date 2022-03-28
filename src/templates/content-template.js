import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

const Page = ({
  data: {
    markdownRemark: {
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
      <Img fluid={image.childImageSharp.fluid} />
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
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      rawMarkdownBody
    }
  }
`;

export default Page;
