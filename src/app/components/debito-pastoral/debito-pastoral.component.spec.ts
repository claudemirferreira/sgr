import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoPastoralComponent } from './debito-pastoral.component';

describe('DebitoPastoralComponent', () => {
  let component: DebitoPastoralComponent;
  let fixture: ComponentFixture<DebitoPastoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoPastoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoPastoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
