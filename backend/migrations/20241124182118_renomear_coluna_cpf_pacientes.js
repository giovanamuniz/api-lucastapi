/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('pacientes', function(table) {
    table.renameColumn('cpf_errado', 'cpf');
});
;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('pacientes', function(table) {
    table.renameColumn('cpf', 'cpf_errado');
})
};
