/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('pacientes', (table) => {
    table.dropForeign('medico_id');
    table.dropColumn('medico_id');

    table.integer('profissional_id').unsigned().references('id').inTable('profissionais').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('pacientes', (table) => {
    table.dropForeign('profissional_id');
    table.dropColumn('profissional_id');
    
    table.integer('medico_id').unsigned().references('id').inTable('medicos').onDelete('CASCADE');
  });
};
