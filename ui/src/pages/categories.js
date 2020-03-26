/** @jsx jsx */
import { Styled, jsx, Box } from 'theme-ui'
import { useQuery } from '@apollo/react-hooks'

import { CATEGORIES_QUERY } from '../utils/apollo/queries'
import Section from '../components/Section'

const Categories = () => {
  const { loading, data, error } = useQuery(CATEGORIES_QUERY, {
    variables: { parentCategory: null },
  })

  if (loading) {
    // TODO: add loading indicator
    return <div />
  }

  if (error) {
    console.error('Error getting categories: ', error)
    return <div />
  }

  const projectsCount = cat => {
    let count = 0
    if (cat.projects) {
      count += cat.projects.length
    }
    if (cat.subcategories) {
      cat.subcategories.forEach(subcat =>
        subcat.projects ? (count += subcat.projects.length) : count,
      )
    }
    return `${count} projects`
  }

  return (
    <Box>
      <Box>
        <Styled.h2>Categories</Styled.h2>
        <Styled.p sx={{ opacity: 0.64, color: 'rgba(9,6,16,0.5)' }}>
          {data && data.categories.length} Categories
        </Styled.p>
      </Box>
      <Section
        items={
          data &&
          data.categories.map(cat => {
            return {
              name: cat.name,
              description: projectsCount(cat),
              image: `${window.__GATSBY_IPFS_PATH_PREFIX__ || ''}/cats/${
                cat.id
              }.png`,
              to: `/category/${cat.id}`,
            }
          })
        }
        variant="category"
      />
    </Box>
  )
}

export default Categories
