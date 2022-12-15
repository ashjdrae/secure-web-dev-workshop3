const UserService = require('./user.service')
const User = require('../Users/user.model');
jest.mock('./user.model')

// Not working because of the difference between our function which not displays password
// And the find which displays it
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

