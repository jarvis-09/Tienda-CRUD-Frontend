import { Component, OnInit } from '@angular/core';
import { TiendaModel } from '../../model/tienda-model';
import { TiendaService } from '../../service/tienda.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.sass']
})
export class TiendaComponent implements OnInit {

  listProductos: TiendaModel[] = [];
  formTienda: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  constructor(private tiendaService: TiendaService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.list();
    this.formTienda = new FormGroup({
      idProducto: new FormControl(''),
      nombre: new FormControl(''),
      valor: new FormControl(''),
      descripcion: new FormControl(''),
      status: new FormControl('1'),
    });
  }

  list() {
    this.tiendaService.getTiendas().subscribe(resp => {
      if (resp) {
        this.listProductos = resp;
      }
    });
  }

  save(): void {
    if (this.formTienda.valid) {
      this.formTienda.controls['status'].setValue('1');
      
      this.tiendaService.saveTienda(this.formTienda.value).subscribe({
        next: (resp) => {
          if (resp) {
            this.list();
            this.formTienda.reset();
            this.toastr.success('Producto guardado exitosamente', 'Éxito');
            this.closeModal(); // Cierra el modal
          }
        },
        error: (err) => {
          console.error('Error al guardar el producto:', err);
          this.toastr.error('Ocurrió un error al guardar el producto', 'Error');
        }
      });
    } else {
      this.toastr.warning('Por favor, completa todos los campos requeridos', 'Formulario inválido');
    }
  }

  update(): void {
    if (this.formTienda.valid) {
      this.tiendaService.updateTiendas(this.formTienda.value).subscribe({
        next: (resp) => {
          if (resp) {
            this.toastr.success('Producto actualizado exitosamente', 'Éxito');
            this.list();
            this.formTienda.reset();
            this.closeModal();
          } else {
            this.toastr.warning('No se pudo actualizar el producto', 'Advertencia');
          }
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          this.toastr.error('Ocurrió un error al actualizar el producto', 'Error');
        }
      });
    } else {
      this.toastr.error('Por favor, completa todos los campos requeridos antes de actualizar.', 'Error');
    }
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.tiendaService.deleteTiendas(id).subscribe({
        next: (resp) => {
          if (resp) {
            this.toastr.success('Producto eliminado exitosamente', 'Éxito');
            this.list();
          } else {
            this.toastr.warning('No se pudo eliminar el producto', 'Advertencia');
          }
        },
        error: (err) => {
          console.error('Error al eliminar el producto:', err);
          this.toastr.error('Ocurrió un error al eliminar el producto', 'Error');
        }
      });
    }
  }

  newproducto(): void {
    this.isUpdate = false;
    this.formTienda.reset();
  }

  selectItem(item: TiendaModel): void {
    this.isUpdate = true;
    this.formTienda.controls['idProducto'].setValue(item.idProducto);
    this.formTienda.controls['nombre'].setValue(item.nombre);
    this.formTienda.controls['valor'].setValue(item.valor);
    this.formTienda.controls['descripcion'].setValue(item.descripcion);
    this.formTienda.controls['status'].setValue(item.status);
  }

  private closeModal(): void {
    const modalElement = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide(); // Cierra el modal
    }
  }
}
