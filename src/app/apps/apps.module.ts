import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppsRoutingModule } from './apps-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppsComponent } from './apps.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';

import { ServiceblogService } from './blog/blog-service.service';
import { RelayOnComponent } from './about/About-Components/relay-on/relay-on.component';
import { TopContentComponent } from './about/About-Components/top-content/top-content.component';

import { FullComponent } from './layout/full/full.component';

import { BannerComponent } from './shared/banner/banner.component';
import { BannerNavigationComponent } from './shared/banner-navigation/banner-navigation.component';
import { FooterComponent } from './shared/footer/footer.component';
import {ClimaRecomendadoComponent} from '../componentes/clima-recomendado/clima-recomendado.component';
import {ClimaPronosticoComponent} from '../clima-pronostico/clima-pronostico.component';
import {AsistenteSemanalComponent} from '../componentes/asistente-semanal/asistente-semanal.component';
import {CatalogoGeneralComponent} from '../componentes/catalogo-general/ catalogo-general.component';
import {AsesorIaComponent} from '../componentes/asesor-ia/asesor-ia.component';


@NgModule({
  declarations: [
    AppsComponent,
    BlogComponent,
    AboutComponent,
    BlogDetailComponent,
    RelayOnComponent,
    TopContentComponent,
    FullComponent,
    BannerComponent,
    // BannerContentComponent,
    BannerNavigationComponent,
    FooterComponent,
    ClimaRecomendadoComponent,
    ClimaPronosticoComponent,
    AsistenteSemanalComponent,
    CatalogoGeneralComponent,
    AsesorIaComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ServiceblogService],
})
export class AppsModule {}
