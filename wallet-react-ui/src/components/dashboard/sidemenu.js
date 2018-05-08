import React, { Component } from 'react'
import { Input, Confirm, Sidebar, Segment, Button, Menu, Modal, Icon, Header, Dimmer, Loader, Grid, Responsive, Image } from 'semantic-ui-react'
import {Account} from './account';
import { AccountManager } from '../../accounts/account-json';
import {observer, inject} from 'mobx-react';
import {values} from 'mobx';
import logo from '../../assets/logo.svg'

class AccountPasswordConfirm extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      type: 'password'
    }
    this.toggleView = this.toggleView.bind(this);
  }
  toggleView(e) {
    e.preventDefault();
    e.stopPropagation();
    this.state.type === 'password' ? this.setState({type: 'input'}) : this.setState({type: 'password'});
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 50}}>
        <Input type={this.state.type} onChange={this.props.onchange} placeholder='password' />
      </div>
    );
  }
}

@inject('accountStore')
@observer
export class SideMenu extends Component {
    constructor(props){
      super(props);
      this.state = { 
        visible: true, 
        modalOpen: false, 
        loading: false, 
        encryptAccount: {
          confirm: false, 
          password: ''
        }, 
        enterPassword: false
      }
      this.downloadKeyPair = this.downloadKeyPair.bind(this);
      this.uploadKeys = this.uploadKeys.bind(this);
      this.renderContent = this.renderContent.bind(this);
      this.renderNoAccounts = this.renderNoAccounts.bind(this);

      this.menuItems = [
        {render: (key) => {
          return (
            <Menu.Item key={key} name='new account' onClick={async () => {
              this.setState({encryptAccount: {confirm: true}});
            }}>
              <Icon name='plus' />
              <p>New Account</p>
              <Confirm
                  header='Optional: Password protect your account'
                  content={<AccountPasswordConfirm onchange={(e, password) => {
                    console.log(password.value);
                    this.setState({encryptAccount: {confirm: true, password: password.value}})
                  }} />}
                  open={this.state.encryptAccount.confirm}
                  onCancel={() => this.setState({encryptAccount: {confirm: false, password: ''}})}
                  onConfirm={async () => {
                      await this.importer.newEncryptedAccount(this.state.encryptAccount.password)
                      this.setState({encryptAccount: {confirm: false, password: ''}});
                      this.toggleModal();
                  }}
                  confirmButton='Create'
              />
            </Menu.Item>
          );
        }},  

        {render: (key) => {
          return (
            <Menu.Item key={key} onClick={() => {
              document.getElementById('selectFiles').click();
            }} name='upload keypair'>
              <input type="file" id="selectFiles" onChange={this.uploadKeys} style={{display: 'none'}} />
              <Icon name='upload' />
              Upload KeyPair
            </Menu.Item>
          );
        }}, 

        {render: (key) => {
          return (
            <Menu.Item key={key} onClick={this.toggleModal} name='download keypair'>
                <Icon name='download' />
                Download KeyPair
              </Menu.Item>
          );
        }},
      ]
      
      this.importer = new AccountManager(this.props.accountStore, (s) => {
        this.setState({enterPassword: true, encryptedAccountStr: s})
      });
    }
    
    toggleVisibility = () => this.setState({ visible: !this.state.visible });
    toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen});

    uploadKeys(e) {
      this.setState({loading: true});
      try {
        const files = document.getElementById('selectFiles').files;
        if (files.length <= 0) {
          this.setState({loading: false});
        } else {
          this.importer.readFile(files.item(0));
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    downloadKeyPair() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.props.accountStore.current.getDownloadStr());
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", 'keys-' + this.props.accountStore.current.publicKey + ".json");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

    renderNoAccounts(){
      return (
        <Responsive>
          <Grid columns={1}>
            <Grid.Row>
              <Segment style={{ minHeight: 700, padding: 75, minWidth: '85%' }} vertical>
                <Header as='div' style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                  <Button circular size='medium' onClick={this.toggleVisibility}>Toggle Menu</Button>
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                    <Image src={logo} size='small' />
                  </div>
                </Header>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                    No Accounts found create a new account or upload your JSON key pair
                </div>
              </Segment >
            </Grid.Row>
          </Grid>
        </Responsive>
      );
    }

    renderContent() {
      return (
        <Segment style={{ minHeight: 700, padding: '30px 75px 75px 30px', minWidth: '85%' }} vertical>
          <Header as='div' style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
            <Button circular size='medium' onClick={this.toggleVisibility}>Toggle Menu</Button>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
              <Image src={logo} size='small' />
            </div>
          </Header>
          <Account />
        </Segment >
      );
    }

    render() {
      const { visible } = this.state
      return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <Dimmer disabled active={this.state.loading}>
            <Loader>Creating new account . . .</Loader>
          </Dimmer>

          <Sidebar.Pushable as={Responsive}>
            <Sidebar
              as={Menu}
              animation='push'
              width='thin'
              direction='left'
              visible={visible}
              icon='labeled'
              vertical
            >
              
              {this.menuItems.map((item, key) => {
                return (item.render(key));
              })}
              
              {values(this.props.accountStore.accounts).map((account, key) => {
                console.log(this.props.accountStore.current &&  this.props.accountStore.current.publicKey === account.publicKey);
                return (
                  <Menu.Item onClick={() => {
                    this.props.accountStore.switchAccount(account.publicKey);
                  }} key={key} name='account' active={this.props.accountStore.current &&  this.props.accountStore.current.publicKey === account.publicKey}>
                    <Icon name='key' />
                    <p style={{wordWrap: 'break-word'}}> {account.publicKey}</p>
                  </Menu.Item>
                )
              })}
            </Sidebar>
            <Sidebar.Pusher>
              {this.props.accountStore.current ? this.renderContent() : this.renderNoAccounts()}
            </Sidebar.Pusher>
          </Sidebar.Pushable>

          <Modal size='large' open={this.state.modalOpen} onClose={this.toggleModal}>
            <Modal.Header>
              <p>Account Public Key: {this.props.accountStore.current? this.props.accountStore.current.publicKey : 'No Public Key :('}</p>
              <p>Account Private Key: {this.props.accountStore.current? this.props.accountStore.current.signer._privateKey.asHex(): 'No Private Key :/'}</p>
            </Modal.Header>
            <Modal.Content>
              <p>Save your keypair or Download your JSON keypair (will include account acess keys) file</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.downloadKeyPair} positive icon='download' labelPosition='right' content='Download' />
            </Modal.Actions>
          </Modal>

          <Confirm
              header='Enter Password'
              content={<AccountPasswordConfirm error={this.state.passwordErr} onchange={(e, password) => {
                this.setState({enterPassword: true, encryptAccount: {confirm: false, password: password.value}})
              }} />}
              open={this.state.enterPassword}
              onCancel={() => this.setState({enterPassword: false, encryptedAccountStr: '', encryptAccount: {confirm: false, password: ''}})}
              onConfirm={async () => {
                  const success = await this.importer.decryptAccount(this.state.encryptAccount.password, this.state.encryptedAccountStr)
                  if(success) {
                    this.setState({enterPassword: false, encryptedAccountStr: '', encryptAccount: {confirm: false, password: ''}})
                  }
                  console.log('Incorrect Password');
                  this.setState({passwordErr: 'Incorrect Password'});
              }}
              confirmButton='Create'
          />
        </div>
      )
    }
  }
