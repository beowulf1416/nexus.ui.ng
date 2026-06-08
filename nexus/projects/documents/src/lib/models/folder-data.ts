export class FolderData {

  constructor(
    readonly id: number,
    readonly name: string,
    readonly subfolders: Array<FolderData>,
  ) {}
}
