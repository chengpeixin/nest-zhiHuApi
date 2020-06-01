// 模板配置文件
export const mongodbUrl = '数据库链接地址'

export const pwd = '数据库密码'

export const account = '数据库账号'

export const authSource = '数据库权限'


export const secret = 'pwd加密key'

export const redisOpts = {
    port:'redis 端口号',
    host:'redis IP地址',
    password:'redis 密码',
    db:'redis db'
}

// 默认的redis存储的token有效期
export const tokenEx = 60*60*24*7

// jwt有效期
export const jwtEx = '7d'

// 报警监控dsn
export const sentryDsn = ''