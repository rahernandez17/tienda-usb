export interface DetallePedido {
  id: number;
  cantidad: number;
  valor: number;
  pedidoId: number;
  productoId: number;
  nombreProducto: string;
}

export type GuardaDetallePedidoRequest = Omit<
  DetallePedido,
  'id' | 'nombreProducto'
>;

export type ActualizaDetallePedidoRequest = Omit<
  DetallePedido,
  'nombreProducto'
>;
