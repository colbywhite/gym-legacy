import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProgramLibraryComponent } from './program-lib.component';
import * as _stronglifts from 'weight-program-schema/lib/stronglifts.json'
const firstProgram: any = _stronglifts

describe('ProgramLibraryComponent', () => {
  let fixture
  let programList
  let element

  const mockRouter = {
    navigate: (route) => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramLibraryComponent],
      providers: [
        {provide: Router, useValue: mockRouter}
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProgramLibraryComponent);
        programList = fixture.debugElement.componentInstance;
        element = fixture.debugElement.nativeElement
      })
  }))

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
      expect(element.querySelector('div button').textContent.trim()).toBe(firstProgram.name);
    })
  })
})
