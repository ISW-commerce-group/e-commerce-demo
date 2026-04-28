/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('roles', (table) => {
    table.increments('id').unsigned().primary();
    table.string('nombre', 50).notNullable().unique();
    table.text('descripcion').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
  // Seed inicial de roles
  await knex('roles').insert([
    { nombre: 'admin',      descripcion: 'Acceso total al sistema' },
    { nombre: 'vendedor',   descripcion: 'Gestión de pedidos y catálogo' },
    { nombre: 'repartidor', descripcion: 'Visualización y actualización de entregas' },
    { nombre: 'cliente',    descripcion: 'Compra de productos en el ecommerce' },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('roles');
};
