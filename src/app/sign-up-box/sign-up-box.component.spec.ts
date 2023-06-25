import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBoxComponent } from './sign-up-box.component';

describe('SignUpBoxComponent', () => {
  let component: SignUpBoxComponent;
  let fixture: ComponentFixture<SignUpBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpBoxComponent]
    });
    fixture = TestBed.createComponent(SignUpBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
