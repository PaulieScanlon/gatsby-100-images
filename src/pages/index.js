import React from 'react';
import { graphql, Link } from 'gatsby';

const Page = ({
  data: {
    allMarkdownRemark: { edges }
  }
}) => {
  return (
    <main>
      <h1>Gatsby 100 Images</h1>
      <ul>
        {edges.map((edge, index) => {
          const {
            node: { id }
          } = edge;

          return (
            <li key={index}>
              <Link to={`/content/${id}`}>{`${index + 1} : ${id}`}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export default Page;
