import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-playground',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './playground.html',
  styleUrl: './playground.css',
})
export class Playground {}
