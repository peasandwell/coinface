import React from 'react';
import PropTypes from 'prop-types';

import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride-compiled.css';

class Onboarding extends React.Component {
	componentDidMount() {
		this.props.onRef(this.joyride);
	}

	componentWillUnmount() {
		this.props.onRef(undefined);
	}

	render() {
		const { isRunning, callback, joyrideInstance = this.joyride } = this.props;
		return (
			<Joyride
				ref={joyride => (this.joyride = joyride)}
				joyrideInstance={joyrideInstance}
				allowClicksThruHole={true}
				autoStart={true}
				showBackButton={false}
				showSkipButton={true}
				scrollToSteps={false}
				type="continuous"
				showStepsProgress={true}
				run={isRunning}
				debug={false}
				disableOverlay={true}
				callback={callback}
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
									Transactions process faster the fewer confirmations they have.
									You can choose to have them process faster or slower. We have
									set a recommended amount for you, but you can chage this.
								</p>
								<p>
									<strong>
										How fast would you like the transaction to complete?
									</strong>
								</p>
								<p>
									<a href="#">(Tell me more about blockchain confirmations)</a>
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
									settings) it will display below, in descending date order. The
									name, id of the wallet, time and amount are shown.
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
									If you need to see the totals from previous days then you can
									select the Date here and you will be shown a calendar listing
									all the previous days transactions.
								</p>
								<p>
									Clicking a specific date in the calendar will display all the
									Completed transactions for that day.
								</p>
							</div>
						),
						selector: '.DailyTotal',
					},
				]}
			/>
		);
	}
}

Onboarding.description = `
Component used for the user onboarding journey, makes use of [React Joyride](https://github.com/gilbarbara/react-joyride)
`;

Onboarding.propTypes = {
	/** Bool to determine whether the onboarding journey is active or not */
	isRunning: PropTypes.bool,

	/** Callback fired whenever a step has been completed */
	callback: PropTypes.func,

	/** joyride reference to help manage it in the main App */
	onRef: PropTypes.func,
};

export default Onboarding;
