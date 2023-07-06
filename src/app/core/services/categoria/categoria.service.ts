import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Categoria,
  GuardaCategoriaRequest,
} from '../../interfaces/categoria/categoria.interface';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';
import { SimpleResponse } from '../../interfaces/simple-response.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodas(): Observable<ListSimpleResponse<Categoria>> {
    return this.httpClient.get<ListSimpleResponse<Categoria>>(
      `${environment.urlServer}${UrlUtil.URL_CATEGORIA_OBTENER_TODAS}`
    );
  }

  public buscarPorId(id: number): Observable<SimpleResponse<Categoria>> {
    return this.httpClient
      .get<SimpleResponse<Categoria>>(
        `${environment.urlServer}${UrlUtil.URL_CATEGORIA_BUSCAR_POR_ID.replace(
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
    categoria: GuardaCategoriaRequest
  ): Observable<SimpleResponse<Categoria>> {
    return this.httpClient
      .post<SimpleResponse<Categoria>>(
        `${environment.urlServer}${UrlUtil.URL_CATEGORIA_GUARDAR}`,
        categoria
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
    categoria: Categoria
  ): Observable<SimpleResponse<Categoria>> {
    return this.httpClient
      .put<SimpleResponse<Categoria>>(
        `${environment.urlServer}${UrlUtil.URL_CATEGORIA_ACTUALIZAR}`,
        categoria
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
