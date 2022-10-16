import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmgSoonComponent } from './cmg-soon.component';

describe('CmgSoonComponent', () => {
  let component: CmgSoonComponent;
  let fixture: ComponentFixture<CmgSoonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmgSoonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmgSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
