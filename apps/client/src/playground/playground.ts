import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-playground',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './playground.html',
  styleUrl: './playground.css',
})
export class Playground {}
