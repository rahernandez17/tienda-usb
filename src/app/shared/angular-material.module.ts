import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatMenuModule],
  exports: [MatTableModule, MatButtonModule, MatIconModule, MatMenuModule],
})
export class AngularMaterialModule {}
