export interface Cliente {
  id: number;
  nombres: string;
  apellidos: string;
  documento: string;
  estado: string;
  tipoDocumentoId: number;
  descripcionTipoDocumento: string;
}

export type GuardaClienteRequest = Omit<
  Cliente,
  'id' | 'descripcionTipoDocumento'
>;

export type ActualizaClienteRequest = Omit<Cliente, 'descripcionTipoDocumento'>;
