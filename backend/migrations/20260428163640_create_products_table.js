/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('categorias', (table) => {
    table.increments('id').unsigned().primary();
    table.string('nombre', 100).notNullable().unique();
    table.text('descripcion').nullable();
    table.string('imagen_url', 255).nullable();
    table.boolean('activo').notNullable().defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('productos', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('categoria_id').unsigned().notNullable();
    table.string('nombre', 150).notNullable();
    table.text('descripcion').nullable();
    table.decimal('precio', 10, 2).notNullable();
    table.string('imagen_url', 255).nullable();
    table.integer('stock').unsigned().notNullable().defaultTo(0);
    table.integer('stock_minimo').unsigned().notNullable().defaultTo(5);
    table.boolean('activo').notNullable().defaultTo(true);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.foreign('categoria_id').references('categorias.id').onUpdate('CASCADE');
    table.index(['categoria_id']);
    table.index(['activo']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('productos');
  await knex.schema.dropTableIfExists('categorias');
};
