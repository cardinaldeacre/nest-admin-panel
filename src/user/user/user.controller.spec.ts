import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import httpMock from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], 
      imports: [],
      providers: [],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can be sayy hello', async () => {
    const response = await controller.sayHello('John', 'Doe');
    expect(response).toBe('Hello John Doe');
  });

  it('should can view hello', async () => {
    const mockResponse = httpMock.createResponse();
    
    controller.viewHello('John', mockResponse);
    expect(mockResponse._getRenderView()).toBe('index.html');
    expect(mockResponse._getRenderData()).toEqual({ 
      name: 'John',
      title: 'My App' 
    });
  });
});
