/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('hospitais', table => {
    table.string('cnpj').notNullable(); 
    table.string('phone').notNullable(); 
    table.string('postal_code').notNullable(); 
    table.string('city').notNullable(); 
    table.string('state').notNullable(); 
    table.string('treatment').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('hospitais', table => {
    table.dropColumn('cnpj');
    table.dropColumn('phone');
    table.dropColumn('postal_code');
    table.dropColumn('city');
    table.dropColumn('state');
    table.dropColumn('treatment');
  });
};
