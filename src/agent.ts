import BigNumber from 'bignumber.js'
import { Finding, HandleTransaction, TransactionEvent, FindingSeverity, FindingType } from 'forta-agent'
import { CETHER_TOKEN_ADDRESS, ERC20_TRANSFER_EVENT_SIG } from './constants'

const BLACKLIST: { [address: string] : boolean } = {
  "0x02788b3452849601e63ca70ce7db72c30c3cfd18": true,
  "0x499875b33e55c36a80d544e7ba3ca96cb52b1361": true,
  "0x2f0830b9cc296e5baef35381a78e77f42a1fe4ad": true
}

const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {

    const findings: Finding[] = []
    const ethValue = new BigNumber(txEvent.transaction.value)

    if (txEvent.to !== CETHER_TOKEN_ADDRESS) return findings

    if (ethValue.isEqualTo(0)) return findings

    const [transferCetherEvent] = txEvent.filterEvent(ERC20_TRANSFER_EVENT_SIG, CETHER_TOKEN_ADDRESS)

    const address = transferCetherEvent.address;

    const blacklistedAddress = address in BLACKLIST ? address : null;
    if (!blacklistedAddress) return findings

    findings.push(Finding.fromObject({
        name: "Blacklisted Address",
        description: `Transaction involving a blacklisted address: ${blacklistedAddress}`,
        alertId: "COMPOUND-4",
        severity: FindingSeverity.High,
        type: FindingType.Suspicious,
        metadata: {
            address: blacklistedAddress
        }
    }))

    return findings
  }

export default {
  handleTransaction,
}
