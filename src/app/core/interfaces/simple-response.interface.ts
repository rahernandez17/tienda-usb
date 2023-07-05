export interface SimpleResponse<T> {
  codigo: number;
  mensaje: string;
  valor: T;
  errores: Record<string, string>;
}
