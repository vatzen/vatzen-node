export class Endpoint {
  async formatResponse(apiResponse: Response) {
    const responseJson = await apiResponse.json();
    if (apiResponse.status === 200 && responseJson.success) {
      return responseJson;
    } else {
      throw responseJson;
    }
  }
}
