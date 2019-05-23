export interface IBankIdentifier {
  shortname: string;
  header: string[] | null;
  identify: (exportfile: string[]) => boolean;
}
