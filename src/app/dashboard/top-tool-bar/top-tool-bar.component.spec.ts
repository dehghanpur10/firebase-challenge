import {TopToolBarComponent} from "./top-tool-bar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {SharedModule} from "../../shared/shared.module";
import { DebugElement,EventEmitter } from "@angular/core";
import {By} from "@angular/platform-browser";

describe('TopToolBarComponent', () => {
  let component:TopToolBarComponent;
  let fixture:ComponentFixture<TopToolBarComponent>;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [TopToolBarComponent],
      imports: [ SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TopToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should be display email',()=>{
    component.email = 'test@test.com';
    fixture.detectChanges();
    const element: DebugElement = fixture.debugElement;
    const email = element.query(By.css('h6')).nativeElement;
    expect(email.textContent).toContain('test@test.com')
  })
  it('should be toggle drawer',(done:DoneFn)=>{
    component.toggle = new EventEmitter();

    component.toggle.subscribe(()=>{
      expect(true).toBeTruthy()
      done()
    })
    component.doToggle();
  })
})
