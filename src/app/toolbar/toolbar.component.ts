import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  title = 'point-tracker';
  color = 'color';
  edit: boolean = false;
  @Output() editChange = new EventEmitter<boolean>();
  disabled = false;

  constructor() {}

  ngOnInit(): void {}

  toggleEdit() {
    this.editChange.emit(!this.edit);
  }
}
