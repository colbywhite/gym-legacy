import { TestBed, inject, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as _stronglifts from '../shared/programs/stronglifts.json'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ProgramInfoComponent } from './program-info.component';
import { MockProgramService } from '../shared/mock-program.service';
import { ProgramService } from '../shared/program.service';
import { HeaderComponent } from '../shared/header/header.component';
import { MockHeader } from '../shared/header/mock-header.override';
import { AppModule } from '../app.module';

const stronglifts: any = _stronglifts
const strongliftsRoute = {
  paramMap: Observable.of(convertToParamMap({name: stronglifts.name}))
}

describe('ProgramInfoComponent', () => {
  let fixture: ComponentFixture<ProgramInfoComponent>
  let info: ProgramInfoComponent
  let element: Element

  const mockRouter = {
    navigate: (route) => {}
  }

  beforeEach(fakeAsync(() => {
    fixture = TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: ActivatedRoute, useValue: strongliftsRoute},
        {provide: Router, useValue: mockRouter},
        {provide: ProgramService, useClass: MockProgramService},
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .overrideComponent(HeaderComponent, MockHeader)
      .createComponent(ProgramInfoComponent);
    info = fixture.componentInstance
    info.ngOnInit()
    tick()
    element = fixture.nativeElement
  }))

  it('should compile', () => {
    expect(info).toBeTruthy();
  });

  describe('when rendered', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('should display name from route', () => {
      expect(element.querySelector('h3').textContent).toBe(stronglifts.name);
    });

    it('should display six weeks', () => {
      expect(element.querySelectorAll('div.list-group').length).toBe(6);
    });

    it('should route back to library when back button is clicked', inject([Router], (router: Router) => {
      spyOn(router, 'navigate')
      element.querySelector('button').click()
      expect(router.navigate).toHaveBeenCalledWith(['/lib']);
    }))
  })
})
