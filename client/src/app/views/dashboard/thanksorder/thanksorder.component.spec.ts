import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksorderComponent } from './thanksorder.component';

describe('ThanksorderComponent', () => {
  let component: ThanksorderComponent;
  let fixture: ComponentFixture<ThanksorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
