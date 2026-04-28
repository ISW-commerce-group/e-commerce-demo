/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('usuarios', (table) => {
    table.increments('id').unsigned().primary();
    table.integer('rol_id').unsigned().notNullable();
    table.string('nombre', 100).notNullable();
    table.string('apellido', 100).notNullable();
    table.string('email', 150).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.string('telefono', 20).nullable();
    table.enu('tipo_cliente', ['B2C', 'B2B']).notNullable().defaultTo('B2C');
    table.string('empresa', 150).nullable();
    table.string('nit', 50).nullable();
    table.boolean('activo').notNullable().defaultTo(true);
    table.string('refresh_token', 500).nullable(); // almacena el refresh token activo
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ));
    table.foreign('rol_id').references('roles.id').onUpdate('CASCADE');
    table.index(['email']);
    table.index(['rol_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('usuarios');
};
