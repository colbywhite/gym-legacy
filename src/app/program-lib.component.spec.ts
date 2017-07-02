import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProgramLibraryComponent } from './program-lib.component';
import * as _stronglifts from 'weight-program-schema/lib/stronglifts.json'
const firstProgram: any = _stronglifts

describe('ProgramLibraryComponent', () => {
  let fixture;
  let programList;
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
      });
  }));

  it('should create the program list', () => {
    expect(programList).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toBe('Program Library');
  });

  it('should render default programs from WPS', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div button').textContent.trim()).toBe(firstProgram.name);
  });
});
