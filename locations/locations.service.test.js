const LocationService = require('./locations.service')
const Location = require ('./locations.model')
jest.mock('./locations.model')

/*
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
*/

describe('Locations getLocationbyID', () => {
    it('Should get a Location', async () => {
        //jest.resetAllMocks()
        const mockLocation = {
            _id : '638780c67dd43669cfbbe100', filmName: 'Jiji la Crevette',
        }
        Location.findById.mockResolvedValue(mockLocation)
        expect(await LocationService.getLocationbyID('638780c67dd43669cfbbe100')).toEqual(mockLocation)
        expect(Location.findById).toHaveBeenCalledWith('638780c67dd43669cfbbe100')
    })

    it('Should get an error', async () => {
        jest.resetAllMocks()
        const mockLocation = null
        Location.findById.mockResolvedValue(mockLocation)
        expect (async () => await LocationService.getLocationbyID(
            '638780c67dd43669cfbbe100')).rejects.toThrow()
        //expect(jest.fn()).toHaveBeenCalledTimes(1)
        expect(Location.findById).toHaveBeenCalledTimes(1)
    })
})
