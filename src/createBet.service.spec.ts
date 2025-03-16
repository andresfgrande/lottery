import { CreateBetRequest, CreateBetService } from './context/bets/services/createBet.service';
import { mock } from 'jest-mock-extended';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { DateGenerator } from './context/bets/infrastructure/dateGenerator';
import { CreationDate } from './context/bets/domain/creationDate';
import { BetId } from './context/bets/domain/betId';
import { Bet } from './context/bets/domain/bet';
import { v4 as uuidv4 } from 'uuid';
import { BetNumbers, BetNumbersPrimitives } from './context/bets/domain/betNumbers';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('BetsService', () => {
  const betsRepository = mock<BetsRepository>();
  const dateGenerator = mock<DateGenerator>();
  const betsService = new CreateBetService(betsRepository, dateGenerator);
  const mockUuidv4 = jest.requireMock('uuid').v4;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save a new bet without generated bet numbers', async () => {
    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    const mockedUuid = uuidv4();
    mockUuidv4.mockReturnValueOnce(mockedUuid);
    const previousResults = ['12345', '64727', '79176', '94532', '22984'];
    const createBetRequest: CreateBetRequest = {
      previousResults: previousResults,
      generateBet: false,
    };
    const bet = new Bet(
      new BetId(uuidv4()),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      new BetNumbers(),
    );

    const betId = await betsService.execute(createBetRequest);

    expect(betsRepository.save).toHaveBeenCalledWith(bet);
    expect(betId).toEqual({betId: bet.getBetId()});
  });

  it('should save a new bet with generated bet numbers', async () => {
    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    const mockedUuid = uuidv4();
    mockUuidv4.mockReturnValueOnce(mockedUuid);
    const previousResults = ['12345', '64727', '79176', '94532', '22984'];
    const createBetRequest: CreateBetRequest = {
      previousResults: previousResults,
      generateBet: true,
    };
    const excludedFirstPairs = new Set(["12", "64", "79", "94", "22"]);
    const excludedLastPairs = new Set(["45", "27", "76", "32", "84"]);
    const betNumbersPrimitives: BetNumbersPrimitives = {
      firstPairNumbers: [],
      lastPairNumbers: [],
    } ;
    for (let i = 0; i < 100; i++) {
      const firstPair = i.toString().padStart(2, "0");
      if (excludedFirstPairs.has(firstPair)) {
        continue;
      }
      betNumbersPrimitives.firstPairNumbers.push(firstPair);
    }
    for (let j = 0; j < 100; j++) {
      const lastPair = j.toString().padStart(2, "0");
      if (excludedLastPairs.has(lastPair)) {
        continue;
      }
      betNumbersPrimitives.lastPairNumbers.push(lastPair);
    }
    const bet = new Bet(
      new BetId(uuidv4()),
      new CreationDate(dateGenerator.getDate()),
      previousResults,
      BetNumbers.fromPrimitives(betNumbersPrimitives),
    );

    const betId = await betsService.execute(createBetRequest);

    expect(betsRepository.save).toHaveBeenCalledWith(bet);
    expect(betId).toEqual({betId: bet.getBetId()});

  })
});
