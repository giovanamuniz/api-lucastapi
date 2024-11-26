/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('agendamentos', table => {
    table.increments('id').primary();
    table.date('data').notNullable();
    table.time('horario').notNullable();
    table.string('tipo').notNullable();
    table.integer('paciente_id').unsigned().references('id').inTable('pacientes');
    table.integer('profissional_id').unsigned().references('id').inTable('profissionais');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('agendamentos');
};
