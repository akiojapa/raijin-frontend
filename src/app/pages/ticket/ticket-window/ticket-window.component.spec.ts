import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketWindowComponent } from './ticket-window.component';

describe('TicketWindowComponent', () => {
  let component: TicketWindowComponent;
  let fixture: ComponentFixture<TicketWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
