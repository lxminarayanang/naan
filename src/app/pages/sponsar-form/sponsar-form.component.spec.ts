import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsarFormComponent } from './sponsar-form.component';

describe('SponsarFormComponent', () => {
  let component: SponsarFormComponent;
  let fixture: ComponentFixture<SponsarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
