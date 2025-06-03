import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-catalogo-general',
  templateUrl: './catalogo-general.component.html',
  styleUrls: ['./catalogo-general.component.css']
})
export class CatalogoGeneralComponent implements OnInit {
  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.obtenerTodos().subscribe({
      next: res => this.productos = res,
      error: err => console.error('❌ Error al cargar el catálogo:', err)
    });
  }
}
