import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionManagementPage } from './action-management.page';

describe('ActionManagementPage', () => {
  let component: ActionManagementPage;
  let fixture: ComponentFixture<ActionManagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActionManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
