exports.up = function(knex) {
    return knex.schema.createTable('friends', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('friend_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.enu('status', ['pending', 'accepted', 'rejected']).defaultTo('pending');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('friends');
  };
  