import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Duración de la notificación
      positionClass: 'toast-top-right', // Posición de la notificación
      preventDuplicates: true, // Evita duplicados
      progressBar: true, // Muestra una barra de progreso
      progressAnimation: 'decreasing', // Animación de la barra de progreso
      closeButton: true, // Muestra el botón de cerrar
      tapToDismiss: false, // Evita cerrar al hacer clic
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
