export interface Producto {
  id: number;
  referencia: string;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  unidadesDisponibles: number;
  categoriaId: number;
  nombreCategoria: string;
}

export type GuardaProductoRequest = Omit<Producto, 'id' | 'nombreCategoria'>;

export type ActualizaProductoRequest = Omit<Producto, 'nombreCategoria'>;
