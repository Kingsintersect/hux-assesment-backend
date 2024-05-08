import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;

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
      providers: [ContactsService],
    }).overrideProvider(ContactsService).useValue(mockContactService).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    expect(service.create(_updateReq.user.userId.toString(), data)).toEqual({
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
    expect(service.update(_updateReq.user.userId.toString(), '2', _updateData)).toEqual({
      ..._updateData,
      userId: 1
    });
  });
});
