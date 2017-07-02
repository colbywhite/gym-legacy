import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'gl-program-info',
  templateUrl: './program-info.component.html',
  styleUrls: ['./program-info.component.css']
})
export class ProgramInfoComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  public program: Program

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
