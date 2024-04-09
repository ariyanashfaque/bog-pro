import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetApprovalUpdateModalComponent } from './asset-approval-update-modal.component';

describe('AssetApprovalUpdateModalComponent', () => {
  let component: AssetApprovalUpdateModalComponent;
  let fixture: ComponentFixture<AssetApprovalUpdateModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetApprovalUpdateModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetApprovalUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
