import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import {
  ActualizaPedidoRequest,
  GuardaPedidoRequest,
  Pedido,
} from '../../interfaces/pedido/pedido.interface';
import { SimpleResponse } from '../../interfaces/simple-response.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodos(): Observable<ListSimpleResponse<Pedido>> {
    return this.httpClient.get<ListSimpleResponse<Pedido>>(
      `${environment.urlServer}${UrlUtil.URL_PEDIDO_OBTENER_TODOS}`
    );
  }

  public buscarPorId(id: number): Observable<SimpleResponse<Pedido>> {
    return this.httpClient
      .get<SimpleResponse<Pedido>>(
        `${environment.urlServer}${UrlUtil.URL_PEDIDO_BUSCAR_POR_ID.replace(
          '{id}',
          id.toString()
        )}`
      )
      .pipe(
        catchError((error) =>
          throwError(() => error.error as SimpleResponse<any>)
        )
      );
  }

  public guardar(
    pedido: GuardaPedidoRequest
  ): Observable<SimpleResponse<Pedido>> {
    return this.httpClient
      .post<SimpleResponse<Pedido>>(
        `${environment.urlServer}${UrlUtil.URL_PEDIDO_GUARDAR}`,
        pedido
      )
      .pipe(
        catchError((error) =>
          throwError(() => {
            const respuesta = error.error as SimpleResponse<any>;
            const erroresValidacion: string = Array.from(
              Object.values(respuesta.errores)
            ).join('\n');

            return {
              ...respuesta,
              mensaje: `${respuesta.mensaje ?? ''}${erroresValidacion ?? ''}`,
            } as SimpleResponse<any>;
          })
        )
      );
  }

  public actualizar(
    pedido: ActualizaPedidoRequest
  ): Observable<SimpleResponse<Pedido>> {
    return this.httpClient
      .put<SimpleResponse<Pedido>>(
        `${environment.urlServer}${UrlUtil.URL_PEDIDO_ACTUALIZAR}`,
        pedido
      )
      .pipe(
        catchError((error) =>
          throwError(() => {
            const respuesta = error.error as SimpleResponse<any>;
            const erroresValidacion: string = Array.from(
              Object.values(respuesta.errores)
            ).join('\n');

            return {
              ...respuesta,
              mensaje: `${respuesta.mensaje ?? ''}${erroresValidacion ?? ''}`,
            } as SimpleResponse<any>;
          })
        )
      );
  }
}
