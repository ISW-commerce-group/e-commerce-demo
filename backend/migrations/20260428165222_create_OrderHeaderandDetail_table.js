/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('pedidos', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('usuario_id').unsigned().notNullable();
    table.integer('repartidor_id').unsigned().nullable();
    table.string('codigo_pedido', 20).notNullable().unique();
    table.enu('tipo_entrega', ['delivery', 'pickup']).notNullable();
    table.enu('estado', [
      'pendiente', 'confirmado', 'preparando',
      'en_camino', 'listo_pickup', 'entregado', 'cancelado',
    ]).notNullable().defaultTo('pendiente');
    table.decimal('subtotal', 10, 2).notNullable();
    table.decimal('costo_envio', 10, 2).notNullable().defaultTo(0.00);
    table.decimal('total', 10, 2).notNullable();
    table.date('fecha_entrega').notNullable();
    table.text('notas').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
 
    table.foreign('usuario_id').references('usuarios.id').onUpdate('CASCADE');
    table.foreign('repartidor_id').references('usuarios.id').onUpdate('CASCADE').onDelete('SET NULL');
    table.index(['usuario_id']);
    table.index(['estado']);
    table.index(['fecha_entrega']);
  });
 
  await knex.schema.createTable('detalle_pedidos', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('pedido_id').unsigned().notNullable();
    table.integer('producto_id').unsigned().notNullable();
    table.integer('cantidad').unsigned().notNullable();
    table.decimal('precio_unitario', 10, 2).notNullable();
    table.decimal('subtotal', 10, 2).notNullable();
 
    table.foreign('pedido_id').references('pedidos.id').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('producto_id').references('productos.id').onUpdate('CASCADE');
    table.index(['pedido_id']);
  });
 
  await knex.schema.createTable('direcciones_entrega', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('pedido_id').unsigned().notNullable().unique();
    table.string('destinatario', 150).notNullable();
    table.string('telefono', 20).notNullable();
    table.string('direccion', 255).notNullable();
    table.string('ciudad', 100).notNullable();
    table.string('departamento', 100).nullable();
    table.text('referencia').nullable();
    table.text('instrucciones').nullable();
 
    table.foreign('pedido_id').references('pedidos.id').onUpdate('CASCADE').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('direcciones_entrega');
    await knex.schema.dropTableIfExists('detalle_pedidos');
    await knex.schema.dropTableIfExists('pedidos');
};

