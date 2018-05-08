

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
	"github.com/golang/protobuf/ptypes"
	"github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb"
	"github.com/kc1116/sawtooth-erc20-token/ERC20/state"
	"github.com/rberg2/sawtooth-go-sdk/processor"
	"github.com/rberg2/sawtooth-go-sdk/protobuf/processor_pb2"
	number "github.com/shopspring/decimal"
)

func transferSubHandler(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	var transferPayload erc20_pb.TransferPayload
	tokenState := state.NewState(context)
	err := ptypes.UnmarshalAny(payload.Data.Data, &transferPayload)
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal payload data"}
	}

	owner := request.GetHeader().GetSignerPublicKey()
	tokens, err := number.NewFromString(transferPayload.GetTokens())
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal token amount string"}
	}

	logger.Infof("owner %v, to %v", state.MakeAddress(state.BalancesPrefix, owner), state.MakeAddress(state.BalancesPrefix, transferPayload.GetTo()))

	return tokenState.Transfer(owner, transferPayload.GetTo(), tokens)
}

func approveSubHandler(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	var approvePayload erc20_pb.ApprovePayload
	tokenState := state.NewState(context)
	err := ptypes.UnmarshalAny(payload.Data.Data, &approvePayload)
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal payload data"}
	}

	owner := request.GetHeader().GetSignerPublicKey()
	tokens, err := number.NewFromString(approvePayload.GetTokens())
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal token amount string"}
	}

	return tokenState.Approve(owner, approvePayload.GetSpender(), tokens)
}

func transferFromSubHandler(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	var transferFromPayload erc20_pb.TransferFromPayload
	tokenState := state.NewState(context)
	err := ptypes.UnmarshalAny(payload.Data.Data, &transferFromPayload)
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal payload data"}
	}

	spender := request.GetHeader().GetSignerPublicKey()
	tokens, err := number.NewFromString(transferFromPayload.GetTokens())
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal token amount string"}
	}

	return tokenState.TransferFrom(transferFromPayload.GetFrom(), spender, transferFromPayload.GetTo(), tokens)
}

func initTokenStateHandler(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error {
	var initTokenPayload erc20_pb.InitTokenStatePayload
	tokenState := state.NewState(context)
	err := ptypes.UnmarshalAny(payload.Data.Data, &initTokenPayload)
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could unmarshal payload data"}
	}

	return tokenState.InitializeTokenState(initTokenPayload, request.GetHeader().GetSignerPublicKey())
}
