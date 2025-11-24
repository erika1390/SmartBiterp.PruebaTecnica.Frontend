import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetVsExecutionComponent } from './budget-vs-execution.component';

describe('BudgetVsExecutionComponent', () => {
  let component: BudgetVsExecutionComponent;
  let fixture: ComponentFixture<BudgetVsExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetVsExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetVsExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
