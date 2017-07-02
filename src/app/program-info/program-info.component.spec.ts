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
  let element

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
        element = fixture.debugElement.nativeElement
      })
  }))

  it('should compile', () => {
    expect(info).toBeTruthy();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('should display name from route', () => {
      fixture.detectChanges();
      expect(element.querySelector('h3').textContent).toBe(stronglifts.name);
    });
  })
})
