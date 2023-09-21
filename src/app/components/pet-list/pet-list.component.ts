import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';
import { FormControl, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  formPet: FormGroup = new FormGroup({});
  constructor(private petService: PetService) {}

  noDataSelected = true;
  noDataTable = true;

  ngOnInit(): void {
    this.onDataTable();
    this.formPet = new FormGroup({
      idPet: new FormControl(''),
      name: new FormControl(''),
      age: new FormControl(''),
      description: new FormControl(''),
    });
  }

  pet: Pet = new Pet();
  datatable: any = [];

  onDataTable() {
    this.petService.getPet().subscribe((res) => {
      this.datatable = res;
      this.noDataTable = this.datatable.length === 0;
      this.noDataSelected = true;
    });
  }

  onSavePet(pet: Pet): void {
    this.petService.addPet(pet).subscribe((res) => {
      if (res) {
        this.onDataTable();
        this.onClear();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado a la mascota correctamente',
          text: '¡Puedes revisar el cambio!',
          footer: '<a>Puedes verificar a la nueva mascota.</a>',
          confirmButtonColor: '#2563EB',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar a la mascota',
          text: 'Ha ocurrido un error al guardar a la mascota.',
          confirmButtonColor: '#2563EB',
        });
      }
    });
  }

  onUpdatePet(pet: Pet): void {
    this.petService.updatePet(pet).subscribe((res) => {
      if (res) {
        this.onDataTable();
        this.onClear();
        Swal.fire({
          icon: 'success',
          title: 'Se ha modificado la mascota correctamente',
          text: '¡Puedes revisar el cambio!',
          footer: '<a>Puedes verificar el listado de mascotas.</a>',
          confirmButtonColor: '#2563EB',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar a la mascota',
          text: 'Ha ocurrido un error al actualizar a la mascota.',
          confirmButtonColor: '#2563EB',
        });
      }
    });
  }

  onDeletePet(idPet: number): void {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de que quieres eliminar esta mascota?',
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.petService.deletePet(idPet).subscribe((res) => {
          if (res) {
            this.onDataTable();
            this.onClear();
            Swal.fire({
              icon: 'success',
              title: 'Mascota eliminada',
              text: 'Se ha eliminado la mascota correctamente.',
              footer: '<a>Puedes verificar la lista de mascotas.</a>',
              confirmButtonColor: '#2563EB',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar a la mascota',
              text: 'Ha ocurrido un error al eliminar a la mascota.',
              confirmButtonColor: '#2563EB',
            });
          }
        });
      }
    });
  }

  onSetData(select: any) {
    this.pet.idPet = select.idPet;
    this.pet.name = select.name;
    this.pet.age = select.age;
    this.pet.description = select.description;
    this.noDataSelected = false;
  }

  onClear() {
    this.pet.idPet = 0;
    this.pet.name = '';
    this.pet.age = 0;
    this.pet.description = '';
  }
}
