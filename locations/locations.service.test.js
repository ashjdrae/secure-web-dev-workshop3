const LocationService = require('./locations.service')
const Location = require ('./locations.model')
jest.mock('./locations.model')

describe('Locations getLocations', () => {
    it('Should display all locations', async () => {
        Location.find.mockResolvedValue([1,2,3,4])
        const req = {}
        const res = {json:jest.fn()}
        await LocationService.getLocations(req,res)
        expect(res.json).toHaveBeenCalledWith([1,2,3,4])
        expect(Location.find).toHaveBeenCalledTimes(1)
    })
})
describe('Locations getLocationbyID', () => {
    it('Should get a Location', async () => {
        const mockLocation = {
            id : '638780c67dd43669cfbbe911', filmName: 'French Exit',
        }
        Location.findById.mockResolvedValue(mockLocation)
        //expect(await LocationService.getLocationbyID('639835cd66d2e8465807e711')).toEqual(mockLocation)
        const req = mockLocation
        const res = {json:jest.fn()}
        await LocationService.getLocationbyID(req,res)
        expect(res.json).toHaveBeenCalledWith(mockLocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })

    it('Should get an error', async () => {
        jest.resetAllMocks()
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        const req = mockLocation
        const res = {json:jest.fn()}
        await LocationService.getLocationbyID(mockLocation)//.rejects.toThrow()
        expect(res.json).toHaveBeenCalledWith(mockLocation)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})