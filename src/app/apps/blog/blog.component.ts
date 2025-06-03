import { Component, OnInit } from '@angular/core';
import { Blog } from './blog-type';
import { ServiceblogService } from './blog-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],

})
export class BlogComponent implements OnInit {
  blogsDetail: Blog[] = [];
  usuarioLogueado = false;
  ubicacionHabilitada = false;


  constructor(
    public service: ServiceblogService,
    public router: Router,
    public http: HttpClient
  ) {
    this.service.showEdit = false;
  }

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.usuarioLogueado = !!usuario?.nombre;

    // Verificamos si ya se tiene permiso de ubicación
    navigator.permissions?.query({ name: 'geolocation' as PermissionName }).then(result => {
      this.ubicacionHabilitada = result.state === 'granted';
    });
  }


  loginClick() {
    this.router.navigate(['/login']);
  }

  newPost() {
    this.router.navigate(['/post']);
  }

  viewDetail(id: number) {
    this.service.detailId = id;

    if (this.service.loginStatusService) this.service.showEdit = true;

    this.router.navigate(['/blogDetail', id]);
  }
}
