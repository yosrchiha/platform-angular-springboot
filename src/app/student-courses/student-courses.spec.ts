import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesComponent } from './student-courses';

describe('StudentCourses', () => {
  let component: StudentCoursesComponent;
  let fixture: ComponentFixture<StudentCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCoursesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
