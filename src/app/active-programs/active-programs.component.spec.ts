import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProgramsComponent } from './active-programs.component';

describe('ActiveProgramsComponent', () => {
  let component: ActiveProgramsComponent;
  let fixture: ComponentFixture<ActiveProgramsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveProgramsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
