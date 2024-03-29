import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkUploadPage } from './bulk-upload.page';

describe('BulkUploadPage', () => {
  let component: BulkUploadPage;
  let fixture: ComponentFixture<BulkUploadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BulkUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
