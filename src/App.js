import React from 'react';
import './reset.css';
import './base.css';

import bindMethods from 'yaab';

import Header from './components/Header/Header';
import logo from './assets/images/logo.svg';
import TransactionList from './containers/TransactionList/TransactionList';
import ConnectedSettingsDrawer from './containers/SettingsDrawer/SettingsDrawer';

import Joyride from 'react-joyride';
import '../node_modules/react-joyride/lib/react-joyride-compiled.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		bindMethods(this);
		this.settingsContainer = {};
		this.state = {
			settingsDrawerIsOpen: false,
			joyrideisRunning: true,
		};
	}

	toggleSettingsDrawer() {
		this.setState(prevState => {
			return { settingsDrawerIsOpen: !prevState.settingsDrawerIsOpen };
		});
	}

	joyrideCallback(data) {
		console.log(data.type, data.index);
		// if (data.type == 'step:after' && data.index == 0) {
		// 	console.log(this.joyride);
		// 	this.setState({ settingsDrawerIsOpen: true, joyrideisRunning: false });
		// 	// if it's the first step
		// 	setTimeout(() => {
		// 		this.setState({ joyrideisRunning: true });
		// 	}, 1500);
		// }
	}

	render() {
		const { settingsDrawerIsOpen, joyrideisRunning } = this.state;
		this.settingsContainer = document.getElementById('myId');

		return (
			<div className={`App ${settingsDrawerIsOpen ? 'settings-is-open' : ''}`}>
				<h1 className="accessible">Gromits POS</h1>
				<Joyride
					ref={joyride => (this.joyride = joyride)}
					allowClicksThruHole={true}
					autoStart={true}
					showSkipButton={true}
					scrollToSteps={false}
					type="single"
					showStepsProgress={true}
					run={joyrideisRunning}
					debug={false}
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
						{
							title: 'Contract Address',
							text: (
								<div>
									<p>
										We also need to know some information about the currency
										that Coinface will be looking for.
									</p>
									<p>
										This is known as the <strong>Contract Address</strong>.
									</p>
									<p>
										<a href="#">(Tell me more about Contract Addresses)</a>
									</p>
								</div>
							),
							selector: '.TrustSetting',
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
