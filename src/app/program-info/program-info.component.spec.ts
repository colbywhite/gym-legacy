import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ProgramInfoComponent } from './program-info.component';
import * as _stronglifts from 'weight-program-schema/lib/stronglifts.json'
import {Observable} from 'rxjs';

const stronglifts: any = _stronglifts,
  strongliftsRoute = {
    paramMap: Observable.of(convertToParamMap({name: stronglifts.name}))
  }

describe('ProgramInfoComponent', () => {
  let fixture
  let info

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramInfoComponent],
      providers: [
        {provide: ActivatedRoute, useValue: strongliftsRoute}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProgramInfoComponent);
        info = fixture.debugElement.componentInstance
        info.ngOnInit()
      })
  }))

  it('should create the program info', () => {
    expect(info).toBeTruthy();
  });

  it('should display name from route', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toBe(stronglifts.name);
  });
})
