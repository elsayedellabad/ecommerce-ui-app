import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import * as mockedUserProductsData from 'src/app/core/mocks/mocked-user-products.json';
import { UserProductsComponent } from './user-products.component';
import { UserProductsService } from '../../services/user-products.service';
import { UserProductItem } from './../../models/user-product-item.model';
describe('UserProductsComponent', () => {
  let component: UserProductsComponent;
  let fixture: ComponentFixture<UserProductsComponent>;
  let userProductsServiceSpy: any;

  beforeEach(async () => {
    userProductsServiceSpy = jasmine.createSpyObj([
      'getUserProductsByCategory',
    ]);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [UserProductsComponent],
      providers: [{ providers: UserProductsService, useValue: userProductsServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProductsComponent);
    component = fixture.componentInstance;
    userProductsServiceSpy = TestBed.inject(UserProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Test getUserProducts() with default category', () => {
    const serviceSpy = spyOn(
      userProductsServiceSpy,
      'getUserProductsByCategory'
    );
    serviceSpy.and.returnValue(of(mockedUserProductsData));
    component.getUserProducts('all_products');
    expect(component.length).toEqual(20);
  });

  it('Test onCategoryChange() ', () => {
    const compSpy = spyOn(component, 'getUserProducts');
    component.onCategoryChange('a');
    expect(component.getUserProducts).toHaveBeenCalled();
    expect(component.getUserProducts).toHaveBeenCalledWith('a');
  });

  it('Test formatCardData()', () => {
    let articleItem: UserProductItem = {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      rating: {
        rate: 3.9,
        count: 120,
      },
    };
    component.formatCardData(articleItem);
    expect(component.formatCardData).toHaveBeenCalled;
  });
});
