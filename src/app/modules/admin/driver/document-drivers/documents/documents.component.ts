import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  backClicked() {
    this._location.back();
  }
}
