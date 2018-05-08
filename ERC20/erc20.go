/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ------------------------------------------------------------------------------
 */

package erc20

import (
	"syscall"

	"github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb"
	"github.com/kc1116/sawtooth-erc20-token/ERC20/state"
	"github.com/rberg2/sawtooth-go-sdk/logging"
	"github.com/rberg2/sawtooth-go-sdk/processor"
	"github.com/rberg2/sawtooth-go-sdk/protobuf/processor_pb2"
)

var logger = logging.Get()

// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
// contract ERC20Interface {
// 	   string public symbol;
// 	   string public  name;
// 	   uint8 public decimals;
// 	   uint public _totalSupply;
// 	   mapping(address => uint) balances;
//	   mapping(address => mapping(address => uint)) allowed;
//     function totalSupply() public constant returns (uint);
//     function balanceOf(address tokenOwner) public constant returns (uint balance);
//     function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
//     function transfer(address to, uint tokens) public returns (bool success);
//     function approve(address spender, uint tokens) public returns (bool success);
//     function transferFrom(address from, address to, uint tokens) public returns (bool success);
//     event Transfer(address indexed from, address indexed to, uint tokens);
//     event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
// }

// ERC20 minimum interface needed for ERC20 support
type ERC20 interface {
	Transfer(request *processor_pb2.TpProcessRequest, context *processor.Context, payload *erc20_pb.Payload) error
	Approve(request *processor_pb2.TpProcessRequest, context *processor.Context, payload *erc20_pb.Payload) error
	TransferFrom(request *processor_pb2.TpProcessRequest, context *processor.Context, payload *erc20_pb.Payload) error
	Run() error
}

// BasicERC20 ERC20 implementating struct
type BasicERC20 struct {
	State                state.TokenState
	TransactionHandler   *TransactionHandler
	TransactionProcessor *processor.TransactionProcessor
}

// Transfer ...
func (basic *BasicERC20) Transfer(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	return transferSubHandler(request, context, payload)
}

// Approve ...
func (basic *BasicERC20) Approve(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	return approveSubHandler(request, context, payload)
}

// TransferFrom ...
func (basic *BasicERC20) TransferFrom(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	return transferFromSubHandler(request, context, payload)
}

// Initialize ...
func (basic *BasicERC20) Initialize(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	return initTokenStateHandler(request, context, payload)
}

// Run start the sawtooth transaction processor
func (basic *BasicERC20) Run() error {
	return basic.TransactionProcessor.Start()
}

// NewBasicERC20 ...
func NewBasicERC20(validator string) *BasicERC20 {
	var token BasicERC20

	subHandlers := map[string]SubHandler{
		erc20_pb.ERC20Action_TRANSFER.String():      SubHandler{Handle: token.Transfer},
		erc20_pb.ERC20Action_APPROVE.String():       SubHandler{Handle: token.Approve},
		erc20_pb.ERC20Action_TRANSFER_FROM.String(): SubHandler{Handle: token.TransferFrom},
		erc20_pb.ERC20Action_INITIALIZE.String():    SubHandler{Handle: token.Initialize},
	}

	token.TransactionHandler = NewTransactionHandler(FamilyName, FamilyVersions, state.GetNameSpaces(), subHandlers)

	processor := processor.NewTransactionProcessor(validator)
	processor.AddHandler(token.TransactionHandler)
	processor.ShutdownOnSignal(syscall.SIGINT, syscall.SIGTERM)

	token.TransactionProcessor = processor
	return &token
}
