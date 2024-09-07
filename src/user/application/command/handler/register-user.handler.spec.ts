import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserHandler } from './register-user.handler';
import { RegisterUserCommand } from '../register-user.command';
import { UserRepository } from 'src/user/domain/user.repository';
import { EventPublisher } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RegisterUserHandler', () => {
  let handler: RegisterUserHandler;
  let userRepository: UserRepository;
  let publisher: EventPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserHandler,
        {
          provide: 'UserRepository',
          useValue: {
            findByUsername: jest.fn(),
            insert: jest.fn(),
          },
        },
        {
          provide: EventPublisher,
          useValue: {
            mergeObjectContext: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<RegisterUserHandler>(RegisterUserHandler);
    userRepository = module.get<UserRepository>('UserRepository');
    publisher = module.get<EventPublisher>(EventPublisher);
  });

  it('should register a user successfully', async () => {
    const command = new RegisterUserCommand('testuser', 'password');
    userRepository.findByUsername = jest.fn().mockResolvedValue(null);
    userRepository.insert = jest.fn().mockResolvedValue({ register: jest.fn(), commit: jest.fn() });
    publisher.mergeObjectContext = jest.fn().mockReturnValue({
      register: jest.fn(),
      commit: jest.fn(),
    });

    await handler.execute(command);

    expect(userRepository.findByUsername).toHaveBeenCalledWith('testuser');
    expect(userRepository.insert).toHaveBeenCalledWith('testuser', expect.any(String));
    expect(publisher.mergeObjectContext).toHaveBeenCalled();
    const user = (publisher.mergeObjectContext as jest.Mock).mock.results[0].value;
    expect(user.register).toHaveBeenCalled();
    expect(user.commit).toHaveBeenCalled();
  });

  it('should throw conflict exception if user already exists', async () => {
    const command = new RegisterUserCommand('existinguser', 'password');
    userRepository.findByUsername = jest.fn().mockResolvedValue({});

    await expect(handler.execute(command)).rejects.toThrow(HttpException);
    await expect(handler.execute(command)).rejects.toThrowError(new HttpException('Conflict', HttpStatus.CONFLICT));
    expect(userRepository.findByUsername).toHaveBeenCalledWith('existinguser');
  });
});