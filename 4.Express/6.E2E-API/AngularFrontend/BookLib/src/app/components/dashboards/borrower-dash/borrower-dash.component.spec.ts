import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerDashComponent } from './borrower-dash.component';

describe('BorrowerDashComponent', () => {
  let component: BorrowerDashComponent;
  let fixture: ComponentFixture<BorrowerDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowerDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
