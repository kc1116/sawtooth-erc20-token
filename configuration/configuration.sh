#!/bin/bash

# TMP_HOME="/sawtooth"
# HOMEDIR="/home/$USER";
# CONFIG_LOG_FILE_PATH="$HOMEDIR/config.log";

# echo "Configure node index: $NODEINDEX with user: $USER" >> $CONFIG_LOG_FILE_PATH;

# if [[ -z "${SAWTOOTH_HOME}" ]]; then
#   echo "Adding SAWTOOTH_HOME to /etc/environment file" >> $CONFIG_LOG_FILE_PATH;
#   echo "SAWTOOTH_HOME=$TMP_HOME" >> /etc/environment;
# fi

# export SAWTOOTH_HOME=$TMP_HOME
# SAWTOOTH_DATA="$SAWTOOTH_HOME/data"

GENESIS_BATCH="https://raw.githubusercontent.com/PROPSProject/props-hyperledger-poc/master/initerc20/initerc20.batch?token=ALA7cImlFRwLfltv2UibZsqEFFN42r2fks5a2YD0wA%3D%3D"
PRIVKEY="f6cd436341dba540b11f5e665abd13225b5a234cb9abae6846401083223b778c"
PUBKEY="03e8b6fceff82fa9dfb79acd4324c1cf84b4be0a36e6eef13c0b289382a5f678a5"

NETWORKPRIVKEY='BHINd*6Zetm/vj:wP?!uLfZ0:.Ng0{Znq.sw9TcA'
NETWORKPUBKEY='L2Y$lQ@Uk=2miG0]OdUOPZ@bHeVin{xe^16^k-p?'

CONFIG_LOG_FILE_PATH="/var/log/sawtooth/validator-debug.log"
CONFIG_PATH="/etc/sawtooth"
KEY_DIR="/etc/sawtooth/keys"
SAWTOOTH_DATA="/var/lib/sawtooth"

# if [ ! -e "/sawtooth/keys/validator.priv" ]; then
  echo "Adding new /sawtooth/keys/validator.priv key" >> $CONFIG_LOG_FILE_PATH;
  echo $PRIVKEY >> $KEY_DIR/validator.priv;
# fi

# if [ ! -e "/sawtooth/keys/validator.pub" ]; then
  echo "Adding new /sawtooth/keys/validator.pub key" >> $CONFIG_LOG_FILE_PATH;
  echo $PUBKEY >> $KEY_DIR/validator.pub;
# fi

# if [ ! -e "/sawtooth/etc/validator.toml" ]; then
  echo "Adding networ public and private keys to $CONFIG_PATH/validator.toml" >> $CONFIG_LOG_FILE_PATH;
  echo "network_private_key = '$NETWORKPRIVKEY'" >> $CONFIG_PATH/validator.toml;
  echo "network_public_key = '$NETWORKPUBKEY'" >> $CONFIG_PATH/validator.toml;
# fi
sawadm genesis 
# # if [ $NODEINDEX -eq 0 ] && [ ! -e "$SAWTOOTH_DATA/block-chain-id" ]; then
#   echo "Adding genisis batch file to directory: $SAWTOOTH_DATA" >> $CONFIG_LOG_FILE_PATH;
#   cd $SAWTOOTH_DATA;
#   touch ./genesis.batch 
#   curl $GENESIS_BATCH >> ./genesis.batch
