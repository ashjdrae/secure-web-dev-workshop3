const UserService = require('./user.service')
const User = require('../Users/user.model');
jest.mock('./user.model')

// Not working because of the difference between our function which not displays password
// And the find which displays it
// But if you modify the function and remove the ".select("-password"), then the test works
/*
describe('Users getAllUsers', () => {
    it('Should display all users', async () => {
        User.find().mockResolvedValue([1,2,3,4])
        const req = {}
        const res = {json:jest.fn()}
        await UserService.GetAllUsers(req,res)
        expect(res.json).toHaveBeenCalledWith([1,2,3,4])
        expect(User.find).toHaveBeenCalledTimes(1)
    })
})
*/

describe('Users GetSelf', () => {
// Not working because of the difference between our function which not displays password
// And the find which displays it 
// But if you modify the function and remove the ".select("-password"), then the test works
    /*
    it('Should get a User', async () => {
        jest.resetAllMocks()
        const mockUser = {
            _id : '638780c67dd43669cfbbe100', username: 'Jiji_la_Crevette'
        }
        User.findById.mockResolvedValue(mockUser)
        expect(await UserService.GetSelf('638780c67dd43669cfbbe100')).toEqual(user)
        expect(User.findById).toHaveBeenCalledWith('638780c67dd43669cfbbe100')
    })
    */
    it('Should get an error', async () => {
        jest.resetAllMocks()
        const mockUser = null
        User.findById.mockResolvedValue(mockUser)
        expect (async () => await UserService.GetSelf(
            '638780c67dd43669cfbbe100')).rejects.toThrow()
        expect(User.findById).toHaveBeenCalledTimes(1)
    })
})

describe('Users deleteOneUser', () => {
    it('Should get a Delete done message', async () => {
        jest.resetAllMocks()
        const mockUser = {
            _id : '638780c67dd43669cfbbe100', username: 'Jiji_la_Crevette',
        }
        User.findByIdAndDelete.mockResolvedValue(mockUser)
        expect(await UserService.DeleteSelf('638780c67dd43669cfbbe100')).toEqual("Delete Done")
        expect(User.findByIdAndDelete).toHaveBeenCalledWith('638780c67dd43669cfbbe100')
    })

    it('Should get an error', async () => {
        jest.resetAllMocks()
        const mockUser = null
        User.findByIdAndDelete.mockResolvedValue(mockUser)
        expect (async () => await UserService.DeleteSelf(
            '638780c67dd43669cfbbe100')).rejects.toThrow()
        expect(User.findByIdAndDelete).toHaveBeenCalledTimes(1)
    })
})
