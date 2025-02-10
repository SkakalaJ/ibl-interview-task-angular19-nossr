export default class UrlUtils {
  static buildUrl(host: string, pathParts: string[]): string {
    if (host.endsWith('/')) {
      host = host.slice(0, -1);
    }

    return `${host}/${pathParts.join('/')}`;
  }

  static buildUrlPath(pathParts: string[]): string {
    return pathParts.join('/');
  }
}