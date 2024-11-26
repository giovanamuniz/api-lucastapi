/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.renameTable('medicos', 'profissionais').then(() => {
    return knex.schema.alterTable('profissionais', (table) => {
      table.string('cpf_cnpj').notNullable();
      table.string('telefone').notNullable();
      table.string('endereco').notNullable();
      table.string('cep').notNullable();
      table.string('cidade').notNullable();
      table.string('estado').notNullable();
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('profissionais', (table) => {
    table.dropColumn('cpf_cnpj');
    table.dropColumn('telefone');
    table.dropColumn('endereco');
    table.dropColumn('cep');
    table.dropColumn('cidade');
    table.dropColumn('estado');
  }).then(() => {
    return knex.schema.renameTable('profissionais', 'medicos');
  });
};
