
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

exports.up = function(knex) {
    return Promise.all([
      knex.schema.createTable('funcionarios', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('email').notNullable().unique();
        table.string('senha').notNullable();
      }),
      knex.schema.createTable('pacientes', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('hospital_id').unsigned().references('id').inTable('hospitais');
        table.integer('medico_id').unsigned().references('id').inTable('medicos');
      }),
      knex.schema.createTable('medicos', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('especialidade').notNullable();
      }),
      knex.schema.createTable('hospitais', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('endereco').notNullable();
      }),
    ]);
  };
  
  exports.down = function(knex) {
    return Promise.all([
      knex.schema.dropTableIfExists('funcionarios'),
      knex.schema.dropTableIfExists('pacientes'),
      knex.schema.dropTableIfExists('profissionais'),
      knex.schema.dropTableIfExists('hospitais'),
    ]);
  };