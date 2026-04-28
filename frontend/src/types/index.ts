// ── Enums ────────────────────────────────────────────────────
export type RolNombre = 'admin' | 'vendedor' | 'repartidor' | 'cliente';
export type TipoCliente = 'B2C' | 'B2B';
export type TipoEntrega = 'delivery' | 'pickup';
export type EstadoPedido = 'pendiente' | 'confirmado' | 'preparando' | 'en_camino' | 'listo_pickup' | 'entregado' | 'cancelado';
export type EstadoPago = 'pendiente' | 'aprobado' | 'fallido' | 'reembolsado';
export type MetodoPago = 'stripe' | 'paypal' | 'otro';
export type TipoMovimiento = 'entrada' | 'salida' | 'ajuste';

// ── Entidades ─────────────────────────────────────────────────
export interface Rol {
  id: number;
  nombre: RolNombre;
  descripcion?: string;
  created_at: Date;
}

export interface Usuario {
  id: number;
  rol_id: number;
  nombre: string;
  apellido: string;
  email: string;
  password_hash: string;
  telefono?: string;
  tipo_cliente: TipoCliente;
  empresa?: string;
  nit?: string;
  activo: boolean;
  refresh_token?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
  imagen_url?: string;
  activo: boolean;
  created_at: Date;
}

export interface Producto {
  id: number;
  categoria_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  stock: number;
  stock_minimo: number;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Pedido {
  id: number;
  usuario_id: number;
  repartidor_id?: number;
  codigo_pedido: string;
  tipo_entrega: TipoEntrega;
  estado: EstadoPedido;
  subtotal: number;
  costo_envio: number;
  total: number;
  fecha_entrega: Date;
  notas?: string;
  created_at: Date;
  updated_at: Date;
}

export interface DetallePedido {
  id: number;
  pedido_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
}

export interface DireccionEntrega {
  id: number;
  pedido_id: number;
  destinatario: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  departamento?: string;
  referencia?: string;
  instrucciones?: string;
}

export interface Pago {
  id: number;
  pedido_id: number;
  stripe_payment_id?: string;
  paypal_order_id?: string;
  metodo: MetodoPago;
  estado: EstadoPago;
  monto: number;
  moneda: string;
  fecha_pago?: Date;
  metadata?: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

// ── DTOs de Request ───────────────────────────────────────────
export interface RegisterDTO {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
  tipo_cliente?: TipoCliente;
  empresa?: string;
  nit?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateProductoDTO {
  categoria_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen_url?: string;
  stock?: number;
  stock_minimo?: number;
}

export type UpdateProductoDTO = Partial<CreateProductoDTO>;

export interface CreatePedidoDTO {
  tipo_entrega: TipoEntrega;
  fecha_entrega: string; // ISO date string
  notas?: string;
  items: { producto_id: number; cantidad: number }[];
  direccion?: {
    destinatario: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    departamento?: string;
    referencia?: string;
    instrucciones?: string;
  };
}

export interface CreatePagoDTO {
  pedido_id: number;
  stripe_payment_id?: string;
  paypal_order_id?: string;
  metodo: MetodoPago;
  monto: number;
  moneda?: string;
}

// ── JWT Payload ───────────────────────────────────────────────
export interface JwtPayload {
  sub: number;       // usuario.id
  email: string;
  rol: RolNombre;
  iat?: number;
  exp?: number;
}

// ── Respuesta API estándar ────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}