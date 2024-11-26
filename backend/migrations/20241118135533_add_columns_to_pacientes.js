/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('pacientes', (table) => {
    table.string('cpf').notNullable().unique(); 
    table.string('genero').notNullable(); 
    table.date('data_nascimento').notNullable();
    table.string('telefone');
    table.string('responsavel'); 
    table.string('telefone_responsavel'); 
    table.string('endereco'); 
    table.string('cep'); 
    table.string('cidade'); 
    table.string('estado'); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('pacientes', (table) => {
    table.dropColumns(
      'cpf',
      'genero',
      'data_nascimento',
      'telefone',
      'responsavel',
      'telefone_responsavel',
      'endereco',
      'cep',
      'cidade',
      'estado'
    );
  });
};
