import { IonicModule } from "@ionic/angular";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AssetRegistrationFooterComponent } from "./asset-registration-footer.component";

describe("AssetRegistrationFooterComponent", () => {
  let component: AssetRegistrationFooterComponent;
  let fixture: ComponentFixture<AssetRegistrationFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AssetRegistrationFooterComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetRegistrationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
