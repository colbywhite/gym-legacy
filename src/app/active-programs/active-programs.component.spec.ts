import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { ActiveProgramsComponent } from './active-programs.component';
import { HeaderComponent } from '../shared/header/header.component';
import { MockHeader } from '../shared/header/mock-header.override';
import { AppModule } from '../app.module';

describe('ActiveProgramsComponent', () => {
  let component: ActiveProgramsComponent;
  let fixture: ComponentFixture<ActiveProgramsComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .overrideComponent(HeaderComponent, MockHeader)
    .createComponent(ActiveProgramsComponent);
    fixture.detectChanges();
    component = fixture.componentInstance
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
