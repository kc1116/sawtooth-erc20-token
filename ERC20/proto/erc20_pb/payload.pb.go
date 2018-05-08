// Code generated by protoc-gen-go. DO NOT EDIT.
// source: payload.proto

package erc20_pb

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import google_protobuf "github.com/golang/protobuf/ptypes/any"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type ERC20Action int32

const (
	ERC20Action_INITIALIZE    ERC20Action = 0
	ERC20Action_TRANSFER      ERC20Action = 1
	ERC20Action_APPROVE       ERC20Action = 2
	ERC20Action_TRANSFER_FROM ERC20Action = 3
)

var ERC20Action_name = map[int32]string{
	0: "INITIALIZE",
	1: "TRANSFER",
	2: "APPROVE",
	3: "TRANSFER_FROM",
}
var ERC20Action_value = map[string]int32{
	"INITIALIZE":    0,
	"TRANSFER":      1,
	"APPROVE":       2,
	"TRANSFER_FROM": 3,
}

func (x ERC20Action) String() string {
	return proto.EnumName(ERC20Action_name, int32(x))
}
func (ERC20Action) EnumDescriptor() ([]byte, []int) { return fileDescriptor1, []int{0} }

type Payload struct {
	Action ERC20Action `protobuf:"varint,1,opt,name=action,enum=erc20_pb.ERC20Action" json:"action,omitempty"`
	Data   *AnyData    `protobuf:"bytes,2,opt,name=data" json:"data,omitempty"`
}

func (m *Payload) Reset()                    { *m = Payload{} }
func (m *Payload) String() string            { return proto.CompactTextString(m) }
func (*Payload) ProtoMessage()               {}
func (*Payload) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{0} }

func (m *Payload) GetAction() ERC20Action {
	if m != nil {
		return m.Action
	}
	return ERC20Action_INITIALIZE
}

func (m *Payload) GetData() *AnyData {
	if m != nil {
		return m.Data
	}
	return nil
}

type AnyData struct {
	Data *google_protobuf.Any `protobuf:"bytes,1,opt,name=data" json:"data,omitempty"`
}

func (m *AnyData) Reset()                    { *m = AnyData{} }
func (m *AnyData) String() string            { return proto.CompactTextString(m) }
func (*AnyData) ProtoMessage()               {}
func (*AnyData) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{1} }

func (m *AnyData) GetData() *google_protobuf.Any {
	if m != nil {
		return m.Data
	}
	return nil
}

type TransferPayload struct {
	To     string `protobuf:"bytes,1,opt,name=to" json:"to,omitempty"`
	Tokens string `protobuf:"bytes,2,opt,name=tokens" json:"tokens,omitempty"`
}

func (m *TransferPayload) Reset()                    { *m = TransferPayload{} }
func (m *TransferPayload) String() string            { return proto.CompactTextString(m) }
func (*TransferPayload) ProtoMessage()               {}
func (*TransferPayload) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{2} }

func (m *TransferPayload) GetTo() string {
	if m != nil {
		return m.To
	}
	return ""
}

func (m *TransferPayload) GetTokens() string {
	if m != nil {
		return m.Tokens
	}
	return ""
}

type ApprovePayload struct {
	Spender string `protobuf:"bytes,1,opt,name=spender" json:"spender,omitempty"`
	Tokens  string `protobuf:"bytes,2,opt,name=tokens" json:"tokens,omitempty"`
}

func (m *ApprovePayload) Reset()                    { *m = ApprovePayload{} }
func (m *ApprovePayload) String() string            { return proto.CompactTextString(m) }
func (*ApprovePayload) ProtoMessage()               {}
func (*ApprovePayload) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{3} }

func (m *ApprovePayload) GetSpender() string {
	if m != nil {
		return m.Spender
	}
	return ""
}

func (m *ApprovePayload) GetTokens() string {
	if m != nil {
		return m.Tokens
	}
	return ""
}

type TransferFromPayload struct {
	From   string `protobuf:"bytes,1,opt,name=from" json:"from,omitempty"`
	To     string `protobuf:"bytes,2,opt,name=to" json:"to,omitempty"`
	Tokens string `protobuf:"bytes,3,opt,name=tokens" json:"tokens,omitempty"`
}

func (m *TransferFromPayload) Reset()                    { *m = TransferFromPayload{} }
func (m *TransferFromPayload) String() string            { return proto.CompactTextString(m) }
func (*TransferFromPayload) ProtoMessage()               {}
func (*TransferFromPayload) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{4} }

func (m *TransferFromPayload) GetFrom() string {
	if m != nil {
		return m.From
	}
	return ""
}

func (m *TransferFromPayload) GetTo() string {
	if m != nil {
		return m.To
	}
	return ""
}

func (m *TransferFromPayload) GetTokens() string {
	if m != nil {
		return m.Tokens
	}
	return ""
}

type InitTokenStatePayload struct {
	Symbol      string `protobuf:"bytes,1,opt,name=symbol" json:"symbol,omitempty"`
	Name        string `protobuf:"bytes,2,opt,name=name" json:"name,omitempty"`
	Decimals    string `protobuf:"bytes,3,opt,name=decimals" json:"decimals,omitempty"`
	TotalSupply string `protobuf:"bytes,4,opt,name=totalSupply" json:"totalSupply,omitempty"`
}

func (m *InitTokenStatePayload) Reset()                    { *m = InitTokenStatePayload{} }
func (m *InitTokenStatePayload) String() string            { return proto.CompactTextString(m) }
func (*InitTokenStatePayload) ProtoMessage()               {}
func (*InitTokenStatePayload) Descriptor() ([]byte, []int) { return fileDescriptor1, []int{5} }

func (m *InitTokenStatePayload) GetSymbol() string {
	if m != nil {
		return m.Symbol
	}
	return ""
}

func (m *InitTokenStatePayload) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *InitTokenStatePayload) GetDecimals() string {
	if m != nil {
		return m.Decimals
	}
	return ""
}

func (m *InitTokenStatePayload) GetTotalSupply() string {
	if m != nil {
		return m.TotalSupply
	}
	return ""
}

func init() {
	proto.RegisterType((*Payload)(nil), "erc20_pb.Payload")
	proto.RegisterType((*AnyData)(nil), "erc20_pb.AnyData")
	proto.RegisterType((*TransferPayload)(nil), "erc20_pb.TransferPayload")
	proto.RegisterType((*ApprovePayload)(nil), "erc20_pb.ApprovePayload")
	proto.RegisterType((*TransferFromPayload)(nil), "erc20_pb.TransferFromPayload")
	proto.RegisterType((*InitTokenStatePayload)(nil), "erc20_pb.InitTokenStatePayload")
	proto.RegisterEnum("erc20_pb.ERC20Action", ERC20Action_name, ERC20Action_value)
}

func init() { proto.RegisterFile("payload.proto", fileDescriptor1) }

var fileDescriptor1 = []byte{
	// 381 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x74, 0x91, 0xc1, 0x8b, 0xd3, 0x40,
	0x14, 0xc6, 0x4d, 0xb6, 0x24, 0xdd, 0x17, 0x37, 0x66, 0x47, 0x77, 0x89, 0x7b, 0x2a, 0x05, 0xa1,
	0x08, 0x66, 0x97, 0xec, 0xc9, 0x63, 0xd4, 0x14, 0x82, 0xda, 0xd6, 0x69, 0xf0, 0xe0, 0xa5, 0x4c,
	0x9a, 0x69, 0x29, 0x26, 0x33, 0xc3, 0x64, 0x2a, 0xe4, 0xe8, 0x7f, 0x2e, 0x9d, 0xce, 0xd4, 0x0a,
	0xee, 0x6d, 0xbe, 0xf7, 0xbd, 0xef, 0x37, 0x1f, 0x3c, 0xb8, 0x12, 0xa4, 0x6f, 0x38, 0xa9, 0x13,
	0x21, 0xb9, 0xe2, 0x68, 0x48, 0xe5, 0x3a, 0x7d, 0x58, 0x89, 0xea, 0xee, 0xf5, 0x96, 0xf3, 0x6d,
	0x43, 0xef, 0xf5, 0xbc, 0xda, 0x6f, 0xee, 0x09, 0xeb, 0x8f, 0x4b, 0xe3, 0x15, 0xf8, 0x8b, 0x63,
	0x0a, 0xbd, 0x03, 0x8f, 0xac, 0xd5, 0x8e, 0xb3, 0xd8, 0x19, 0x39, 0x93, 0x30, 0xbd, 0x49, 0x2c,
	0x20, 0xc9, 0xf1, 0xc7, 0xf4, 0x21, 0xd3, 0x26, 0x36, 0x4b, 0xe8, 0x0d, 0x0c, 0x6a, 0xa2, 0x48,
	0xec, 0x8e, 0x9c, 0x49, 0x90, 0x5e, 0xff, 0x5d, 0xce, 0x58, 0xff, 0x89, 0x28, 0x82, 0xb5, 0x3d,
	0x7e, 0x04, 0xdf, 0x0c, 0xd0, 0xc4, 0x24, 0x1c, 0x9d, 0x78, 0x95, 0x1c, 0x5b, 0x25, 0xb6, 0xd5,
	0x21, 0x68, 0x42, 0xef, 0xe1, 0x45, 0x29, 0x09, 0xeb, 0x36, 0x54, 0xda, 0x76, 0x21, 0xb8, 0x8a,
	0xeb, 0xe8, 0x25, 0x76, 0x15, 0x47, 0xb7, 0xe0, 0x29, 0xfe, 0x93, 0xb2, 0x4e, 0x17, 0xb8, 0xc4,
	0x46, 0x8d, 0x3f, 0x40, 0x98, 0x09, 0x21, 0xf9, 0x2f, 0x6a, 0x93, 0x31, 0xf8, 0x9d, 0xa0, 0xac,
	0xa6, 0xd2, 0xc4, 0xad, 0x7c, 0x92, 0xf1, 0x0d, 0x5e, 0xda, 0xef, 0xa7, 0x92, 0xb7, 0x16, 0x84,
	0x60, 0xb0, 0x91, 0xbc, 0x35, 0x14, 0xfd, 0x36, 0xb5, 0xdc, 0xff, 0xd4, 0xba, 0xf8, 0x07, 0xf9,
	0xdb, 0x81, 0x9b, 0x82, 0xed, 0x54, 0x79, 0x90, 0x4b, 0x45, 0xd4, 0xa9, 0xde, 0x2d, 0x78, 0x5d,
	0xdf, 0x56, 0xbc, 0x31, 0x5c, 0xa3, 0x0e, 0xbf, 0x31, 0xd2, 0x52, 0xc3, 0xd6, 0x6f, 0x74, 0x07,
	0xc3, 0x9a, 0xae, 0x77, 0x2d, 0x69, 0x2c, 0xff, 0xa4, 0xd1, 0x08, 0x02, 0xc5, 0x15, 0x69, 0x96,
	0x7b, 0x21, 0x9a, 0x3e, 0x1e, 0x68, 0xfb, 0x7c, 0xf4, 0xf6, 0x33, 0x04, 0x67, 0x87, 0x44, 0x21,
	0x40, 0x31, 0x2b, 0xca, 0x22, 0xfb, 0x52, 0xfc, 0xc8, 0xa3, 0x67, 0xe8, 0x39, 0x0c, 0x4b, 0x9c,
	0xcd, 0x96, 0xd3, 0x1c, 0x47, 0x0e, 0x0a, 0xc0, 0xcf, 0x16, 0x0b, 0x3c, 0xff, 0x9e, 0x47, 0x2e,
	0xba, 0x86, 0x2b, 0x6b, 0xad, 0xa6, 0x78, 0xfe, 0x35, 0xba, 0xa8, 0x3c, 0x7d, 0xb6, 0xc7, 0x3f,
	0x01, 0x00, 0x00, 0xff, 0xff, 0x4f, 0x0a, 0x99, 0xff, 0x75, 0x02, 0x00, 0x00,
}