import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickStudentComponent } from './pick-student.component';

describe('PickStudentComponent', () => {
  let component: PickStudentComponent;
  let fixture: ComponentFixture<PickStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
