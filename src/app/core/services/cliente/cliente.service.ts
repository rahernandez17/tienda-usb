import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import {
  ActualizaClienteRequest,
  Cliente,
  GuardaClienteRequest,
} from '../../interfaces/cliente/cliente.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';
import { SimpleResponse } from '../../interfaces/simple-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodos(): Observable<ListSimpleResponse<Cliente>> {
    return this.httpClient.get<ListSimpleResponse<Cliente>>(
      `${environment.urlServer}${UrlUtil.URL_CLIENTE_OBTENER_TODOS}`
    );
  }

  public buscarPorId(id: number): Observable<SimpleResponse<Cliente>> {
    return this.httpClient
      .get<SimpleResponse<Cliente>>(
        `${environment.urlServer}${UrlUtil.URL_CLIENTE_BUSCAR_POR_ID.replace(
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
    producto: GuardaClienteRequest
  ): Observable<SimpleResponse<Cliente>> {
    return this.httpClient
      .post<SimpleResponse<Cliente>>(
        `${environment.urlServer}${UrlUtil.URL_CLIENTE_GUARDAR}`,
        producto
      )
      .pipe(
        catchError((error) =>
          throwError(() => error.error as SimpleResponse<any>)
        )
      );
  }

  public actualizar(
    producto: ActualizaClienteRequest
  ): Observable<SimpleResponse<Cliente>> {
    return this.httpClient
      .put<SimpleResponse<Cliente>>(
        `${environment.urlServer}${UrlUtil.URL_CLIENTE_ACTUALIZAR}`,
        producto
      )
      .pipe(
        catchError((error) =>
          throwError(() => error.error as SimpleResponse<any>)
        )
      );
  }
}
