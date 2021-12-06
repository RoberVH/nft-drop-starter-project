import React from 'react'


export const postedByAccount = (address) => {
    const upAccount = address.toLowerCase()
    return `Posted by: ${(upAccount.slice(0,5) + '...' + upAccount.slice(39,44))}`
}

export const shortAccount = (address) => {
    const upAccount = address.toLowerCase()
    return `Your Account: ${(upAccount.slice(0,5) + '...' + upAccount.slice(39,44))}`
}
export const frmatAccount = (account) => {
return (
    <div > 
    <span style={{
        border:'solid greenyellow 2px',
        // backgroundColor:'#22aba4',
        backgroundColor:'#0c9bcf',
        borderRadius:'10px',
        padding: '10px'
    }}>
          {shortAccount(account)}
    </span>
    </div>
)
}