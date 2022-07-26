import { pack7items } from '../src/utils'

describe('pack7items', () => {
	it('should make groups of 7 items', () => {
		const packed = pack7items([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
		expect(packed.length).toBe(2)
		expect(packed).toContainEqual([1, 2, 3, 4, 5, 6, 7])
		expect(packed).toContainEqual([8, 9, 10, 11, 12, 13, 14])
	})
})
