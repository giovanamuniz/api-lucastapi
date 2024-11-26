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
    return knex.schema.table('funcionarios', function(table) {
      table.string('telefone'); // Adiciona a coluna de telefone
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('funcionarios', function(table) {
      table.dropColumn('telefone'); // Remove a coluna se necessário
    });
  };