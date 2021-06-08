
exports.seed = async function(knex) {

  await knex('categories').del();
  const cat_ids = await knex('categories').insert([
    {displayName: 'Clothing', published_at: knex.fn.now()}, // 0
    {displayName: 'Shoes', published_at: knex.fn.now()}, // 1
    {displayName: 'Pants', published_at: knex.fn.now()}, // 2
    {displayName: 'Shirts', published_at: knex.fn.now()}, // 3
    {displayName: 'Socks', published_at: knex.fn.now()}, // 4
    {displayName: 'Dresses', published_at: knex.fn.now()}, // 5
    {displayName: 'Electronics', published_at: knex.fn.now()}, // 6
    {displayName: 'Laptops', published_at: knex.fn.now()}, // 7
    {displayName: 'Game Consoles', published_at: knex.fn.now()}, // 8
    {displayName: 'Components', published_at: knex.fn.now()}, // 9
    {displayName: 'Bed & Bath', published_at: knex.fn.now()}, // 10
    {displayName: 'Bedding', published_at: knex.fn.now()}, // 11
    {displayName: 'Bath & Towels', published_at: knex.fn.now()}, // 12
    {displayName: 'Pillows', published_at: knex.fn.now()}, // 13
    {displayName: 'Mattresses', published_at: knex.fn.now()}, // 14
  ])
    .returning('id');

  await knex('categories__sub_categories').del()
    .then(function () {
      return knex('categories__sub_categories').insert([
        {category_id: cat_ids[0], related_category_id: cat_ids[1]},
        {category_id: cat_ids[0], related_category_id: cat_ids[2]},
        {category_id: cat_ids[0], related_category_id: cat_ids[3]},
        {category_id: cat_ids[0], related_category_id: cat_ids[4]},
        {category_id: cat_ids[0], related_category_id: cat_ids[5]},
        {category_id: cat_ids[6], related_category_id: cat_ids[7]},
        {category_id: cat_ids[6], related_category_id: cat_ids[8]},
        {category_id: cat_ids[6], related_category_id: cat_ids[9]},
        {category_id: cat_ids[10], related_category_id: cat_ids[11]},
        {category_id: cat_ids[10], related_category_id: cat_ids[12]},
        {category_id: cat_ids[10], related_category_id: cat_ids[13]},
        {category_id: cat_ids[10], related_category_id: cat_ids[14]},
      ])
    });

  const nav_bar_id = await knex('nav_bars').del()
    .then(function () {
      return knex('nav_bars').insert({
        published_at: knex.fn.now()
      })
        .returning('id')
    });

  await knex('nav_bars__categories').del()
    .then(function () {
      return knex('nav_bars__categories').insert([
        {nav_bar_id: parseInt(nav_bar_id), category_id: cat_ids[0]},
        {nav_bar_id: parseInt(nav_bar_id), category_id: cat_ids[6]},
        {nav_bar_id: parseInt(nav_bar_id), category_id: cat_ids[10]},
      ])
    });
};
