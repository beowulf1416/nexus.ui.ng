export class ApiResponse {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data: any,
  ) {}
}
