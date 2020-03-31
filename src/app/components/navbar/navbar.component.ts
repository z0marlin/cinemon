import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() search = new EventEmitter();
  @Output() home = new EventEmitter();
  searchString = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch() {
    if (this.searchString.length < 1) {
      return;
    }
    // console.log('emitting search');
    this.search.emit({movieName: this.searchString, page: 1});
  }

  onHome() {
    // console.log('emitting home');
    this.home.emit();
  }

}
