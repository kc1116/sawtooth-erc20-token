import React, { Component } from 'react'
import { Loader, Icon, Header, Form, Feed, Grid, Tab, Transition, Confirm } from 'semantic-ui-react'
import {observer, inject} from 'mobx-react';
import {values, reaction} from 'mobx';
import 'font-awesome/css/font-awesome.min.css';

const newConfirmation = (header, content, confirmCB, close) => {
    return {open: close ? close : true, header, content,confirmCB}
}
@inject('accountStore')
@observer
class Heading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transfer: {
                amount: 0,
                recipient: '',
                from: '' 
            },
            approval: {
                amount: 0,
                spender: '', 
            },
            balanceChange: true,
            loading: false, 
            confirm: {
                header: '',
                content: '',
                open: false, 
                confirmCB: null
            }, 
        }

        this.handleTransferSubmit = this.handleTransferSubmit.bind(this);
        this.handleApprovalSubmit = this.handleApprovalSubmit.bind(this);
        this.handleTransferFromSubmit = this.handleTransferFromSubmit.bind(this);
        this.renderTransferForm = this.renderTransferForm.bind(this);
        this.renderApproveForm = this.renderApproveForm.bind(this);
        this.renderTransferFromForm = this.renderTransferFromForm.bind(this);
        

        this.panes = [
            { menuItem: 'Transfer', render: () => <Tab.Pane>{this.renderTransferForm()}</Tab.Pane> },
            { menuItem: 'Transfer From', render: () => <Tab.Pane>{this.renderTransferFromForm()}</Tab.Pane> },
            { menuItem: 'Approve', render: () => <Tab.Pane>{this.renderApproveForm()}</Tab.Pane> },
          ]    
        
        this.updateActive = reaction(
            () => this.props.accountStore.current.balance, 
            balance => this.setState({balanceChange: !this.state.balanceChange})
        );
    }
    
    handleTransferSubmit() {
        const confirmation = newConfirmation('Transfer Confirmation', `Transfer ${this.state.transfer.amount} tokens to ${this.state.transfer.recipient}`, async () => {
            try {
                if (this.state.transfer.recipient === '' || this.state.transfer.amount <= 0) {
                    throw new Error("Invalid transfer")
                } 
                await this.props.accountStore.current.transfer(this.state.transfer.recipient, this.state.transfer.amount);
                this.setState({transfer: {
                    amount: 0,
                    recipient: '', 
                }});
            } catch (error) {
                throw new Error(error);
            }
        });

        this.setState({confirm: confirmation});
    }

    handleApprovalSubmit() {
        const confirmation = newConfirmation('Approval Confirmation', `Approve ${this.state.approval.spender} to spend ${this.state.approval.amount} tokens`, async () => {
            try {
                if (this.state.approval.spender === '' || this.state.approval.amount <= 0) {
                    throw new Error("Invalid approval")
                } 
                await this.props.accountStore.current.approve(this.state.approval.spender, this.state.approval.amount);
                this.setState({approval: {
                    amount: 0,
                    spender: '', 
                }});
            } catch (error) {
                throw new Error(error);
            }
        });

        this.setState({confirm: confirmation});
    }

    async handleTransferFromSubmit() {
        const confirmation = newConfirmation('TransferFrom Confirmation', `Transfer ${this.state.transfer.amount} tokens from ${this.state.transfer.from}`, async () => {
            try {
                if (this.state.transfer.recipient === '' || this.state.transfer.from === '' || this.state.transfer.amount <= 0) {
                    throw new Error("Invalid transfer")
                } 
                await this.props.accountStore.current.transferFrom(this.state.transfer.from, this.state.transfer.recipient, this.state.transfer.amount);
                this.setState({transfer: {
                    amount: 0,
                    recipient: '',
                    from: '' 
                }});
            } catch (error) {
                throw new Error(error);
            }
        });

        this.setState({confirm: confirmation});
    }
    renderApproveForm() {
        return (
            <Form size='large'>
                <Form.Group>
                    <Form.Input value={this.state.approval.spender} width={12} placeholder='Spender' onChange={(e, spender) => this.setState(prevState => ({approval: {...prevState.approval, spender: spender.value} }))} />
                    <Form.Input value={this.state.approval.amount} width={3} placeholder='Amount' onChange={(e, amount) => this.setState(prevState => ({approval: {...prevState.approval, amount: amount.value} }))} />
                    <Form.Button onClick={this.handleApprovalSubmit} size='large' content='Approve' icon='send' labelPosition='right'/>
                </Form.Group>
            </Form>
        )
    }
    
    renderTransferForm() {
        return (
            <Form size='large'>
                <Form.Group>
                    <Form.Input value={this.state.transfer.recipient} width={12} placeholder='Recipient' onChange={(e, recipient) => this.setState(prevState => ({transfer: {...prevState.transfer, recipient: recipient.value} }))} />
                    <Form.Input value={this.state.transfer.amount} width={3} placeholder='Amount' onChange={(e, amount) => this.setState(prevState => ({transfer: {...prevState.transfer, amount: amount.value} }))} />
                    <Form.Button onClick={this.handleTransferSubmit} size='large' content='Transfer' icon='send' labelPosition='right'/>
                </Form.Group>
            </Form>
        )
    }

    renderTransferFromForm() {
        return (
            <Form size='large'>
                <Form.Group>
                    <Form.Input value={this.state.transfer.from} width={6} placeholder='From' onChange={(e, from) => this.setState(prevState => ({transfer: {...prevState.transfer, from: from.value} }))} />
                    <Form.Input value={this.state.transfer.recipient} width={6} placeholder='Recipient' onChange={(e, recipient) => this.setState(prevState => ({transfer: {...prevState.transfer, recipient: recipient.value} }))} />
                    <Form.Input value={this.state.transfer.amount} width={3} placeholder='Amount' onChange={(e, amount) => this.setState(prevState => ({transfer: {...prevState.transfer, amount: amount.value} }))} />
                    <Form.Button onClick={this.handleTransferFromSubmit} size='large' content='Transfer' icon='send' labelPosition='right'/>
                </Form.Group>
            </Form>
        )
    }
    render() {
        return (
            <Grid >
                <Grid.Row style={{display: 'flex', justifyContent: 'center'}} >
                    <Header as='h2'>
                        <Header.Content as={'i'} className={'fa fa-key'}/>
                        <Header.Content style={{paddingLeft: 10}}  content={`Public Key: ${this.props.accountStore.current.publicKey}`}/>
                        <Header.Subheader>
                            <Header.Content as={'div'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', color: 'green'}}>
                                <Icon name='dollar' />
                                    Balance:
                                <Transition animation='pulse' duration={500} visible={this.state.balanceChange}>
                                    <p style={{paddingLeft: 10}}>{this.props.accountStore.current.balance.toFormat(18)}</p>
                                </Transition>
                            </Header.Content>
                        </Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row style={{display: 'flex', justifyContent: 'space-around'}} >
                    <Grid.Column width={4}>
                        <Header as={'h2'}>
                            <Header.Content as={'i'} className={'fa fa-bars'}/>
                            <Header.Content style={{paddingLeft: 10}}  content='Transactions' />
                        </Header>
                        {values(this.props.accountStore.current.transactions).length === 0 ? <Header.Subheader content='No transactions'/> : null} 
                        <Transactions />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Tab panes={this.panes} />
                    </Grid.Column>
                </Grid.Row>
                <Confirm
                    header={this.state.confirm.header}
                    content={this.state.confirm.content}
                    open={this.state.confirm.open}
                    onCancel={() => this.setState({confirm: {open: false, confirmCB: null, header: '', content: ''}})}
                    onConfirm={() => {
                        this.state.confirm.confirmCB()
                        this.setState({confirm: {open: false, confirmCB: null, header: '', content: ''}});
                    }}
                />
            </Grid>
        )
    }
}

@observer
class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            data: this.props.data
        }
    }
    render() {
        return (
            <Feed.Event>
                <Feed.Label>
                    <Icon name='circle' />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Feed.Event>{this.state.data.transaction.metaData.description}</Feed.Event>
                        <Feed.Date>{this.state.data.transaction.metaData.date}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                        <Feed.Label>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
                                <Icon name='hourglass half' />
                                {`Status: ${this.state.data.transaction.status}`}  
                                {this.state.data.transaction.status === 'PENDING' ? <Loader style={{paddingLeft: 10}} active size='mini' inline/> : null}
                            </div>
                        </Feed.Label>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
        )
    }
}

@inject('accountStore')
@observer
class Transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: this.props.accountStore.current
        }
        console.log(this.props.accountStore.current.transactions);
    }
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                <Feed>
                    {values(this.props.accountStore.current.transactions).map((val, key) => {
                        return (
                            <Transaction data={val} id={key} key={key}/>
                        );
                    })}
                </Feed>
            </div>
        )
    }
}

@inject('accountStore')
@observer
export class Account extends Component {  
    render() {
      return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <Heading />
        </div>
      )
    }
}
