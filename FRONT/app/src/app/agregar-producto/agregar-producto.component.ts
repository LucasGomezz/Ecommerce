import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneroService } from '../services/genero/genero.service';
import { Genero } from '../modelos/genero.model';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  imports: [CommonModule, ReactiveFormsModule], // Import the necessary modules
})
export class AgregarProductoComponent implements OnInit {
  productoForm: FormGroup;
  generos: Genero[] = [];

  constructor(private fb: FormBuilder, private generoService: GeneroService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      genero: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      clasificacion: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      imagen: ['', Validators.required],
      imagenHorizontal: [''],
    });
  }

  ngOnInit(): void {
    this.generoService.getGeneros().subscribe((data) => {
      this.generos = data;
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      console.log('Form Submitted', this.productoForm.value);
    }
  }
}
