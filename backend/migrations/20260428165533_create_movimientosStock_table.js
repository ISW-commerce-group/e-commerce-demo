/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('movimientos_stock', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('producto_id').unsigned().notNullable();
    table.integer('usuario_id').unsigned().notNullable();
    table.enu('tipo', ['entrada', 'salida', 'ajuste']).notNullable();
    table.integer('cantidad').notNullable();
    table.integer('stock_anterior').unsigned().notNullable();
    table.integer('stock_nuevo').unsigned().notNullable();
    table.string('motivo', 255).nullable();
    table.integer('referencia_id').unsigned().nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
 
    table.foreign('producto_id').references('productos.id').onUpdate('CASCADE');
    table.foreign('usuario_id').references('usuarios.id').onUpdate('CASCADE');
    table.index(['producto_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('movimientos_stock');
};
