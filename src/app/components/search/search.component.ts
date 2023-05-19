import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {
  @Output() searchChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}

  
  public inputChanged(event: any) {
    this.searchChanged.emit(event.detail.value);
  }

}
