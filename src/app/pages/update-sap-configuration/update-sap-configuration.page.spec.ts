import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AddSapConfigurationPage } from "./update-sap-configuration.page";

describe("AddSapConfigurationPage", () => {
  let component: AddSapConfigurationPage;
  let fixture: ComponentFixture<AddSapConfigurationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSapConfigurationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
