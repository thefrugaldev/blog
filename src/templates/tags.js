import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
//Components
import Articles from "../components/articles"
import Layout from "../components/layout"

const Tags = ({ data }) => {
  const {
    allMarkdownRemark: { edges },
  } = data

  return (
    <Layout location={data.location}>
      <Articles posts={edges} />
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
      }).isRequired
    ),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, published: { eq: true } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
            path
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            unsplash_image_id
          }
        }
      }
    }
  }
`
