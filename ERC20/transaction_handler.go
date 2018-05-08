package erc20

import (
	"fmt"

	"github.com/gogo/protobuf/proto"
	"github.com/kc1116/sawtooth-erc20-token/ERC20/proto/erc20_pb"
	"github.com/rberg2/sawtooth-go-sdk/processor"
	"github.com/rberg2/sawtooth-go-sdk/protobuf/processor_pb2"
)

// SubHandler this is a function that is called usually after determining what action should be performed for a transaction
type SubHandler struct {
	Handle func(request *processor_pb2.TpProcessRequest, context *processor.Context, payload erc20_pb.Payload) error
}

// TransactionHandler ...
type TransactionHandler struct {
	FName       string   `json:"familyName"`
	FVersions   []string `json:"familyVersions"`
	NSpace      []string `json:"nameSpace"`
	SubHandlers map[string]SubHandler
}

// FamilyName ...
const FamilyName = "erc20-token"

// FamilyVersions ...
var FamilyVersions = []string{"1.0"}

// FamilyName ...
func (t *TransactionHandler) FamilyName() string {
	return t.FName
}

// FamilyVersions ...
func (t *TransactionHandler) FamilyVersions() []string {
	return t.FVersions
}

// Namespaces ...
func (t *TransactionHandler) Namespaces() []string {
	return t.NSpace
}

// DelegateTransaction uses the action field on the payload interface to delegate the transaction to the proper subhandler
func (t *TransactionHandler) DelegateTransaction(request *processor_pb2.TpProcessRequest, context *processor.Context) error {
	var payload erc20_pb.Payload
	err := proto.Unmarshal(request.GetPayload(), &payload)
	if err != nil {
		logger.Error(err)
		return &processor.InvalidTransactionError{Msg: "Could determine the transaction action from payload"}
	}

	action := payload.GetAction().String()

	if subHandler, exists := t.SubHandlers[action]; exists {
		return subHandler.Handle(request, context, payload)
	}

	return &processor.InvalidTransactionError{Msg: fmt.Sprintf("Invalid action for transaction: %v", action)}
}

// Apply ...
func (t *TransactionHandler) Apply(request *processor_pb2.TpProcessRequest, context *processor.Context) error {
	return t.DelegateTransaction(request, context)
}

// NewTransactionHandler ...
func NewTransactionHandler(familyName string, familyVersions, namespace []string, subHandlers map[string]SubHandler) *TransactionHandler {
	return &TransactionHandler{
		FName:       familyName,
		FVersions:   familyVersions,
		NSpace:      namespace,
		SubHandlers: subHandlers,
	}
}
