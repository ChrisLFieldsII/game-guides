import { getFirst4Chars, normalizeGameName } from './string-extensions'

describe('string extensions', () => {
  test('getFirst4Chars', () => {
    var games = [
      'Mortal Kombat',
      'Call of Duty',
      'Titanfall',
      'UFC 4',
      'GX',
      'A',
    ]
    var expectedArr = ['mort', 'call', 'tita', 'ufc4', 'gx', 'a']

    games.forEach((game, index) => {
      const expected = expectedArr[index]
      const actual = getFirst4Chars(game)
      expect(actual).toBe(expected)
    })
  })

  test('normalizeGameName', () => {
    var games = [
      'S.T.A.L.K.E.R. 2: Heart of Chernobyl',
      'Vampire: The Masquerade - Bloodlines 2',
      'Yu-Gi-Oh! Master Duel',
      'System Shock (Remake)',
      'Tom Clancy’s Rainbow Six Extraction',
      "JACK 'N' HAT",
      'FNF - Lullaby Mod',
    ]
    var expectedArr = [
      'stalker2heartofchernobyl',
      'vampirethemasqueradebloodlines2',
      'yugiohmasterduel',
      'systemshockremake',
      'tomclancysrainbowsixextraction',
      'jacknhat',
      'fnflullabymod',
    ]

    games.forEach((game, index) => {
      const expected = expectedArr[index]
      const actual = normalizeGameName(game)
      expect(actual).toBe(expected)
    })
  })
})
