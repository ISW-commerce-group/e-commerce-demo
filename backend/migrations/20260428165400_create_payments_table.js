/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('pagos', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('pedido_id').unsigned().notNullable();
    table.string('stripe_payment_id', 255).nullable().unique();
    table.string('paypal_order_id', 255).nullable().unique();
    table.enu('metodo', ['stripe', 'paypal', 'otro']).notNullable().defaultTo('stripe');
    table.enu('estado', ['pendiente', 'aprobado', 'fallido', 'reembolsado']).notNullable().defaultTo('pendiente');
    table.decimal('monto', 10, 2).notNullable();
    table.string('moneda', 3).notNullable().defaultTo('GTQ');
    table.timestamp('fecha_pago').nullable();
    table.json('metadata').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
 
    table.foreign('pedido_id').references('pedidos.id').onUpdate('CASCADE');
    table.index(['pedido_id']);
    table.index(['estado']);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('pagos');
};
