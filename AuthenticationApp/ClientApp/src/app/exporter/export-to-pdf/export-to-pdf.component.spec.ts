import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportToPDFComponent } from './export-to-pdf.component';

describe('ExportToPDFComponent', () => {
  let component: ExportToPDFComponent;
  let fixture: ComponentFixture<ExportToPDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportToPDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportToPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
