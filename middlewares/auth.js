const roleService = require('../services/roles') 

const isAdmin = async (req,res,next) => {
    
    const token = req.header('auth-token')
    const adminRoleId = await roleService.getAdminRoleId() // should be include this funcionality in services/roles ?

    if (!token) return res.status(401).json({ error: 'Access denied' })

    try {
        const user = decodeToken(token)

        if (user.roleId !== adminRoleId) return res.status(401).json({ error: 'Access denied' })
        next()
        
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }

}

module.exports = {
    isAdmin
}