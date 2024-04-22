import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetApprovalPage } from './asset-approval.page';

describe('AssetApprovalPage', () => {
  let component: AssetApprovalPage;
  let fixture: ComponentFixture<AssetApprovalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
