// migrations/[timestamp]_create_user_photos_table.js
exports.up = function (knex) {
    return knex.schema.createTable('user_photos', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('photo_url').notNullable(); // Ruta o nombre del archivo
      table.boolean('is_profile').defaultTo(false); // Indica si es la foto de perfil actual
      table.timestamp('uploaded_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user_photos');
  };
  