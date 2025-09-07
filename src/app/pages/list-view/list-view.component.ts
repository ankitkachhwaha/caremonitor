import { Component } from '@angular/core';
import { ItemsStore } from './list-view.store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  providers: [ItemsStore],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss'
})
export class ListViewComponent {
 constructor(public store : ItemsStore){
 }
  ngOnInit() {
    this.store.load();
  }
}
