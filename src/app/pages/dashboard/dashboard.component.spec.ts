import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { UserStore } from '../../core/user.store';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let store: UserStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [UserStore],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(UserStore);
    console.log(store,'test store')
    fixture.detectChanges();
  });

  it('should display user email', (done) => {
    store.setUser({ email: 'user@test.com', token: 'abc' });
    store.email.subscribe((email) => {
      console.log(email,'test email unit test')
      expect(email).toBe('user@test.com');
      done();
    });
  });
});
