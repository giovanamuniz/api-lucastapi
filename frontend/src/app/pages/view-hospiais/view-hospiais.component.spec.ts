import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHospiaisComponent } from './view-hospiais.component';

describe('ViewHospiaisComponent', () => {
  let component: ViewHospiaisComponent;
  let fixture: ComponentFixture<ViewHospiaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHospiaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHospiaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
