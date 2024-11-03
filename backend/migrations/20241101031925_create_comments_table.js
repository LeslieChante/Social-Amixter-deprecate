// migrations/YYYYMMDD_create_comments_table.js
exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
      table.increments('id').primary();
      table.integer('post_id').unsigned().references('id').inTable('posts').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.text('content').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('comments');
  };
  