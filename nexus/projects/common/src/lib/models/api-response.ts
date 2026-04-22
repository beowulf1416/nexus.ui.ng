export class ApiResponse {
  constructor(
    private success: boolean,
    private message: string,
    private data: any,
  ) {}
}
