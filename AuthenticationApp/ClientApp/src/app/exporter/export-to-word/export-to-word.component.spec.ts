import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportToWordComponent } from './export-to-word.component';

describe('ExportToWordComponent', () => {
  let component: ExportToWordComponent;
  let fixture: ComponentFixture<ExportToWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportToWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportToWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
