import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/core/interfaces/cliente/cliente.interface';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.scss'],
})
export class VerClientesComponent implements OnInit {
  private readonly destroy$: Subject<any> = new Subject();

  cliente!: Cliente;

  constructor(
    private readonly clienteService: ClienteService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { clienteId: number }
  ) {}

  ngOnInit(): void {
    this.verDetalle(this.data.clienteId);
  }

  verDetalle(clienteId: number): void {
    this.clienteService
      .buscarPorId(clienteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => (this.cliente = response.valor),
      });
  }
}
