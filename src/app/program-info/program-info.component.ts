import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'gl-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.css']
})
export class ProgramInfoComponent implements OnInit {
  public program: Program
  public days: number[] = [0,1,2,3,4,5,6]

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.program = {name: params.get('name')}
      })
  }
}

interface Program {
  name: string
}
