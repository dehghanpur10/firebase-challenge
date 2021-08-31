import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-top-tool-bar',
  templateUrl: './top-tool-bar.component.html',
  styleUrls: ['./top-tool-bar.component.scss']
})
export class TopToolBarComponent implements OnInit {
  @Input() email :string=''
  @Output() toggle = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  doToggle(){
    this.toggle.emit()
  }
}
