import { CreateBetRequest, CreateBetService } from './context/bets/services/createBet.service';
import { mock } from 'jest-mock-extended';
import { BetsRepository } from './context/bets/infrastructure/betsRepository';
import { DateGenerator } from './context/bets/infrastructure/dateGenerator';
import { CreationDate } from './context/bets/domain/creationDate';
import { BetId } from './context/bets/domain/betId';
import { Bet } from './context/bets/domain/bet';
import { v4 as uuidv4 } from 'uuid';
import { BetNumbers, BetNumbersPrimitives } from './context/bets/domain/betNumbers';
import { Stats } from './context/bets/domain/stats';

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
    const previousResults = ["12345", "62384", "79236", "79532", "22984"];
    const createBetRequest: CreateBetRequest = {
      previousResults: previousResults,
      generateBet: false,
    };
    const expectedBetPrimitives = {
      "betId": mockedUuid,
      "creationDate": expectedDate,
      "previousResults": [
        "12345",
        "62384",
        "79236",
        "79532",
        "22984"
      ],
      "betNumbers": {
        "betNumberPairs": [
        ]
      },
      "stats": {
        "statsCollection": [
        ]
      }
    };
    const expectedBet = Bet.fromPrimitives(expectedBetPrimitives);
   
    const betId = await betsService.execute(createBetRequest);

    expect(betsRepository.save).toHaveBeenCalledWith(expectedBet);
    expect(betId).toEqual({betId: expectedBet.getBetId()});
  });

  it('should save a new bet with generated bet numbers', async () => {
    const expectedDate = new Date().toISOString();
    dateGenerator.getDate.mockReturnValue(expectedDate);
    const mockedUuid = uuidv4();
    mockUuidv4.mockReturnValueOnce(mockedUuid);
    const previousResults = ["12345", "62384", "79236", "79532", "22984"];
    const createBetRequest: CreateBetRequest = {
      previousResults: previousResults,
      generateBet: true,
    };
    const expectedBetPrimitives = {
      "betId": mockedUuid,
      "creationDate": expectedDate,
      "previousResults": [
        "12345",
        "62384",
        "79236",
        "79532",
        "22984"
      ],
      "betNumbers": {
        "betNumberPairs": [
          {
            "pairList": [
              "00",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
              "51",
              "52",
              "53",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "60",
              "61",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "70",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "80",
              "81",
              "82",
              "83",
              "84",
              "85",
              "86",
              "87",
              "88",
              "89",
              "90",
              "91",
              "92",
              "93",
              "94",
              "95",
              "96",
              "97",
              "98",
              "99"
            ]
          },
          {
            "pairList": [
              "00",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "24",
              "25",
              "26",
              "27",
              "28",
              "30",
              "31",
              "32",
              "33",
              "34",
              "35",
              "36",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
              "51",
              "52",
              "53",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "60",
              "61",
              "62",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "70",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "79",
              "80",
              "81",
              "82",
              "83",
              "84",
              "85",
              "86",
              "87",
              "88",
              "89",
              "90",
              "91",
              "93",
              "94",
              "96",
              "97",
              "98",
              "99"
            ]
          },
          {
            "pairList": [
              "00",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
              "33",
              "35",
              "36",
              "37",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "45",
              "46",
              "47",
              "48",
              "49",
              "50",
              "51",
              "52",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "60",
              "61",
              "62",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "70",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "79",
              "80",
              "81",
              "82",
              "83",
              "84",
              "85",
              "86",
              "87",
              "88",
              "89",
              "90",
              "91",
              "92",
              "93",
              "94",
              "95",
              "96",
              "97",
              "99"
            ]
          },
          {
            "pairList": [
              "00",
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "33",
              "34",
              "35",
              "37",
              "38",
              "39",
              "40",
              "41",
              "42",
              "43",
              "44",
              "46",
              "47",
              "48",
              "49",
              "50",
              "51",
              "52",
              "53",
              "54",
              "55",
              "56",
              "57",
              "58",
              "59",
              "60",
              "61",
              "62",
              "63",
              "64",
              "65",
              "66",
              "67",
              "68",
              "69",
              "70",
              "71",
              "72",
              "73",
              "74",
              "75",
              "76",
              "77",
              "78",
              "79",
              "80",
              "81",
              "82",
              "83",
              "85",
              "86",
              "87",
              "88",
              "89",
              "90",
              "91",
              "92",
              "93",
              "94",
              "95",
              "96",
              "97",
              "98",
              "99"
            ]
          }
        ]
      },
      "stats": {
        "statsCollection": [
          {
            "numberCounts": [
              {
                "numberPair": "12",
                "count": 1
              },
              {
                "numberPair": "22",
                "count": 1
              },
              {
                "numberPair": "62",
                "count": 1
              },
              {
                "numberPair": "79",
                "count": 2
              }
            ]
          },
          {
            "numberCounts": [
              {
                "numberPair": "23",
                "count": 2
              },
              {
                "numberPair": "29",
                "count": 1
              },
              {
                "numberPair": "92",
                "count": 1
              },
              {
                "numberPair": "95",
                "count": 1
              }
            ]
          },
          {
            "numberCounts": [
              {
                "numberPair": "23",
                "count": 1
              },
              {
                "numberPair": "34",
                "count": 1
              },
              {
                "numberPair": "38",
                "count": 1
              },
              {
                "numberPair": "53",
                "count": 1
              },
              {
                "numberPair": "98",
                "count": 1
              }
            ]
          },
          {
            "numberCounts": [
              {
                "numberPair": "32",
                "count": 1
              },
              {
                "numberPair": "36",
                "count": 1
              },
              {
                "numberPair": "45",
                "count": 1
              },
              {
                "numberPair": "84",
                "count": 2
              }
            ]
          }
        ]
      }
    };
    const expectedBet = Bet.fromPrimitives(expectedBetPrimitives);

    const betId = await betsService.execute(createBetRequest);

    expect(betsRepository.save).toHaveBeenCalledWith(expectedBet);
    expect(betId).toEqual({betId: expectedBet.getBetId()});

  })
});
