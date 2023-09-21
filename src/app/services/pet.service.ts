import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../models/pet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private http: HttpClient) {}

  url: string = 'https://localhost:44380/api/Pet';

  getPet() {
    return this.http.get(this.url);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.url, pet);
  }

  updatePet(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(this.url + '/' + pet.idPet, pet);
  }

  deletePet(idPet: number): Observable<Pet> {
    return this.http.delete<Pet>(this.url + '/' + idPet);
  }
}
