import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianDashComponent } from './librarian-dash.component';

describe('LibrarianDashComponent', () => {
  let component: LibrarianDashComponent;
  let fixture: ComponentFixture<LibrarianDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarianDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
