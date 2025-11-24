import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyFundsComponent } from './money-funds.component';

describe('MoneyFundsComponent', () => {
  let component: MoneyFundsComponent;
  let fixture: ComponentFixture<MoneyFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyFundsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
