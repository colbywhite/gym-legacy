import { TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as _stronglifts from '../shared/programs/stronglifts.json'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ProgramInfoComponent } from './program-info.component';
import { AppModule } from '../app.module';

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
      imports: [AppModule],
      providers: [
        {provide: ActivatedRoute, useValue: strongliftsRoute},
        {provide: APP_BASE_HREF, useValue: '/'}
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
