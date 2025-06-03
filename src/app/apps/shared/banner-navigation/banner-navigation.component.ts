import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-navigation',
  templateUrl: './banner-navigation.component.html',
  styleUrls: ['./banner-navigation.component.css'],
})
export class BannerNavigationComponent implements OnInit {
  usuario: any = null;


  ngOnInit(): void {
    const data = localStorage.getItem('usuario');
    this.usuario = data ? JSON.parse(data) : null;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  }

}
