import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import {
  ActualizaProductoRequest,
  GuardaProductoRequest,
  Producto,
} from '../../interfaces/producto/producto.interface';
import { UrlUtil } from '../../utils/url.util';
import { environment } from 'src/environment/environment';
import { SimpleResponse } from '../../interfaces/simple-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodos(): Observable<ListSimpleResponse<Producto>> {
    return this.httpClient.get<ListSimpleResponse<Producto>>(
      `${environment.urlServer}${UrlUtil.URL_PRODUCTO_OBTENER_TODOS}`
    );
  }

  public buscarPorId(id: number): Observable<SimpleResponse<Producto>> {
    return this.httpClient
      .get<SimpleResponse<Producto>>(
        `${environment.urlServer}${UrlUtil.URL_PRODUCTO_BUSCAR_POR_ID.replace(
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
    producto: GuardaProductoRequest
  ): Observable<SimpleResponse<Producto>> {
    return this.httpClient
      .post<SimpleResponse<Producto>>(
        `${environment.urlServer}${UrlUtil.URL_PRODUCTO_GUARDAR}`,
        producto
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
    producto: ActualizaProductoRequest
  ): Observable<SimpleResponse<Producto>> {
    return this.httpClient
      .put<SimpleResponse<Producto>>(
        `${environment.urlServer}${UrlUtil.URL_PRODUCTO_ACTUALIZAR}`,
        producto
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
