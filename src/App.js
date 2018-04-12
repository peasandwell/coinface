import React from 'react';
import './reset.css';
import './base.css';

import bindMethods from 'yaab';

import Header from './components/Header/Header';
import logo from './assets/images/logo.svg';
import TransactionList from './containers/TransactionList/TransactionList';
import ConnectedSettingsDrawer from './containers/SettingsDrawer/SettingsDrawer';
import Onboarding from './components/Onboarding/Onboarding';

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
				<Onboarding
					isRunning={joyrideIsRunning}
					callback={this.joyrideCallback}
					onRef={ref => (this.joyride = ref)}
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
