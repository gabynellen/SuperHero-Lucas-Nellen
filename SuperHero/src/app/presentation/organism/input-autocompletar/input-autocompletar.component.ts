import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SuperHeroModel } from '@models';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-autocompletar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './input-autocompletar.component.html',
  styleUrl: './input-autocompletar.component.scss',
})
export class InputAutocompletarComponent implements OnInit {
  myControl = new FormControl('');
  @Input() options: SuperHeroModel[] = [];
  @Output() selected = new EventEmitter<any>();
  filteredOptions!: Observable<SuperHeroModel[]>;
  selectedOpt: boolean = false;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): SuperHeroModel[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((op) =>
      op.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(superHero: SuperHeroModel): string {
    return superHero && superHero.name ? superHero.name : '';
  }

  cleanValue() {
    this.myControl.setValue('');
    this.selectedOpt = false;
    this.options = [];
    this.selected.emit(null);
  }

  onOptionSelected(option: any) {
    this.selectedOpt = true;
    this.selected.emit(option);
  }
}
