# Blacklisted Address Agent

## Description

This agent detects blacklisted address interacting with Compound Protocol.

## Supported Chains

- Ethereum

## Alerts

- COMPOUND-4
  - Fired when a transaction or subtransaction involves one of the blacklisted addresses
  - Severity is always set to "high"
  - Type is always set to "suspicious"
  - Metadata "address" field specifies which blacklisted address was detected
