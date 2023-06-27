import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoPedido } from '../../interfaces/estado-pedido/estado-pedido.interface';
import { ListSimpleResponse } from '../../interfaces/list-simple-response.interface';
import { environment } from 'src/environment/environment';
import { UrlUtil } from '../../utils/url.util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstadoPedidoService {
  constructor(private readonly httpClient: HttpClient) {}

  public obtenerTodos(): Observable<ListSimpleResponse<EstadoPedido>> {
    return this.httpClient.get<ListSimpleResponse<EstadoPedido>>(
      `${environment.urlServer}${UrlUtil.URL_ESTADO_PEDIDO_OBTENER_TODOS}`
    );
  }
}
