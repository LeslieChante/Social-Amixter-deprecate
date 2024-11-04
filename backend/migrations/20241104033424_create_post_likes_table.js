exports.up = function(knex) {
    return knex.schema.createTable('post_likes', (table) => {
      table.increments('id').primary();
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.unique(['post_id', 'user_id']); // Asegura que un usuario solo pueda dar like una vez a un post
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('post_likes');
  };
  