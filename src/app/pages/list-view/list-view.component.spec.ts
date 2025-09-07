import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ItemsStore } from './list-view.store';
import { BackendService } from '../../core/backend.service';
import { ListViewComponent } from './list-view.component';
import { AppService } from '../../service/app.service';

describe('ListComponent', () => {
  let fixture: ComponentFixture<ListViewComponent>;
  let component: ListViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewComponent],

      providers: [
        provideHttpClient(withInterceptors([BackendService])),
        AppService,
        ItemsStore,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListViewComponent);
    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
