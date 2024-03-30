import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalAssetMappedPage } from './approval-asset-mapped.page';

describe('ApprovalAssetMappedPage', () => {
  let component: ApprovalAssetMappedPage;
  let fixture: ComponentFixture<ApprovalAssetMappedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalAssetMappedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
