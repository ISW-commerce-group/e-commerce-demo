/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('resenas', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('producto_id').unsigned().notNullable();
    table.integer('usuario_id').unsigned().notNullable();
    table.integer('pedido_id').unsigned().notNullable();
    table.tinyint('calificacion').unsigned().notNullable();
    table.text('comentario').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
 
    table.unique(['pedido_id', 'producto_id', 'usuario_id']);
    table.foreign('producto_id').references('productos.id').onUpdate('CASCADE');
    table.foreign('usuario_id').references('usuarios.id').onUpdate('CASCADE');
    table.foreign('pedido_id').references('pedidos.id').onUpdate('CASCADE');
    table.index(['producto_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('resenas');
};
