// migrations/YYYYMMDDHHMMSS_create_posts_table.js
exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.string('content').notNullable(); // Texto del post o descripción de la imagen
    table.string('image_url'); // URL de la imagen si es un post con imagen
    table.enum('post_type', ['text', 'image']).notNullable().defaultTo('text'); // Tipo de post: texto o imagen
    table.integer('likes_count').defaultTo(0); // Contador de likes
    table.timestamps(true, true); // created_at y updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts');
};
