class VatZen {
  constructor(private apiKey: string) {}

  /**
   * Returns currently user API Key
   */
  getApiKey(): string {
    return this.apiKey;
  }

  /**
   * Sets the new valie for API Key
   * @param newApiKey New value for the API Key
   */
  setApiKey(newApiKey: string): void {
    this.apiKey = newApiKey;
  }
}

export default VatZen;
