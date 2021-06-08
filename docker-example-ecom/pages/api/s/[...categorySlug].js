import { subcategory } from 'react-storefront-connector'
import {fetchCategory, fetchNavBarTabs} from "../../../lib/api";

export default async function plp(req, res) {
  // Note: the structure of the query string is controlled by the queryForState prop passed
  // to SearchResultsProvider in pages/s/[...categorySlug].js.
  const { q, categorySlug: slug, page, sort, _includeAppData, ...others } = req.query
  const filters = []

  for (let [key, values] of Object.entries(others)) {
    for (let value of values.split(',')) {
      filters.push(`${key}:${value}`)
    }
  }

  const [categoryPage, category, tabs] = await Promise.all([
    subcategory({
      q,
      slug,
      page,
      filters: JSON.stringify(filters),
      sort,
    },
    req,
    res),
    fetchCategory(slug[0]),
    fetchNavBarTabs()
  ])

  res.json(
    {
      ...categoryPage,
      pageData: {
        ...categoryPage.pageData,
        name: category.displayName,
        title: category.displayName
      },
      appData: {
        ...categoryPage.appData,
        tabs
      }
    }
  )
}
