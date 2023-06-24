import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../../interfaces/categoria/categoria.interface';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';

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
}
