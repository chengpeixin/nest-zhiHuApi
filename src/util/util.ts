export const isProduction:Boolean = (()=>{
    return process.env.NODE_ENV === 'production'
})()