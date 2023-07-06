import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActualizaDetallePedidoRequest,
  DetallePedido,
  GuardaDetallePedidoRequest,
} from '../../interfaces/detalle-pedido/detalle-pedido.interface';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import { SimpleResponse } from '../../interfaces/simple-response.interface';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetallePedidoService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodos(): Observable<ListSimpleResponse<DetallePedido>> {
    return this.httpClient.get<ListSimpleResponse<DetallePedido>>(
      `${environment.urlServer}${UrlUtil.URL_DETALLE_PEDIDO_OBTENER_TODOS}`
    );
  }

  public buscarPorId(id: number): Observable<SimpleResponse<DetallePedido>> {
    return this.httpClient
      .get<SimpleResponse<DetallePedido>>(
        `${
          environment.urlServer
        }${UrlUtil.URL_DETALLE_PEDIDO_BUSCAR_POR_ID.replace(
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
    pedido: GuardaDetallePedidoRequest
  ): Observable<SimpleResponse<DetallePedido>> {
    return this.httpClient
      .post<SimpleResponse<DetallePedido>>(
        `${environment.urlServer}${UrlUtil.URL_DETALLE_PEDIDO_GUARDAR}`,
        pedido
      )
      .pipe(
        catchError((error) =>
          throwError(() => {
            const respuesta = error.error as SimpleResponse<any>;
            const erroresValidacion: string = Array.from(
              Object.values(respuesta?.errores ?? {})
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
    pedido: ActualizaDetallePedidoRequest
  ): Observable<SimpleResponse<DetallePedido>> {
    return this.httpClient
      .put<SimpleResponse<DetallePedido>>(
        `${environment.urlServer}${UrlUtil.URL_DETALLE_PEDIDO_ACTUALIZAR}`,
        pedido
      )
      .pipe(
        catchError((error) =>
          throwError(() => {
            const respuesta = error.error as SimpleResponse<any>;
            const erroresValidacion: string = Array.from(
              Object.values(respuesta?.errores ?? {})
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
