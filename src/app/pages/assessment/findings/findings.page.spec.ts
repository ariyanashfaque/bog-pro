import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindingsPage } from './findings.page';

describe('FindingsPage', () => {
  let component: FindingsPage;
  let fixture: ComponentFixture<FindingsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FindingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
