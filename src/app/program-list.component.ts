import { Component } from '@angular/core';

@Component({
  selector: 'gl-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent {
  public programs: Program[] = [
    {name: 'hello'},  {name: 'world!'}
  ]
}

interface Program {
  name: string
}
