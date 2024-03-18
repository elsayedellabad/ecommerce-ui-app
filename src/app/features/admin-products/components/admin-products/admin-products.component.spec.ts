
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';
import * as mockedAdminProducts from 'src/app/core/mocks/mocked-admin-products.json';
import { AdminProductItem } from './../../models/admin-product-item.model';
import { AdminProductsComponent } from './admin-products.component';
import { AdminProductsService } from '../../services/admin-products.service';

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;
  let userProductsServiceSpy: any;

  beforeEach(async () => {
    userProductsServiceSpy = jasmine.createSpyObj(['getAdminProducts']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AdminProductsComponent],
      providers: [
        { providers: AdminProductsService, useValue: userProductsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    userProductsServiceSpy = TestBed.inject(AdminProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test getAdminProducts()', () => {
    const serviceSpy = spyOn(userProductsServiceSpy, 'getAdminProducts');
    serviceSpy.and.returnValue(of(mockedAdminProducts));
    component.getAdminProducts();
    expect(component.length).toEqual(20);
  });


 
});
