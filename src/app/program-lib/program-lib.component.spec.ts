import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ProgramLibraryComponent } from './program-lib.component';
import { ProgramService } from '../shared/program.service'
import { HeaderComponent } from '../shared/header/header.component';
import { MockHeader } from '../shared/header/mock-header.override';
import { AppModule } from '../app.module';

import * as _stronglifts from '../shared/programs/stronglifts.json'
const firstProgram: any = _stronglifts

describe('ProgramLibraryComponent', () => {
  let fixture
  let programList
  let element

  const mockRouter = {
    navigate: (route) => {}
  }

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        ProgramService
      ]
    })
    .overrideComponent(HeaderComponent, MockHeader)
    .createComponent(ProgramLibraryComponent)
    programList = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement
  })

  it('should compile', () => {
    expect(programList).toBeTruthy();
  })

  describe('when rendered', () => {
    beforeEach(() => {
      fixture.detectChanges()
    })

    it('should display title in a h1 tag', () => {
      expect(element.querySelector('h1').textContent).toBe('Program Library');
    })

    it('should display default programs from WPS', () => {
      expect(element.querySelector('div.list-group-item').textContent.trim()).toBe(firstProgram.name);
    })

    it('should route to program info when program is clicked', inject([Router], (router: Router) => {
      spyOn(router, 'navigate')
      element.querySelector('div.list-group-item').click()
      expect(router.navigate).toHaveBeenCalledWith(['/program', firstProgram.name]);
    }))
  })
})
