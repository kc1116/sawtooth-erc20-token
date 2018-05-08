package state

import (
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb"
	"github.com/rberg2/sawtooth-go-sdk/logging"
	"github.com/rberg2/sawtooth-go-sdk/processor"
	number "github.com/shopspring/decimal"
)

var logger = logging.Get()

const (
	// ERC20 namespace prefixes: Basically the goal here is to represent our ERC20 smart contract we are used to from solidity
	// in a flat Radix Tree structure using the flexibility of ART and namespaces. Instead of having an smart contract with storage (costly)
	// we can store arbitrary information about our ERC20 contract in the state by prefixing each part of the ERC20Interface with a common prefix.
	// In this case 'erc20-token'. Now transactions will be map to the corresponding functions that handle these. See diagram below.
	// constant addresses use the prefixes with __PREFIX, i.e: symbol should not change, and there is no contract address like in ethereum this is a system wide token.

	prefix = "erc20-token"

	symbol       = prefix + "-symbol"
	name         = prefix + "-name"
	decimals     = prefix + "-decimals"
	totalSupply  = prefix + "-totalSupply"
	balances     = prefix + "-balances"
	allowed      = prefix + "-allowed"
	balanceOf    = prefix + "-balanceOf"
	allowance    = prefix + "-allowance"
	transfer     = prefix + "-transfer"
	approve      = prefix + "-approve"
	transferFrom = prefix + "-transferFrom"

	//  use this namespace to initialize your tokens state when your network is brought up
	initializeTokenState = prefix + "-INIT"

	// designates an address as constant
	konstant = "-constant"

	// ErrAlreadyInitialized
	errAlreadyInitialized = "This state has already been initialized: "
	errGetState           = "Could not get state from context at address: "
	errSetState           = "Could not set state at (address) with (value): "
	errLoadBalances       = "Could not load balances from state: "
	errLoadAllowed        = "Could not load allowd from state: "
	errInsufficientFunds  = "Insufficient funds in account: "
)

// Here we compute the namespaces for each ERC20 prefix we defined above.
// Namespaces prefix state addresses in the form of:
//
// 		35 bytes represented as 70 hex characters
// 		first 6 characters (3 bytes) are used as namespace prefix, seem below wrapped in brackets <a6|27|cb|>. The other 64 characters (32 bytes) are the rest of the address, we call this
// 		namespaceSuffix seen below wrapped in parantheses (34|e7|38|e7|a4|p9|..................................|4a|5t|r3|i8|81)
//
//			address -> <a6|27|cb|> + (34|e7|38|e7|a4|p9|..................................|4a|5t|r3|i8|81)
// 					      prefix ^                              namespaceSuffix ^
// 		i.e: to get namespace address for a users token balance, where address is composed of the "namespacePrefix" -> 'erc20-token-balances' and the
// 			 users public key used as the "namespaceSuffix"
//
// 			compute sha512 hex of the prefix and take first 6 chracters representing the 3 byte prefix (span in radix tree)
// 			namespacePrefix = sha512('erc20-token-balances').hexDigest()[0:6]
//
// 			compute sha512 hex of the prefix and take first 6 chracters representing the 32 byte 'addressPostfix'
// 			namespaceSuffix = sha512('02ccb8bc17397c55242a27d1681bf48b5b40a734205760882cd83f92aca4f1cf45').hexDigest()[:64]
//
// 			concatenate them
// 			address = namespacePrefix + namespaceSuffix (address should look something like this: '4ae1df0ad3ac05fdc7342c50d909d2331e296badb661416896f727131207db276a908e')
//
// 		The state data stored at this address in the ART will be the balance of user with public key '02ccb8bc17397c55242a27d1681bf48b5b40a734205760882cd83f92aca4f1cf45'

var (
	SymbolPrefix       = ComputePrefix(symbol)
	NamePrefix         = ComputePrefix(name)
	DecimalsPrefix     = ComputePrefix(decimals)
	TotalSupplyPrefix  = ComputePrefix(totalSupply)
	BalancesPrefix     = ComputePrefix(balances)
	AllowedPrefix      = ComputePrefix(allowed)
	BalanceOfPrefix    = ComputePrefix(balanceOf)
	AllowancePrefix    = ComputePrefix(allowance)
	TransferPrefix     = ComputePrefix(transfer)
	ApprovePrefix      = ComputePrefix(approve)
	TransferFromPrefix = ComputePrefix(transferFrom)

	symbolAddress               = MakeAddress(SymbolPrefix, konstant)
	nameAddress                 = MakeAddress(NamePrefix, konstant)
	decimalsAddress             = MakeAddress(DecimalsPrefix, konstant)
	totalSupplyAddress          = MakeAddress(TotalSupplyPrefix, konstant)
	initializeTokenStateAddress = MakeAddress(initializeTokenState, konstant)
)

// GetNameSpaces ...
func GetNameSpaces() []string {
	return []string{SymbolPrefix, NamePrefix, DecimalsPrefix, TotalSupplyPrefix, BalancesPrefix, AllowancePrefix, BalanceOfPrefix, AllowancePrefix, TransferPrefix, TransferFromPrefix}
}

type stateRecord struct {
	address  string
	data     string
	inferred interface{}
	bytes    []byte
}

func (s *stateRecord) marshalBytes() {
	s.bytes = []byte(s.data)
}

func (s *stateRecord) unMarshalBytes() {
	s.data = string(s.data)
}

type stateRecords struct {
	records  map[string]stateRecord
	stateMap map[string][]byte
}

func (s *stateRecords) addRecords(records ...stateRecord) {
	for _, record := range records {
		s.records[record.address] = record
	}
}

func newStateRecords() stateRecords {
	return stateRecords{
		records:  make(map[string]stateRecord),
		stateMap: make(map[string][]byte),
	}
}

// TokenState ...
type TokenState struct {
	context *processor.Context
}

// NewState returns pointer to instance of state struct
func NewState(context *processor.Context) *TokenState {
	return &TokenState{
		context: context,
	}
}

func (ts *TokenState) getState(addresses ...string) (stateRecords, error) {
	var records = newStateRecords()

	for _, address := range addresses {
		state, err := ts.context.GetState([]string{address})
		if err != nil {
			return stateRecords{}, err
		}
		logger.Debugf("GET STATE %v %v", address, string(state[address]))
		records.stateMap[address] = state[address]
	}

	return records, nil
}

func (ts *TokenState) setState(records *stateRecords) ([]string, error) {
	var addresses []string
	for _, record := range records.records {
		logger.Debugf("setState %v %v", record.address, record.data)
		_, err := ts.context.SetState(map[string][]byte{
			record.address: record.bytes,
		})
		if err != nil {
			return nil, err
		}
	}

	return addresses, nil
}

func (ts *TokenState) deleteState(addresses ...string) ([]string, error) {
	return ts.context.DeleteState(addresses)
}

// InitializeTokenState initialize token state
func (ts *TokenState) InitializeTokenState(data erc20_pb.InitTokenStatePayload, owner string) error {
	err := ts.setSymbol(data.GetSymbol())
	if err != nil {
		return err
	}
	err = ts.setName(data.GetName())
	if err != nil {
		return err
	}
	err = ts.setDecimals(data.GetDecimals())
	if err != nil {
		return err
	}
	err = ts.setTotalSupply(data.GetTotalSupply())
	if err != nil {
		return err
	}
	totalSupply, err := number.NewFromString(data.GetTotalSupply())
	if err != nil {
		return err
	}

	err = ts.setInitialBalance(owner, totalSupply)
	if err != nil {
		return err
	}

	return nil
}

// SetSymbol set the ERC20 token symbol
func (ts *TokenState) setSymbol(tokenSymbol string) error {
	return ts.setTokenConstant(symbolAddress, tokenSymbol)
}

// SetName set the ERC20 token name
func (ts *TokenState) setName(tokenName string) error {
	return ts.setTokenConstant(nameAddress, tokenName)
}

// SetDecimals set the ERC20 token decimals
func (ts *TokenState) setDecimals(tokenDecimals string) error {
	return ts.setTokenConstant(decimalsAddress, tokenDecimals)
}

// SetTotalSupply set the ERC20 token decimals
func (ts *TokenState) setTotalSupply(tokenTotalSupply string) error {
	var err error
	var tokens number.Decimal
	tokens, err = number.NewFromString(tokenTotalSupply)
	if err != nil {
		return err
	}

	return ts.setTokenConstant(totalSupplyAddress, tokens.String())
}

func (ts *TokenState) setTokenConstant(address string, data string) error {
	state, err := ts.getState(address)
	if err != nil {
		return &processor.InvalidTransactionError{Msg: fmt.Sprintf("%v%v error: %v", errGetState, string(address), err)}
	}

	if len(state.stateMap[address]) == 0 {
		state.addRecords(stateRecord{address: address, data: data, bytes: []byte(data)})
		_, err = ts.setState(&state)
		if err != nil {
			return &processor.InternalError{Msg: fmt.Sprintf("%v%v data: %v error: %v", errSetState, string(address), string(data), err)}
		}
	}

	return nil
}

func (ts *TokenState) setInitialBalance(address string, tokens number.Decimal) error {
	stateAddress := MakeAddress(BalancesPrefix, address)
	logger.Debugf("%v", stateAddress)
	return ts.setTokenConstant(stateAddress, tokens.String())
}

// ------------------------------------------------------------------------
// Transfer the balance from token owner's account to `to` account
// - Owner's account must have sufficient balance to transfer
// - 0 value transfers are allowed
// ------------------------------------------------------------------------
// function transfer(address to, uint tokens) public returns (bool success) {
//     balances[msg.sender] = balances[msg.sender].sub(tokens);
//     balances[to] = balances[to].add(tokens);
//     Transfer(msg.sender, to, tokens);
//     return true;
// }

// Transfer transfer the tokens from owner's account to `to` account
func (ts *TokenState) Transfer(owner, to string, tokens number.Decimal) error {
	logger.Debugf("TRANSFER %v %v %v", owner, to, tokens.String())

	var (
		balances = make(map[string]number.Decimal)
		records  = newStateRecords()
	)

	owner = MakeAddress(BalancesPrefix, owner)
	to = MakeAddress(BalancesPrefix, to)

	logger.Debugf("TRANSFER ADDRESS %v %v", owner, to)

	balances, err := ts.loadAmounts(owner, to)
	if err != nil {
		return err
	}

	ownerBalance := balances[owner]
	toBalance := balances[to]
	logger.Infof("%v %v", ownerBalance.String(), toBalance.String())
	if ts.Require(ts.isSufficientFunds(ownerBalance, tokens)) {
		ownerBalance = ownerBalance.Sub(tokens)
		toBalance = toBalance.Add(tokens)
		newBalances := []stateRecord{
			stateRecord{address: owner, data: ownerBalance.String(), bytes: []byte(ownerBalance.String())},
			stateRecord{address: to, data: toBalance.String(), bytes: []byte(toBalance.String())},
		}
		records.addRecords(newBalances...)
		_, err = ts.setState(&records)
	}
	// TODO: publish transfer event
	// TODO: add receipt data ?
	return err
}

// ------------------------------------------------------------------------
// Token owner can approve for `spender` to transferFrom(...) `tokens`
// from the token owner's account
//
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// recommends that there are no checks for the approval double-spend attack
// as this should be implemented in user interfaces
// ------------------------------------------------------------------------
// function approve(address spender, uint tokens) public returns (bool success) {
//     allowed[msg.sender][spender] = tokens;
//     Approval(msg.sender, spender, tokens);
//     return true;
// }

// Approve Token owner can approve for `spender` to transferFrom(...) `tokens` from the token owner's account
func (ts *TokenState) Approve(owner, spender string, tokens number.Decimal) error {
	var (
		err     error
		records = newStateRecords()
	)
	allowedAddress := MakeAddress(AllowedPrefix, owner+spender)
	records.addRecords(stateRecord{address: allowedAddress, data: tokens.String(), bytes: []byte(tokens.String())})
	_, err = ts.setState(&records)
	return err
}

// ------------------------------------------------------------------------
// Transfer `tokens` from the `from` account to the `to` account
//
// The calling account must already have sufficient tokens approve(...)-d
// for spending from the `from` account and
// - From account must have sufficient balance to transfer
// - Spender must have sufficient allowance to transfer
// - 0 value transfers are allowed
// ------------------------------------------------------------------------
// function transferFrom(address from, address to, uint tokens) public returns (bool success) {
//     balances[from] = balances[from].sub(tokens);
//     allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
//     balances[to] = balances[to].add(tokens);
//     Transfer(from, to, tokens);
//     return true;
// }

// TransferFrom Transfer `tokens` from the `from` account to the `to` account
func (ts *TokenState) TransferFrom(from, spender, to string, tokens number.Decimal) error {
	var err error
	allowedAddress := MakeAddress(AllowedPrefix, from+spender)
	if allowanceAmount, ok, err := ts.isAllowed(allowedAddress, tokens); ok && err == nil {
		if err = ts.Transfer(from, to, tokens); err == nil {
			allowanceAmount = allowanceAmount.Sub(tokens)
			records := newStateRecords()
			records.addRecords(stateRecord{address: allowedAddress, data: allowanceAmount.String(), bytes: []byte(allowanceAmount.String())})
			_, err = ts.setState(&records)
		}
	}
	return err
}

func (ts *TokenState) isSufficientFunds(balance, tokens number.Decimal) bool {
	return ts.Require(balance.GreaterThanOrEqual(tokens))
}

func (ts *TokenState) isAllowed(allowanceAddress string, tokens number.Decimal) (number.Decimal, bool, error) {
	allowances, err := ts.loadAmounts(allowanceAddress)
	return allowances[allowanceAddress], ts.isSufficientFunds(allowances[allowanceAddress], tokens), err
}

// loadAmounts function can be used to get balances or allowances
func (ts *TokenState) loadAmounts(addresses ...string) (map[string]number.Decimal, error) {
	amounts := make(map[string]number.Decimal)

	state, err := ts.getState(addresses...)
	if err != nil {
		return nil, err
	}

	logger.Infof("AMOUNTS %v", state.stateMap)
	for address, amountBytes := range state.stateMap {
		if len(amountBytes) == 0 {
			amounts[address] = number.Zero
			continue
		}
		amount, err := number.NewFromString(string(amountBytes))
		if err != nil {
			return nil, err
		}
		logger.Infof("AMOUNT %v", amount.String())
		amounts[address] = amount
	}
	return amounts, nil
}

// Require wrapper around simple boolean checks. This function is for aesthetics makes the ERC20 code more relatable to it's solidity counterpart
func (ts *TokenState) Require(predicate bool) bool {
	return predicate == true
}

// TokenState for aesthetics and readability
func (ts *TokenState) toBytes(s string) []byte {
	return []byte(s)
}

// ComputePrefix returns namespace prefix of 6 bytes
func ComputePrefix(prefix string) string {
	return Hexdigest(prefix)[:6]
}

// MakeAddress . . .
func MakeAddress(namespacePrefix, namespaceSuffix string) string {
	return namespacePrefix + Hexdigest(namespaceSuffix)[:64]
}

// Hexdigest
func Hexdigest(str string) string {
	hash := sha512.New()
	hash.Write([]byte(str))
	hashBytes := hash.Sum(nil)
	return strings.ToLower(hex.EncodeToString(hashBytes))
}

func init() {
	logger.SetLevel(logging.DEBUG)
}
