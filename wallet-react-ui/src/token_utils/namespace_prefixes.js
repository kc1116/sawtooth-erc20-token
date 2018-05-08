const {createHash} = require('crypto');

// our prefix and namespace specify the input and output addresses for our transaction 
// symbolAddress               = MakeAddress(SymbolPrefix, konstant)
// nameAddress                 = MakeAddress(NamePrefix, konstant)
// decimalsAddress             = MakeAddress(DecimalsPrefix, konstant)
// totalSupplyAddress          = MakeAddress(TotalSupplyPrefix, konstant)
// initializeTokenStateAddress = MakeAddress(initializeTokenState, konstant)

// prefix = "props-token"

// symbol       = prefix + "-symbol"
// name         = prefix + "-name"
// decimals     = prefix + "-decimals"
// totalSupply  = prefix + "-totalSupply"
// balances     = prefix + "-balances"
// allowed      = prefix + "-allowed"
// balanceOf    = prefix + "-balanceOf"
// allowance    = prefix + "-allowance"
// transfer     = prefix + "-transfer"
// approve      = prefix + "-approve"
// transferFrom = prefix + "-transferFrom"
const GLOBAL_PREFIX = 'erc20-token'
const ALLOWED_PREFIX = `${GLOBAL_PREFIX}-allowed`;
const BALANCES_PREFIX = `${GLOBAL_PREFIX}-balances`;

export const BALANCES = createHash('sha512').update(BALANCES_PREFIX).digest('hex').substring(0, 6)
export const ALLOWED = createHash('sha512').update(ALLOWED_PREFIX).digest('hex').substring(0, 6)
export const makeAddress = (prefix, postfix) => {
    return prefix.concat(createHash('sha512').update(postfix).digest('hex').toLowerCase().substring(0, 64));
}