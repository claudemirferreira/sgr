import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProventoPastoralComponent } from './provento-pastoral.component';

describe('ProventoPastoralComponent', () => {
  let component: ProventoPastoralComponent;
  let fixture: ComponentFixture<ProventoPastoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProventoPastoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProventoPastoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
