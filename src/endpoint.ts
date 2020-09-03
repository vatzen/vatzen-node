export class Endpoint {
  protected async formatResponse(apiResponse: Response) {
    const responseJson = await apiResponse.json();
    if (responseJson.success) {
      return responseJson;
    } else {
      throw responseJson;
    }
  }
}
