import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let controller: ContactsController;

  const mockContactService = {
    create: jest.fn((d, _data) => {
      return {
        ..._data,
        username: 'hsgshd',
        createdAt: '2020-53:737',
        updatedAt: '2020-53:737',
      }
    }),


    update: jest.fn((e, r, data) => {
      return { ...data, userId: 1 }
    })

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService],
    }).overrideProvider(ContactsService).useValue(mockContactService).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
    firstName: 'Val',
    lastName: 'Bot',
    phoneNumber: '0292928282',
    userId: 'ywujwujxhhxn'

  }
  const _updateReq = {
    user: {
      userId: 1
    }
  }

  it('should create', () => {
    expect(controller.create(_updateReq, data)).toEqual({
      username: 'hsgshd',
      createdAt: '2020-53:737',
      updatedAt: '2020-53:737',
      ...data
    });
  });

  const _updateData = {
    firstName: 'Val',
    lastName: 'Bot',
    phoneNumber: '0292928282',
  }

  it('should update', () => {
    expect(controller.update(_updateReq, { userId: 1 }, _updateData)).toEqual({
      ..._updateData,
      userId: 1
    });
  });


});
