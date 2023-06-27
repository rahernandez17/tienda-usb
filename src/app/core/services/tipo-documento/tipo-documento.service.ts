import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoDocumento } from '../../interfaces/tipo-documento/tipo-documento.interface';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';

@Injectable({
  providedIn: 'root',
})
export class TipoDocumentoService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodos(): Observable<ListSimpleResponse<TipoDocumento>> {
    return this.httpClient.get<ListSimpleResponse<TipoDocumento>>(
      `${environment.urlServer}${UrlUtil.URL_TIPO_DOCUMENTO_OBTENER_TODOS}`
    );
  }
}
