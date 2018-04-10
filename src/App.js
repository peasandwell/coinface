import React from 'react';
import './reset.css';
import './base.css';

import bindMethods from 'yaab';

import Header from './components/Header/Header';
import logo from './assets/images/logo.svg';
import TransactionList from './containers/TransactionList/TransactionList';
import ConnectedSettingsDrawer from './containers/SettingsDrawer/SettingsDrawer';

import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride-compiled.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		bindMethods(this);
		this.settingsContainer = {};
		this.state = {
			settingsDrawerIsOpen: false,
			joyrideIsRunning: true,
		};
	}

	toggleSettingsDrawer() {
		this.setState(prevState => {
			return { settingsDrawerIsOpen: !prevState.settingsDrawerIsOpen };
		});

		if (this.state.joyrideIsRunning && this.joyride.getProgress().index === 0) {
			this.joyride.next();
		}
	}

	joyrideCallback(data) {
		// open the settings drawer before the second step
		if (data.type == 'step:before' && data.index == 1) {
			this.setState({ settingsDrawerIsOpen: true, joyrideIsRunning: false });
			setTimeout(() => {
				this.setState({ joyrideIsRunning: true });
			}, 1000);
		}

		// close the settings drawer after the third step
		if (data.type == 'step:after' && data.index == 2) {
			this.setState({ settingsDrawerIsOpen: false, joyrideIsRunning: false });
			setTimeout(() => {
				this.setState({ joyrideIsRunning: true });
			}, 1000);
		}

		// update the state if the joyride journey has completed
		if (data.type == 'finished') {
			this.setState({ joyrideIsRunning: false });
		}
	}

	render() {
		const { settingsDrawerIsOpen, joyrideIsRunning } = this.state;
		this.settingsContainer = document.getElementById('myId');

		return (
			<div
				className={`App ${settingsDrawerIsOpen ? 'settings-is-open' : ''} ${
					joyrideIsRunning ? 'joyride-is-running' : ''
				}`}
			>
				<h1 className="accessible">Gromits POS</h1>
				<Joyride
					ref={joyride => (this.joyride = joyride)}
					allowClicksThruHole={true}
					autoStart={true}
					showBackButton={false}
					showSkipButton={true}
					scrollToSteps={false}
					type="continuous"
					showStepsProgress={true}
					run={joyrideIsRunning}
					debug={false}
					disableOverlay={true}
					callback={this.joyrideCallback}
					steps={[
						{
							title: 'Settings',
							text: (
								<div>
									<p>
										In order to start viewing your transactions, you need to
										select the content that will display
									</p>
								</div>
							),
							selector: '.SettingsWheel',
						},
						{
							title: 'Wallets',
							text: (
								<div>
									<p>
										In order to receive Gromits you will need to have set up an
										electronic wallet. This is a software program that stores
										coins.
									</p>
									<p>
										<strong>Enter your wallet ID in here</strong>
									</p>
									<p>
										<a href="#">(Tell me more about wallets)</a>
									</p>
								</div>
							),
							selector: '.AddressInput',
						},
						{
							title: 'Confirmations',
							text: (
								<div>
									<p>
										When a transaction is setn it needs to be verified
										('confirmed'). Information about each transaction is
										mathematically verified to confirm it is a legitimate
										transaction.
									</p>
									<p>
										Transactions process faster the fewer confirmations they
										have. You can choose to have them process faster or slower.
										We have set a recommended amount for you, but you can chage
										this.
									</p>
									<p>
										<strong>
											How fast would you like the transaction to complete?
										</strong>
									</p>
									<p>
										<a href="#">
											(Tell me more about blockchain confirmations)
										</a>
									</p>
								</div>
							),
							selector: '.TrustSetting',
						},
						// {
						// 	title: 'Contract Address',
						// 	text: (
						// 		<div>
						// 			<p>
						// 				We also need to know some information about the currency
						// 				that Coinface will be looking for.
						// 			</p>
						// 			<p>
						// 				This is known as the <strong>Contract Address</strong>.
						// 			</p>
						// 			<p>
						// 				<a href="#">(Tell me more about Contract Addresses)</a>
						// 			</p>
						// 		</div>
						// 	),
						// 	selector: '.TrustSetting',
						// },
						{
							title: 'Pending Transactions',
							text: (
								<div>
									<p>
										This shows transactions that have been sent to you but have
										not yet completed the required number of Confirmations.
									</p>
									<p>
										As more confirmations are completed against them the
										background will fill up, until it is fully black, at which
										point it has completed the required confirmations and will
										move into the "Completed" section of the page.
									</p>
								</div>
							),
							selector: '.PendingTransactionsList',
						},
						{
							title: 'Completed Transactions',
							text: (
								<div>
									<p>
										Once a transaction has had the required number of
										confirmations (as specified by the "Risk" slider in the
										settings) it will display below, in descending date order.
										The name, id of the wallet, time and amount are shown.
									</p>
								</div>
							),
							selector: '.Transaction',
						},
						{
							title: 'Date Selector',
							text: (
								<div>
									<p>
										If you need to see the totals from previous days then you
										can select the Date here and you will be shown a calendar
										listing all the previous days transactions.
									</p>
									<p>
										Clicking a specific date in the calendar will display all
										the Completed transactions for that day.
									</p>
								</div>
							),
							selector: '.DailyTotal',
						},
					]}
				/>
				<Header onOpenSettings={this.toggleSettingsDrawer}>
					<div className="logo">
						<img src={logo} alt="Shed" />
					</div>
				</Header>

				<TransactionList />

				<ConnectedSettingsDrawer
					isOpen={settingsDrawerIsOpen}
					onClose={this.toggleSettingsDrawer}
					heading="Settings"
					trustSettingValue="1"
					onSave={this.toggleSettingsDrawer}
				/>
			</div>
		);
	}
}

export default App;
