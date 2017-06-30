import { TestBed, async } from '@angular/core/testing';

import { ProgramListComponent } from './program-list.component';

describe('ProgramListComponent', () => {
  let fixture;
  let programList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramListComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ProgramListComponent);
        programList = fixture.debugElement.componentInstance;
      });
  }));

  it('should create the program list', async(() => {
    expect(programList).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Programs');
  }));
});
