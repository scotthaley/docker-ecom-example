async function fetchAPI(resource, filters) {
  const filterString = filters
    ? Object.keys(filters).reduce((acc, cur) => {
      if (Array.isArray(filters[cur])) {
        return `${acc}${filters[cur].map(v => `${cur}=${v}&`).join('')}`;
      }
      return `${acc}${cur}=${filters[cur]}&`
    }, '')
    : ''

  const host = process.env.NEXT_PUBLIC_STRAPI_API_URL

  const res = await fetch(`${host}/${resource}?${filterString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API')
  }

  return json
}

export async function fetchCategories() {
  return fetchAPI('categories')
}

export async function fetchCategory(id) {
  return fetchAPI(`categories/${id}`)
}

export async function fetchNavBar() {
  return fetchAPI('nav-bar')
}

export async function fetchNavBarTabs() {
  const [navBar, categories] = await Promise.all([fetchNavBar(), fetchCategories()])

  return navBar.categories.map(c => ({
    as: `/s/${c.id}`,
    href: `/s/${c.id}`,
    text: c.displayName,
    items: categories.find(cat => cat.id === c.id).sub_categories.map(subCat => ({
      as: `/s/${subCat.id}`,
      href: `/s/${subCat.id}`,
      text: subCat.displayName
    }))
  }))
}
