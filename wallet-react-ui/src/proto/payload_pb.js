/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.erc20_pb = (function() {

    /**
     * Namespace erc20_pb.
     * @exports erc20_pb
     * @namespace
     */
    var erc20_pb = {};

    erc20_pb.Payload = (function() {

        /**
         * Properties of a Payload.
         * @memberof erc20_pb
         * @interface IPayload
         * @property {erc20_pb.ERC20Action|null} [action] Payload action
         * @property {erc20_pb.IAnyData|null} [data] Payload data
         */

        /**
         * Constructs a new Payload.
         * @memberof erc20_pb
         * @classdesc Represents a Payload.
         * @implements IPayload
         * @constructor
         * @param {erc20_pb.IPayload=} [properties] Properties to set
         */
        function Payload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Payload action.
         * @member {erc20_pb.ERC20Action} action
         * @memberof erc20_pb.Payload
         * @instance
         */
        Payload.prototype.action = 0;

        /**
         * Payload data.
         * @member {erc20_pb.IAnyData|null|undefined} data
         * @memberof erc20_pb.Payload
         * @instance
         */
        Payload.prototype.data = null;

        /**
         * Creates a new Payload instance using the specified properties.
         * @function create
         * @memberof erc20_pb.Payload
         * @static
         * @param {erc20_pb.IPayload=} [properties] Properties to set
         * @returns {erc20_pb.Payload} Payload instance
         */
        Payload.create = function create(properties) {
            return new Payload(properties);
        };

        /**
         * Encodes the specified Payload message. Does not implicitly {@link erc20_pb.Payload.verify|verify} messages.
         * @function encode
         * @memberof erc20_pb.Payload
         * @static
         * @param {erc20_pb.IPayload} message Payload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Payload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
            if (message.data != null && message.hasOwnProperty("data"))
                $root.erc20_pb.AnyData.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Payload message, length delimited. Does not implicitly {@link erc20_pb.Payload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof erc20_pb.Payload
         * @static
         * @param {erc20_pb.IPayload} message Payload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Payload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Payload message from the specified reader or buffer.
         * @function decode
         * @memberof erc20_pb.Payload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {erc20_pb.Payload} Payload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Payload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.erc20_pb.Payload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.action = reader.int32();
                    break;
                case 2:
                    message.data = $root.erc20_pb.AnyData.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Payload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof erc20_pb.Payload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {erc20_pb.Payload} Payload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Payload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Payload message.
         * @function verify
         * @memberof erc20_pb.Payload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Payload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.action != null && message.hasOwnProperty("action"))
                switch (message.action) {
                default:
                    return "action: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.data != null && message.hasOwnProperty("data")) {
                var error = $root.erc20_pb.AnyData.verify(message.data);
                if (error)
                    return "data." + error;
            }
            return null;
        };

        /**
         * Creates a Payload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof erc20_pb.Payload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {erc20_pb.Payload} Payload
         */
        Payload.fromObject = function fromObject(object) {
            if (object instanceof $root.erc20_pb.Payload)
                return object;
            var message = new $root.erc20_pb.Payload();
            switch (object.action) {
            case "INITIALIZE":
            case 0:
                message.action = 0;
                break;
            case "TRANSFER":
            case 1:
                message.action = 1;
                break;
            case "APPROVE":
            case 2:
                message.action = 2;
                break;
            case "TRANSFER_FROM":
            case 3:
                message.action = 3;
                break;
            }
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".erc20_pb.Payload.data: object expected");
                message.data = $root.erc20_pb.AnyData.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a Payload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof erc20_pb.Payload
         * @static
         * @param {erc20_pb.Payload} message Payload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Payload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.action = options.enums === String ? "INITIALIZE" : 0;
                object.data = null;
            }
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = options.enums === String ? $root.erc20_pb.ERC20Action[message.action] : message.action;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.erc20_pb.AnyData.toObject(message.data, options);
            return object;
        };

        /**
         * Converts this Payload to JSON.
         * @function toJSON
         * @memberof erc20_pb.Payload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Payload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Payload;
    })();

    /**
     * ERC20Action enum.
     * @name erc20_pb.ERC20Action
     * @enum {string}
     * @property {number} INITIALIZE=0 INITIALIZE value
     * @property {number} TRANSFER=1 TRANSFER value
     * @property {number} APPROVE=2 APPROVE value
     * @property {number} TRANSFER_FROM=3 TRANSFER_FROM value
     */
    erc20_pb.ERC20Action = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "INITIALIZE"] = 0;
        values[valuesById[1] = "TRANSFER"] = 1;
        values[valuesById[2] = "APPROVE"] = 2;
        values[valuesById[3] = "TRANSFER_FROM"] = 3;
        return values;
    })();

    erc20_pb.AnyData = (function() {

        /**
         * Properties of an AnyData.
         * @memberof erc20_pb
         * @interface IAnyData
         * @property {google.protobuf.IAny|null} [data] AnyData data
         */

        /**
         * Constructs a new AnyData.
         * @memberof erc20_pb
         * @classdesc Represents an AnyData.
         * @implements IAnyData
         * @constructor
         * @param {erc20_pb.IAnyData=} [properties] Properties to set
         */
        function AnyData(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AnyData data.
         * @member {google.protobuf.IAny|null|undefined} data
         * @memberof erc20_pb.AnyData
         * @instance
         */
        AnyData.prototype.data = null;

        /**
         * Creates a new AnyData instance using the specified properties.
         * @function create
         * @memberof erc20_pb.AnyData
         * @static
         * @param {erc20_pb.IAnyData=} [properties] Properties to set
         * @returns {erc20_pb.AnyData} AnyData instance
         */
        AnyData.create = function create(properties) {
            return new AnyData(properties);
        };

        /**
         * Encodes the specified AnyData message. Does not implicitly {@link erc20_pb.AnyData.verify|verify} messages.
         * @function encode
         * @memberof erc20_pb.AnyData
         * @static
         * @param {erc20_pb.IAnyData} message AnyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnyData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.data != null && message.hasOwnProperty("data"))
                $root.google.protobuf.Any.encode(message.data, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AnyData message, length delimited. Does not implicitly {@link erc20_pb.AnyData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof erc20_pb.AnyData
         * @static
         * @param {erc20_pb.IAnyData} message AnyData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AnyData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AnyData message from the specified reader or buffer.
         * @function decode
         * @memberof erc20_pb.AnyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {erc20_pb.AnyData} AnyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnyData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.erc20_pb.AnyData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.data = $root.google.protobuf.Any.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AnyData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof erc20_pb.AnyData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {erc20_pb.AnyData} AnyData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AnyData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AnyData message.
         * @function verify
         * @memberof erc20_pb.AnyData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AnyData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.data != null && message.hasOwnProperty("data")) {
                var error = $root.google.protobuf.Any.verify(message.data);
                if (error)
                    return "data." + error;
            }
            return null;
        };

        /**
         * Creates an AnyData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof erc20_pb.AnyData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {erc20_pb.AnyData} AnyData
         */
        AnyData.fromObject = function fromObject(object) {
            if (object instanceof $root.erc20_pb.AnyData)
                return object;
            var message = new $root.erc20_pb.AnyData();
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".erc20_pb.AnyData.data: object expected");
                message.data = $root.google.protobuf.Any.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from an AnyData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof erc20_pb.AnyData
         * @static
         * @param {erc20_pb.AnyData} message AnyData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AnyData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.data = null;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.google.protobuf.Any.toObject(message.data, options);
            return object;
        };

        /**
         * Converts this AnyData to JSON.
         * @function toJSON
         * @memberof erc20_pb.AnyData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AnyData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AnyData;
    })();

    erc20_pb.TransferPayload = (function() {

        /**
         * Properties of a TransferPayload.
         * @memberof erc20_pb
         * @interface ITransferPayload
         * @property {string|null} [to] TransferPayload to
         * @property {string|null} [tokens] TransferPayload tokens
         */

        /**
         * Constructs a new TransferPayload.
         * @memberof erc20_pb
         * @classdesc Represents a TransferPayload.
         * @implements ITransferPayload
         * @constructor
         * @param {erc20_pb.ITransferPayload=} [properties] Properties to set
         */
        function TransferPayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransferPayload to.
         * @member {string} to
         * @memberof erc20_pb.TransferPayload
         * @instance
         */
        TransferPayload.prototype.to = "";

        /**
         * TransferPayload tokens.
         * @member {string} tokens
         * @memberof erc20_pb.TransferPayload
         * @instance
         */
        TransferPayload.prototype.tokens = "";

        /**
         * Creates a new TransferPayload instance using the specified properties.
         * @function create
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {erc20_pb.ITransferPayload=} [properties] Properties to set
         * @returns {erc20_pb.TransferPayload} TransferPayload instance
         */
        TransferPayload.create = function create(properties) {
            return new TransferPayload(properties);
        };

        /**
         * Encodes the specified TransferPayload message. Does not implicitly {@link erc20_pb.TransferPayload.verify|verify} messages.
         * @function encode
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {erc20_pb.ITransferPayload} message TransferPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransferPayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.to != null && message.hasOwnProperty("to"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.to);
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tokens);
            return writer;
        };

        /**
         * Encodes the specified TransferPayload message, length delimited. Does not implicitly {@link erc20_pb.TransferPayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {erc20_pb.ITransferPayload} message TransferPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransferPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransferPayload message from the specified reader or buffer.
         * @function decode
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {erc20_pb.TransferPayload} TransferPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransferPayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.erc20_pb.TransferPayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.to = reader.string();
                    break;
                case 2:
                    message.tokens = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransferPayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {erc20_pb.TransferPayload} TransferPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransferPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransferPayload message.
         * @function verify
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransferPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isString(message.to))
                    return "to: string expected";
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                if (!$util.isString(message.tokens))
                    return "tokens: string expected";
            return null;
        };

        /**
         * Creates a TransferPayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {erc20_pb.TransferPayload} TransferPayload
         */
        TransferPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.erc20_pb.TransferPayload)
                return object;
            var message = new $root.erc20_pb.TransferPayload();
            if (object.to != null)
                message.to = String(object.to);
            if (object.tokens != null)
                message.tokens = String(object.tokens);
            return message;
        };

        /**
         * Creates a plain object from a TransferPayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof erc20_pb.TransferPayload
         * @static
         * @param {erc20_pb.TransferPayload} message TransferPayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransferPayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.to = "";
                object.tokens = "";
            }
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = message.to;
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                object.tokens = message.tokens;
            return object;
        };

        /**
         * Converts this TransferPayload to JSON.
         * @function toJSON
         * @memberof erc20_pb.TransferPayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransferPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TransferPayload;
    })();

    erc20_pb.ApprovePayload = (function() {

        /**
         * Properties of an ApprovePayload.
         * @memberof erc20_pb
         * @interface IApprovePayload
         * @property {string|null} [spender] ApprovePayload spender
         * @property {string|null} [tokens] ApprovePayload tokens
         */

        /**
         * Constructs a new ApprovePayload.
         * @memberof erc20_pb
         * @classdesc Represents an ApprovePayload.
         * @implements IApprovePayload
         * @constructor
         * @param {erc20_pb.IApprovePayload=} [properties] Properties to set
         */
        function ApprovePayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApprovePayload spender.
         * @member {string} spender
         * @memberof erc20_pb.ApprovePayload
         * @instance
         */
        ApprovePayload.prototype.spender = "";

        /**
         * ApprovePayload tokens.
         * @member {string} tokens
         * @memberof erc20_pb.ApprovePayload
         * @instance
         */
        ApprovePayload.prototype.tokens = "";

        /**
         * Creates a new ApprovePayload instance using the specified properties.
         * @function create
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {erc20_pb.IApprovePayload=} [properties] Properties to set
         * @returns {erc20_pb.ApprovePayload} ApprovePayload instance
         */
        ApprovePayload.create = function create(properties) {
            return new ApprovePayload(properties);
        };

        /**
         * Encodes the specified ApprovePayload message. Does not implicitly {@link erc20_pb.ApprovePayload.verify|verify} messages.
         * @function encode
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {erc20_pb.IApprovePayload} message ApprovePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApprovePayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.spender != null && message.hasOwnProperty("spender"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.spender);
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tokens);
            return writer;
        };

        /**
         * Encodes the specified ApprovePayload message, length delimited. Does not implicitly {@link erc20_pb.ApprovePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {erc20_pb.IApprovePayload} message ApprovePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApprovePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApprovePayload message from the specified reader or buffer.
         * @function decode
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {erc20_pb.ApprovePayload} ApprovePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApprovePayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.erc20_pb.ApprovePayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.spender = reader.string();
                    break;
                case 2:
                    message.tokens = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ApprovePayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {erc20_pb.ApprovePayload} ApprovePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApprovePayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApprovePayload message.
         * @function verify
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApprovePayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.spender != null && message.hasOwnProperty("spender"))
                if (!$util.isString(message.spender))
                    return "spender: string expected";
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                if (!$util.isString(message.tokens))
                    return "tokens: string expected";
            return null;
        };

        /**
         * Creates an ApprovePayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {erc20_pb.ApprovePayload} ApprovePayload
         */
        ApprovePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.erc20_pb.ApprovePayload)
                return object;
            var message = new $root.erc20_pb.ApprovePayload();
            if (object.spender != null)
                message.spender = String(object.spender);
            if (object.tokens != null)
                message.tokens = String(object.tokens);
            return message;
        };

        /**
         * Creates a plain object from an ApprovePayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof erc20_pb.ApprovePayload
         * @static
         * @param {erc20_pb.ApprovePayload} message ApprovePayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApprovePayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.spender = "";
                object.tokens = "";
            }
            if (message.spender != null && message.hasOwnProperty("spender"))
                object.spender = message.spender;
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                object.tokens = message.tokens;
            return object;
        };

        /**
         * Converts this ApprovePayload to JSON.
         * @function toJSON
         * @memberof erc20_pb.ApprovePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApprovePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ApprovePayload;
    })();

    erc20_pb.TransferFromPayload = (function() {

        /**
         * Properties of a TransferFromPayload.
         * @memberof erc20_pb
         * @interface ITransferFromPayload
         * @property {string|null} [from] TransferFromPayload from
         * @property {string|null} [to] TransferFromPayload to
         * @property {string|null} [tokens] TransferFromPayload tokens
         */

        /**
         * Constructs a new TransferFromPayload.
         * @memberof erc20_pb
         * @classdesc Represents a TransferFromPayload.
         * @implements ITransferFromPayload
         * @constructor
         * @param {erc20_pb.ITransferFromPayload=} [properties] Properties to set
         */
        function TransferFromPayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TransferFromPayload from.
         * @member {string} from
         * @memberof erc20_pb.TransferFromPayload
         * @instance
         */
        TransferFromPayload.prototype.from = "";

        /**
         * TransferFromPayload to.
         * @member {string} to
         * @memberof erc20_pb.TransferFromPayload
         * @instance
         */
        TransferFromPayload.prototype.to = "";

        /**
         * TransferFromPayload tokens.
         * @member {string} tokens
         * @memberof erc20_pb.TransferFromPayload
         * @instance
         */
        TransferFromPayload.prototype.tokens = "";

        /**
         * Creates a new TransferFromPayload instance using the specified properties.
         * @function create
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {erc20_pb.ITransferFromPayload=} [properties] Properties to set
         * @returns {erc20_pb.TransferFromPayload} TransferFromPayload instance
         */
        TransferFromPayload.create = function create(properties) {
            return new TransferFromPayload(properties);
        };

        /**
         * Encodes the specified TransferFromPayload message. Does not implicitly {@link erc20_pb.TransferFromPayload.verify|verify} messages.
         * @function encode
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {erc20_pb.ITransferFromPayload} message TransferFromPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransferFromPayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.from != null && message.hasOwnProperty("from"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.from);
            if (message.to != null && message.hasOwnProperty("to"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.to);
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.tokens);
            return writer;
        };

        /**
         * Encodes the specified TransferFromPayload message, length delimited. Does not implicitly {@link erc20_pb.TransferFromPayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {erc20_pb.ITransferFromPayload} message TransferFromPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TransferFromPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TransferFromPayload message from the specified reader or buffer.
         * @function decode
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {erc20_pb.TransferFromPayload} TransferFromPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransferFromPayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.erc20_pb.TransferFromPayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.from = reader.string();
                    break;
                case 2:
                    message.to = reader.string();
                    break;
                case 3:
                    message.tokens = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TransferFromPayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {erc20_pb.TransferFromPayload} TransferFromPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TransferFromPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TransferFromPayload message.
         * @function verify
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TransferFromPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isString(message.from))
                    return "from: string expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isString(message.to))
                    return "to: string expected";
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                if (!$util.isString(message.tokens))
                    return "tokens: string expected";
            return null;
        };

        /**
         * Creates a TransferFromPayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {erc20_pb.TransferFromPayload} TransferFromPayload
         */
        TransferFromPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.erc20_pb.TransferFromPayload)
                return object;
            var message = new $root.erc20_pb.TransferFromPayload();
            if (object.from != null)
                message.from = String(object.from);
            if (object.to != null)
                message.to = String(object.to);
            if (object.tokens != null)
                message.tokens = String(object.tokens);
            return message;
        };

        /**
         * Creates a plain object from a TransferFromPayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof erc20_pb.TransferFromPayload
         * @static
         * @param {erc20_pb.TransferFromPayload} message TransferFromPayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TransferFromPayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.from = "";
                object.to = "";
                object.tokens = "";
            }
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = message.from;
            if (message.to != null && message.hasOwnProperty("to"))
                object.to = message.to;
            if (message.tokens != null && message.hasOwnProperty("tokens"))
                object.tokens = message.tokens;
            return object;
        };

        /**
         * Converts this TransferFromPayload to JSON.
         * @function toJSON
         * @memberof erc20_pb.TransferFromPayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TransferFromPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TransferFromPayload;
    })();

    erc20_pb.InitTokenStatePayload = (function() {

        /**
         * Properties of an InitTokenStatePayload.
         * @memberof erc20_pb
         * @interface IInitTokenStatePayload
         * @property {string|null} [symbol] InitTokenStatePayload symbol
         * @property {string|null} [name] InitTokenStatePayload name
         * @property {string|null} [decimals] InitTokenStatePayload decimals
         * @property {string|null} [totalSupply] InitTokenStatePayload totalSupply
         */

        /**
         * Constructs a new InitTokenStatePayload.
         * @memberof erc20_pb
         * @classdesc Represents an InitTokenStatePayload.
         * @implements IInitTokenStatePayload
         * @constructor
         * @param {erc20_pb.IInitTokenStatePayload=} [properties] Properties to set
         */
        function InitTokenStatePayload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InitTokenStatePayload symbol.
         * @member {string} symbol
         * @memberof erc20_pb.InitTokenStatePayload
         * @instance
         */
        InitTokenStatePayload.prototype.symbol = "";

        /**
         * InitTokenStatePayload name.
         * @member {string} name
         * @memberof erc20_pb.InitTokenStatePayload
         * @instance
         */
        InitTokenStatePayload.prototype.name = "";

        /**
         * InitTokenStatePayload decimals.
         * @member {string} decimals
         * @memberof erc20_pb.InitTokenStatePayload
         * @instance
         */
        InitTokenStatePayload.prototype.decimals = "";

        /**
         * InitTokenStatePayload totalSupply.
         * @member {string} totalSupply
         * @memberof erc20_pb.InitTokenStatePayload
         * @instance
         */
        InitTokenStatePayload.prototype.totalSupply = "";

        /**
         * Creates a new InitTokenStatePayload instance using the specified properties.
         * @function create
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {erc20_pb.IInitTokenStatePayload=} [properties] Properties to set
         * @returns {erc20_pb.InitTokenStatePayload} InitTokenStatePayload instance
         */
        InitTokenStatePayload.create = function create(properties) {
            return new InitTokenStatePayload(properties);
        };

        /**
         * Encodes the specified InitTokenStatePayload message. Does not implicitly {@link erc20_pb.InitTokenStatePayload.verify|verify} messages.
         * @function encode
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {erc20_pb.IInitTokenStatePayload} message InitTokenStatePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitTokenStatePayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.symbol);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.decimals);
            if (message.totalSupply != null && message.hasOwnProperty("totalSupply"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.totalSupply);
            return writer;
        };

        /**
         * Encodes the specified InitTokenStatePayload message, length delimited. Does not implicitly {@link erc20_pb.InitTokenStatePayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {erc20_pb.IInitTokenStatePayload} message InitTokenStatePayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitTokenStatePayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InitTokenStatePayload message from the specified reader or buffer.
         * @function decode
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {erc20_pb.InitTokenStatePayload} InitTokenStatePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitTokenStatePayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.erc20_pb.InitTokenStatePayload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.symbol = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.decimals = reader.string();
                    break;
                case 4:
                    message.totalSupply = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InitTokenStatePayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {erc20_pb.InitTokenStatePayload} InitTokenStatePayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitTokenStatePayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InitTokenStatePayload message.
         * @function verify
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InitTokenStatePayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                if (!$util.isString(message.symbol))
                    return "symbol: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                if (!$util.isString(message.decimals))
                    return "decimals: string expected";
            if (message.totalSupply != null && message.hasOwnProperty("totalSupply"))
                if (!$util.isString(message.totalSupply))
                    return "totalSupply: string expected";
            return null;
        };

        /**
         * Creates an InitTokenStatePayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {erc20_pb.InitTokenStatePayload} InitTokenStatePayload
         */
        InitTokenStatePayload.fromObject = function fromObject(object) {
            if (object instanceof $root.erc20_pb.InitTokenStatePayload)
                return object;
            var message = new $root.erc20_pb.InitTokenStatePayload();
            if (object.symbol != null)
                message.symbol = String(object.symbol);
            if (object.name != null)
                message.name = String(object.name);
            if (object.decimals != null)
                message.decimals = String(object.decimals);
            if (object.totalSupply != null)
                message.totalSupply = String(object.totalSupply);
            return message;
        };

        /**
         * Creates a plain object from an InitTokenStatePayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof erc20_pb.InitTokenStatePayload
         * @static
         * @param {erc20_pb.InitTokenStatePayload} message InitTokenStatePayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InitTokenStatePayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.symbol = "";
                object.name = "";
                object.decimals = "";
                object.totalSupply = "";
            }
            if (message.symbol != null && message.hasOwnProperty("symbol"))
                object.symbol = message.symbol;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.decimals != null && message.hasOwnProperty("decimals"))
                object.decimals = message.decimals;
            if (message.totalSupply != null && message.hasOwnProperty("totalSupply"))
                object.totalSupply = message.totalSupply;
            return object;
        };

        /**
         * Converts this InitTokenStatePayload to JSON.
         * @function toJSON
         * @memberof erc20_pb.InitTokenStatePayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InitTokenStatePayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InitTokenStatePayload;
    })();

    return erc20_pb;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && message.hasOwnProperty("value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    object.value = options.bytes === String ? "" : [];
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
