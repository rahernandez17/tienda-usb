export interface Pedido {
  id: number;
  fecha: string;
  total: number;
  clienteId: number;
  nombresCliente: string;
  apellidosCliente: string;
  estadoPedidoId: number;
  descripcionEstadoPedido: string;
}

export type GuardaPedidoRequest = Omit<
  Pedido,
  'id' | 'nombresCliente' | 'apellidosCliente' | 'descripcionEstadoPedido'
>;

export type ActualizaPedidoRequest = Omit<
  Pedido,
  'nombresCliente' | 'apellidosCliente' | 'descripcionEstadoPedido'
>;
